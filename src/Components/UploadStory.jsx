import React, { useState } from "react";
import axios from "axios";
import { axiosClient } from "../utils/axiosClient";

const UploadStory = () => {
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
      // Step 1: Get signature and required data from your backend
      const response = await axiosClient.get("/story/generate-signature");
      const data = response.data.result.data;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", data.apiKey);
      formData.append("timestamp", data.timestamp);
      formData.append("signature", data.signature);
      formData.append("folder", "Story_Media");

      // Step 2: Upload the file directly to Cloudinary
      const uploadResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${data.cloudName}/upload`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        }
      );

      // Step 3: Get the uploaded file's URL and public ID
      const uploadedFileUrl = uploadResponse.data.secure_url;
      const uploadedFilePublicId = uploadResponse.data.public_id;

      setUploadedUrl(uploadedFileUrl);
      setPublicId(uploadedFilePublicId);

      // Step 4: Get user's current location
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;

          // Step 5: Prepare data for your backend
          const apiData = {
            title,
            url: uploadedFileUrl,
            publicId: uploadedFilePublicId,
            lat,
            long,
          };

          console.log("Data to send to backend:", apiData);

          // Optional: Send the story data to your backend
          await axiosClient.post("/story/addstory", apiData);

          alert("Story uploaded successfully!");
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Failed to retrieve location. Please try again.");
        }
      );
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload file. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="text-center p-6 bg-white border border-gray-300 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6">File Upload to Cloudinary</h1>
      <input
        type="file"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
      />
      <input
              type="text"
              placeholder="Title of the post"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 w-full mb-4"
              required
            />
      
      <button
        onClick={uploadFile}
        className="px-6 py-2 bg-blue-500 text-white font-medium text-sm rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      >
        Upload
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
            className="text-blue-500 hover:underline mt-2 block"
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
