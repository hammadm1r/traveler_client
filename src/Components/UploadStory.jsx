import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { axiosClient } from "../utils/axiosClient";
import { FiUpload } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { replace, useNavigate } from "react-router";
const UploadStory = () => {
  const navigate = useNavigate();
  const myProfile = useSelector((state) => state.appConfig.myProfile);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [publicId, setPublicId] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file || !title) {
      alert("Please select a file and enter a title.");
      return;
    }

    try {
      const response = await axiosClient.get("/story/generate-signature");
      const data = response.data.result.data;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", data.apiKey);
      formData.append("timestamp", data.timestamp);
      formData.append("signature", data.signature);
      formData.append("folder", "Story_Media");

      const uploadResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${data.cloudName}/upload`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted/2);
          },
        }
      );

      const uploadedFileUrl = uploadResponse.data.secure_url;
      const uploadedFilePublicId = uploadResponse.data.public_id;

      setUploadedUrl(uploadedFileUrl);
      setPublicId(uploadedFilePublicId);

      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;

          const apiData = {
            title,
            url: uploadedFileUrl,
            publicId: uploadedFilePublicId,
            lat,
            long,
          };

          await axiosClient.post("/story/addstory", apiData ,{onUploadProgress:(progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(50 + percentCompleted / 2);} // Scale from 50% to 100%
          },
        );


        toast.success("Story uploaded successfully!");
        setTimeout(() => {
          navigate(`/profile/${myProfile._id}`);
        }, 2000); 
        },
        (error) => {
          console.error("Geolocation error:", error);
          toast.error("Story uploaded successfully!");
        }
      );
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload file. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg text-center relative">
        <h1 className="text-2xl text-bgPrimary font-semibold mb-4">Upload an Story</h1>

        <div className="border border-dashed border-gray-400 p-4 rounded-lg mb-4">
          <label
            htmlFor="file-upload"
            className="block w-full text-sm text-gray-700 border-dashed cursor-pointer hover:bg-gray-50"
          >
            <div className="flex flex-col items-center justify-center gap-2">
             <FiUpload className="text-4xl text-gray-700" />
              <span className="text-sm text-gray-600 hidden md:block">Drag and drop a file, or click to select</span>
            </div>
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <input
          type="text"
          placeholder="Enter a title for the story"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-4"
          required
        />

        <button
          onClick={uploadFile}
          className="w-full py-2 px-4 bg-bgPrimary  hover:bg-blue-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          Upload Story
        </button>

        {progress > 0 && (
          <p className="mt-4 text-sm text-gray-600">Upload Progress: {progress}%</p>
        )}

        {uploadedUrl && (
          <div className="mt-6">
            <h3 className="text-lg font-medium">Uploaded File:</h3>
            <a
              href={uploadedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {uploadedUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadStory;
