import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { MdOutlineModeComment } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import ProfileImage from "./ProfileImage"; // Ensure the path is correct
import Carousel from "./Carousel";
import ImageOne from "../assets/Images/Slider/one.jpg"
import ImageTwo from "../assets/Images/Slider/two.jpg"
import ImageThree from "../assets/Images/Slider/three.jpg"
import ImageFour from "../assets/Images/Slider/four.jpg"
import ImageFive from "../assets/Images/Slider/five.jpg"
const Post = ({
  userImage,
  username,
  timesAgo,
  title,
  desc,
  likes,
  comments,
  loc,
}) => {
  
  return (
    <>
      <div className="w-full flex items-center justify-center">
      <div className=" bg-white transition-shadow duration-300 rounded-lg">
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
                {timesAgo}
              </p>
            </div>
          </div>

          {/* Like and Comment Buttons */}
          <div className="flex items-center space-x-4 text-gray-600">
            <button
              type="button"
              aria-label="Like post"
              className="flex items-center space-x-1 cursor-pointer hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150 ease-in-out rounded-full bg-slate-200 px-2 py-1"
            >
              <AiOutlineLike className="text-xl" />
              <p className="text-sm">{likes}</p>
            </button>
            <button
              type="button"
              aria-label="Comment on post"
              className="hidden md:flex items-center space-x-1 cursor-pointer hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150 ease-in-out rounded-full bg-slate-200 px-2 py-1"
            >
              <MdOutlineModeComment className="text-xl" />
              <p className="text-sm">{comments}</p>
            </button>
          </div>
        </div>

        {/* Post Content */}
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mt-4">
            {title}
          </h2>
          <Carousel />
          <p className="text-md md:text-base text-gray-600 mt-2 ">
            {desc}
          </p>
          <p className="text-xs md:text-base text-gray-600 ">
              #hammadm1r #helloWorld #traveler
          </p>
        </div>

        {/* Location Information */}
        <div className="mt-4 flex items-center text-gray-700">
          <CiLocationOn className="text-lg mr-1" />
          <p className="text-sm">{loc}</p>
        </div>
      </div>
      </div>
    </>
  );
};

export default Post;
