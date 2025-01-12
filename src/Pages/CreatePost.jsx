import React, { useState } from "react";
import UserImage from "../assets/Images/UserImage.jpeg";
import { CiLocationOn } from "react-icons/ci";
import ReactStars from "react-rating-stars-component"; // Import the star rating component
import { useSelector } from "react-redux";
import { axiosClient } from "../utils/axiosClient";
import { replace } from "react-router";

export const CreatePost = () => {
  const myProfile = useSelector((state) => state.appConfig.myProfile);
  const [loc, setLoc] = useState("Sialkot, Pakistan"); // Default location
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [rating, setRating] = useState(0); // State to store the rating value

  // Handle image upload
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + selectedImages.length > 5) {
      setErrorMsg("You can only upload a maximum of 5 images.");
    } else {
      setErrorMsg(""); // Clear error message
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
      const response = await axiosClient.post("post/createpost", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if(response.statusCode = 201){
        alert("Post Has Been Uploaded")
        replace('/forum');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  // Function to handle the star rating
  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  return (
    <div className="mt-24 md:mx-20 mx-4 flex justify-center">
      <div className="bg-white max-w-2xl p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-bgPrimary">
          Create Post
        </h1>

        <div className="p-10 border rounded-lg">
          <div className="flex items-center">
            <div>
              <img
                src={myProfile?.profilePicture?.url}
                alt="User"
                className="w-8 h-8 object-cover rounded-full mr-3"
              />
            </div>
            <div>
              <p className="text-md">{myProfile.fullname}</p>
              <div className="flex items-center justify-center gap-x-1">
                <CiLocationOn className="text-sm" />
                <p className="text-xs">{loc}</p>
              </div>
            </div>
          </div>

          {/* Form for creating post */}
          <form onSubmit={handleSubmit} className="mt-4">
            <input
              type="text"
              placeholder="Title of the post"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 w-full mb-4"
              required
            />
            <textarea
              placeholder="Write something about your post..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="border p-2 w-full mb-4"
              required
            />

            {/* Image Upload Input */}
            <div className="mb-4">
              <label
                htmlFor="file-upload"
                className=" w-full h-32 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer flex items-center justify-center"
              >
                {selectedImages.length < 5 ? (
                  <div className="text-center">
                    <p>Drag and Drop files to upload</p>
                    <p>or</p>
                    <span className="bg-bgPrimary text-white px-4 py-1 rounded-md">
                      Browse
                    </span>
                  </div>
                ) : (
                  <p className="text-center text-red-600">
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
                  disabled={selectedImages.length >= 5} // Disable input when 5 images are uploaded
                />
              </label>
              <p className="text-xs text-gray-400 mt-2">
                Supported files: JPG, PNG
              </p>
              {errorMsg && (
                <p className="text-red-500 text-sm mt-1">{errorMsg}</p>
              )}
            </div>

            {/* Display selected images */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`upload-preview-${index}`}
                    className="h-24 w-24 object-cover rounded"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                    onClick={() => removeImage(index)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>

            {/* Location Input Field */}
            <div className="mb-4">
              <label
                htmlFor="location-input"
                className="block mb-2 text-lg font-smeibold text-bgPrimary"
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
                  setLoc(e.target.value); // Set loc state when user types
                }}
                className="border p-2 w-full"
              />
            </div>

            {/* Rating Functionality */}
            <div className="mb-4">
              <label className="block mb-2 text-lg font-smeibold text-bgPrimary">
                Rate this post:
              </label>
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                activeColor="#ffd700"
              />
            </div>

            <button
              type="submit"
              className="bg-bgPrimary font-semibold text-white py-2 px-8 rounded-lg"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
