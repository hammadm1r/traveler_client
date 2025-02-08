import React, { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FiUpload } from "react-icons/fi";
import ReactStars from "react-rating-stars-component"; // Import the star rating component
import { useSelector } from "react-redux";
import { axiosClient } from "../utils/axiosClient";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export const CreatePost = () => {
  const myProfile = useSelector((state) => state.appConfig.myProfile);
  const [loc, setLoc] = useState("Sialkot, Pakistan");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const [desc, setDesc] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle image upload
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + selectedImages.length > 5) {
      setErrorMsg("You can only upload a maximum of 5 images.");
    } else {
      setErrorMsg("");
      setSelectedImages((prevImages) => [...prevImages, ...files]);
    }
  };

  // Function to remove an image
  const removeImage = (indexToRemove) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", desc);
    formData.append("location", loc);
    formData.append("rating", rating);

    selectedImages.forEach((image) => {
      formData.append("media[]", image);
    });

    try {
      setIsLoading(true);
      const response = await axiosClient.post("post/createpost", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);

      if (response.data.statusCode === 201) {
        toast.success("Post has been uploaded successfully.");
        setTimeout(() => {
          navigate(`/profile/${myProfile._id}`);
        }, 2000); // Redirect after 2 seconds to show the success message
      } else {
        toast.error("Failed to upload post. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle the star rating
  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  return (
    <div className="mt-16 md:mx-20 mx-4 flex justify-center">
      <div className="bg-white max-w-2xl p-6 rounded-lg shadow-md transition-all hover:shadow-lg">
        <h1 className="text-3xl font-bold mb-5 text-center text-bgPrimary tracking-normal">
          Create Post
        </h1>

        <div className="p-5 border border-gray-100 rounded-lg shadow-sm bg-gradient-to-b from-gray-50 to-white">
          <div className="flex items-center mb-5">
            <img
              src={myProfile?.profilePicture?.url}
              alt="User"
              className="w-12 h-12 object-cover rounded-full mr-3"
            />
            <div>
              <p className="text-lg font-semibold">{myProfile.fullname}</p>
              <div className="flex items-center gap-x-1">
                <CiLocationOn className="text-xl text-bgPrimary" />
                <p className="text-base text-gray-500">{loc}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Title of the post"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-200 p-3 w-full rounded-md focus:ring focus:ring-bgPrimary text-base shadow-sm"
              required
            />
            <textarea
              placeholder="Write something about your post..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="border border-gray-200 p-3 w-full rounded-md focus:ring focus:ring-bgPrimary text-base shadow-sm"
              required
            />

            <div className="mb-5">
              <label
                htmlFor="file-upload"
                className="w-full h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer flex items-center justify-center hover:border-bgPrimary hover:bg-gray-50 transition-all"
              >
                {selectedImages.length < 5 ? (
                  <div className="flex flex-col items-center gap-2">
                    <FiUpload className="text-4xl text-gray-600" />
                    <p className="hidden md:block text-base text-gray-500">
                      Drag and drop files or click to upload
                    </p>
                  </div>
                ) : (
                  <p className="text-center text-red-500">
                    Maximum 5 images allowed
                  </p>
                )}
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  multiple
                  disabled={selectedImages.length >= 5}
                />
              </label>
              <p className="text-sm text-gray-400 mt-2">
                Supported formats: JPG, PNG
              </p>
              {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`upload-preview-${index}`}
                    className="h-24 w-full object-cover rounded-md shadow-sm"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(index)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>

            <div>
              <label
                htmlFor="location-input"
                className="block mb-2 text-base font-medium text-bgPrimary"
              >
                Location:
              </label>
              <input
                id="location-input"
                type="text"
                placeholder="Enter location"
                value={locationInput}
                onChange={(e) => {
                  setLocationInput(e.target.value);
                  setLoc(e.target.value);
                }}
                className="border border-gray-200 p-3 w-full rounded-md focus:ring focus:ring-bgPrimary shadow-sm"
              />
            </div>

            <div>
              <label className="block mb-2 text-base font-medium text-bgPrimary">
                Rate this post:
              </label>
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={25}
                activeColor="#ffd700"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-md text-white font-semibold tracking-wide ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-bgPrimary hover:shadow-md hover:bg-opacity-90"
              }`}
            >
              {isLoading ? "Uploading..." : "Post"}
            </button>
          </form>

          {successMessage && (
            <p className="text-green-500 text-center mt-4">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-red-500 text-center mt-4">{errorMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
