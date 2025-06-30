import React from "react";
import userImage from "../assets/Images/UserImage.jpeg";
import ProfileImage from "./ProfileImage";
import { AiOutlineLike } from "react-icons/ai";
import { MdOutlineModeComment } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

const PostCard = ({post}) => {
  const navigate = useNavigate();
  const openPost = (e) =>{
    e.preventDefault();
    navigate(`/post/${post?.id}`);

  }
  const handleUserProfile = (e) =>{
    e.stopPropagation();
    navigate(`/profile/${post.owner._id}`);
  };
  return (
    <div className="p-4 md:rounded-2xl bg-white border-b-2" onClick={openPost}>
      {/* User Info and Interaction Icons */}
      <div className="flex items-center justify-between mb-4">
        {/* User Information */}
        <div className="flex items-center space-x-3 ">
          <div className="border-2 border-bgPrimary rounded-full">
          <ProfileImage userProfileImage={post?.owner?.avatar?.url}  userId={post?.owner?._id} className=""/>
          </div>
          <div>
            <p className="text-base md:text-lg font-semibold text-gray-800" onClick={handleUserProfile}>
              {post?.owner?.name}
            </p>
            <p className="text-xs md:text-sm font-medium text-gray-500">
              {post?.timeAgo}
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
            <p className="text-sm">{post?.likesCount}</p>
          </button>
          <button
            type="button"
            aria-label="Comment on post"
            className="hidden md:flex items-center space-x-1 cursor-pointer hover:text-blue-500 transition duration-150 ease-in-out"
          >
            <MdOutlineModeComment className="text-xl" />
            <p className="text-sm">{post?.comments?.length}</p>
          </button>
        </div>
      </div>

      {/* Post Content */}
      <div>
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mt-4 line-clamp-2">
          {post?.title}
        </h2>
        <p className="text-sm md:text-base text-gray-600 mt-2 line-clamp-2">
          {post?.description}
        </p>
      </div>

      {/* Location Information */}
      <div className="mt-4 flex items-center text-gray-700">
        <CiLocationOn className="text-lg mr-1" />
        <p className="text-sm">{post?.location}</p>
      </div>
    </div>
  );
};

export default PostCard;

