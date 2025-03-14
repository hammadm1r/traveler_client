import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { axiosClient } from "../utils/axiosClient";

export const ProfileUpdate = () => {
  const myProfile = useSelector((state) => state.appConfig.myProfile);

  const [formData, setFormData] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (myProfile) {
      setFormData({
        fullname: myProfile.fullname || "",
        email: myProfile.email || "",
        dateOfBirth: myProfile.dateOfBirth || "",
      });
      setImagePreview(myProfile.profilePicture?.url || "");
    }
  }, [myProfile]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value) updateData.append(key, value);
    });

    if (profileImage) {
      updateData.append("profileImage", profileImage);
    }

    try {
      const response = await axiosClient.post("/auth/updateProfile", updateData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Profile Updated:", response.data);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Profile update failed!");
    }
  };

  return (
    <div className="mt-24 md:mx-20 mx-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-bgPrimary">
          Update Profile
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center">
            <img
              src={imagePreview}
              alt="User"
              className="md:w-62 md:h-62 w-44 h-44 object-cover rounded-full border-4 border-bgPrimary"
            />
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

          {[
            { label: "Full Name", name: "fullname", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Date of Birth", name: "dateOfBirth", type: "date" },
          ].map(({ label, name, type }, index) => (
            <div key={index}>
              <label className="block font-semibold text-bgPrimary">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name] || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-bgPrimary focus:outline-none"
              />
            </div>
          ))}

          <div className="text-center">
            <button type="submit" className="bg-bgPrimary text-white px-4 py-2 rounded-lg hover:bg-blue-500">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;