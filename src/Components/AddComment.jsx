import React from "react";
import userImage from "../assets/Images/UserImage.jpeg";
import ProfileImage from "./ProfileImage";

const AddComment = () => {
  return (
    <div className="border-b-2  w-full mx-auto bg-white p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        {/* User Information */}
        <div className="flex items-center space-x-3">
          <ProfileImage userProfileImage={userImage} />
          <div>
            <p className="text-base md:text-lg font-semibold text-gray-800">
              Hammad Farooq
            </p>
            <p className="text-xs md:text-sm font-medium text-gray-500">
              4 hours ago
            </p>
          </div>
        </div>
      </div>

      {/* Comment Input and Button */}
      <div className="">
        <input
          type="textarea"
          placeholder=""
          className="w-full p-2 bg-[#EFEFEF] text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          type="button"
          className="px-8 mt-2 py-2 bg-blue-400 text-white font-semibold rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Comment
        </button>
      </div>
    </div>
  );
};

export default AddComment;
