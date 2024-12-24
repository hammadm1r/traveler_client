import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const ProfileUpdate = () => {
  const myProfile = useSelector((state) => state.appConfig.myProfile);

  // Initialize state with current profile data
  const [fullname, setFullname] = useState(myProfile?.fullname || "");
  const [username, setUsername] = useState(myProfile?.username || "");
  const [email, setEmail] = useState(myProfile?.email || "");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(myProfile?.dateOfBirth || "");
  const [profileImage, setProfileImage] = useState(myProfile?.profilePicture?.url);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    // When the profile data is loaded, set the initial values
    if (myProfile) {
      setFullname(myProfile.fullname || "");
      setUsername(myProfile.username || "");
      setEmail(myProfile.email || "");
      setDateOfBirth(myProfile.dateOfBirth || "");
      setProfileImage(myProfile.profilePicture?.url || "");
    }
  }, [myProfile]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    setImagePreview(URL.createObjectURL(file)); // Preview the uploaded image
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Gather the updated profile info (you'll send this to your server)
    const updatedProfileData = {
      fullname,
      username,
      email,
      password: password || undefined, // Send password only if provided
      dateOfBirth,
      profileImage, // Include the profile image if updated
    };

    console.log("Profile Updated: ", updatedProfileData);
    alert("Profile updated successfully!");
    // Here you can call your API to update the profile
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
                src={imagePreview || profileImage}
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
            <label htmlFor="fullname" className="block font-semibold text-bgPrimary">
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
            <label htmlFor="username" className="block font-semibold text-bgPrimary">
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
            <label htmlFor="email" className="block font-semibold text-bgPrimary">
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
            <label htmlFor="password" className="block font-semibold text-bgPrimary">
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
              required
            />
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
