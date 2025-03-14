import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { axiosClient } from "../utils/axiosClient";
import toast from "react-hot-toast"; // Import toast

export const ProfileUpdate = () => {
  const myProfile = useSelector((state) => state.appConfig.myProfile);

  // Initialize state with current profile data
  const [fullname, setFullname] = useState(myProfile?.fullname || "");
  const [username, setUsername] = useState(myProfile?.username || "");
  const [email, setEmail] = useState(myProfile?.email || "");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(myProfile?.dateOfBirth || "");
  const [bio, setBio] = useState(myProfile?.bio || "");
  const [profileImageUrl, setProfileImageUrl] = useState(
    myProfile?.profilePicture?.url || ""
  );
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (myProfile) {
      setFullname(myProfile.fullname || "");
      setUsername(myProfile.username || "");
      setEmail(myProfile.email || "");
      // Format the dateOfBirth if it exists
      setDateOfBirth(
        myProfile.dateOfBirth
          ? new Date(myProfile.dateOfBirth).toISOString().split("T")[0]
          : ""
      );
      setProfileImageUrl(myProfile.profilePicture?.url || "");
      setBio(myProfile.bio || "");
    }
  }, [myProfile]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImageFile(file);
    setImagePreview(URL.createObjectURL(file)); // Preview the uploaded image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password || ""); // Only include password if provided
    formData.append("bio", bio);

    // Append the profile image if it has been updated
    if (profileImageFile) {
      formData.append("profilePicture", profileImageFile);
    }

    // Append date of birth only if it has been changed by the user
    if (dateOfBirth !== myProfile?.dateOfBirth) {
      formData.append("dateOfBirth", dateOfBirth);
    }

    try {
      // Make the POST request to update the profile
      const response = await axiosClient.post("/auth/updateProfile", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file upload
        },
      });

      console.log("Profile Updated: ", response.data);
      toast.success("Profile updated successfully!"); // Success toast message
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile. Please try again."); // Error toast message

    }
  };

  return (
    <div className="mt-24 md:mx-20 mx-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-bgPrimary">
          Update Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center">
            <div className="md:col-span-2 flex justify-center">
              <img
                src={imagePreview || profileImageUrl}
                alt="User"
                className="md:w-62 md:h-62 w-44 h-44 object-cover rounded-full border-4 border-bgPrimary"
              />
            </div>
            {/* Custom File Input Button */}
            <label
              htmlFor="fileInput"
              className="cursor-pointer bg-bgPrimary text-white mt-2 px-6 py-2 rounded-lg font-semibold hover:bg-blue-500"
            >
              Choose New Image
            </label>
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {/* Full Name Field */}
          <div>
            <label
              htmlFor="fullname"
              className="block font-semibold text-bgPrimary"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-bgPrimary focus:outline-none"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Username Field */}
          <div>
            <label
              htmlFor="username"
              className="block font-semibold text-bgPrimary"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-bgPrimary focus:outline-none"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block font-semibold text-bgPrimary"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-bgPrimary focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block font-semibold text-bgPrimary"
            >
              New Password (Leave blank if not updating)
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-bgPrimary focus:outline-none"
              placeholder="Enter new password"
            />
          </div>

          {/* Date of Birth Field */}
          <div>
            <label htmlFor="dob" className="block font-semibold text-bgPrimary">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-bgPrimary focus:outline-none"
            />
          </div>

          {/* Bio Field */}
          <div>
            <label htmlFor="bio" className="block font-semibold text-bgPrimary">
              Bio
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-bgPrimary focus:outline-none"
              maxLength="300"
              rows="4"
            />
            <p className="text-sm text-gray-500 mt-1">
              {bio.length}/300 characters
            </p>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-bgPrimary text-white px-4 py-2 rounded-lg hover:bg-blue-500"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;
