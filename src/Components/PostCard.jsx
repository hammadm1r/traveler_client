import React from "react";
import userImage from "../assets/Images/UserImage.jpeg";
import ProfileImage from "./ProfileImage";
import { AiOutlineLike } from "react-icons/ai";
import { MdOutlineModeComment } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";

const PostCard = ({userImage,username,timesAgo,title,desc,likes,comments,loc}) => {
  return (
    <div className="p-4 bg-white border-b-2">
      {/* User Info and Interaction Icons */}
      <div className="flex items-center justify-between mb-4">
        {/* User Information */}
        <div className="flex items-center space-x-3">
          <ProfileImage userProfileImage={userImage} />
          <div>
            <p className="text-base md:text-lg font-semibold text-gray-800">
              {username}
            </p>
            <p className="text-xs md:text-sm font-medium text-gray-500">
              {timesAgo} ago
            </p>
          </div>
        </div>

        {/* Like and Comment Buttons */}
        <div className="flex items-center space-x-4 text-gray-600">
          <button
            type="button"
            aria-label="Like post"
            className="flex items-center space-x-1 cursor-pointer hover:text-blue-500 transition duration-150 ease-in-out"
          >
            <AiOutlineLike className="text-xl" />
            <p className="text-sm">{likes}</p>
          </button>
          <button
            type="button"
            aria-label="Comment on post"
            className="hidden md:flex items-center space-x-1 cursor-pointer hover:text-blue-500 transition duration-150 ease-in-out"
          >
            <MdOutlineModeComment className="text-xl" />
            <p className="text-sm">{comments}</p>
          </button>
        </div>
      </div>

      {/* Post Content */}
      <div>
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mt-4 line-clamp-2">
          {title}
        </h2>
        <p className="text-sm md:text-base text-gray-600 mt-2 line-clamp-2">
          {desc}
        </p>
      </div>

      {/* Location Information */}
      <div className="mt-4 flex items-center text-gray-700">
        <CiLocationOn className="text-lg mr-1" />
        <p className="text-sm">{loc}</p>
      </div>
    </div>
  );
};

export default PostCard;

