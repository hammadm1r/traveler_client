import React from "react";
import ProfileImage from "../Components/ProfileImage";
import UserImage from "../assets/Images/UserImage.jpeg";
import PostCard from "../Components/PostCard";
import profileImage from "../assets/Images/UserImage.jpeg";
import Achivements from "../Components/Achivements";
import { useSelector } from "react-redux";
import NewPostPrompt from "../Components/NewPostPrompt";
import CreatePost from "./CreatePost";
import { FaUserEdit } from "react-icons/fa";
const Profile = () => {
  const feed = useSelector((state) => state.feed.feed);
  const myProfile = useSelector((state) => state.appConfig.myProfile);

  // Check if feed and myProfile are available before proceeding
  if (!feed || !myProfile) {
    console.error("Feed or Profile is not available.");
    return null;
  }

  // Find the post created by the current user (matching by owner._id)
  const posts = feed.filter((post) => post.owner._id === myProfile._id);

  // Log the post to the console with more descriptive information
  console.log(
    posts ? "Post found:" : posts,
    "No post found for the current user"
  );
  return (
    <div className="mt-24 md:mx-20 mx-4">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 items-center">
        {/* User Image Section */}
        <div className="md:col-span-2 flex justify-center relative">
          <img
            src={myProfile?.profilePicture?.url}
            alt="User"
            className="md:w-72 md:h-72 w-44 h-44 object-cover rounded-full border-4 border-bgPrimary"
          />
        </div>

        {/* User Info Section */}
        <div className="md:col-span-4 text-center md:text-left">
          {/* Stats Section */}
          <div className="max-w-md mx-auto md:mx-0 justify-center bg-bgPrimary rounded-2xl grid grid-cols-3 gap-4 p-4">
            <div className="text-center">
              <p className="md:text-2xl text-lg font-bold text-bgSecondary">
                {myProfile?.followers?.length}
              </p>
              <p className="md:text-md text-sm font-medium text-bgSecondary">
                Followers
              </p>
            </div>
            <div className="border-x-2 border-t-textBox text-center">
              <p className="md:text-2xl text-lg font-bold text-bgSecondary">
                {myProfile?.following?.length}
              </p>
              <p className="md:text-md text-sm font-medium text-bgSecondary">
                Followings
              </p>
            </div>
            <div className="text-center">
              <p className="md:text-2xl text-lg font-bold text-bgSecondary">
                {myProfile?.posts?.length}
              </p>
              <p className="md:text-md text-sm font-medium text-bgSecondary">
                Posts
              </p>
            </div>
          </div>

          {/* Name and Username Section */}
          <div className="mt-5 space-y-3">
            {/* Full Name with Edit Icon */}
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-bgPrimary">
                {myProfile?.fullname}
              </p>
              <FaUserEdit
                className="text-2xl text-gray-600 hover:text-bgPrimary cursor-pointer"
                onClick={() => navigate("/ProfileUpdate")}
                title="Edit Profile"
              />
            </div>

            {/* Username */}
            <p className="text-xl font-semibold text-lightText">
              @{myProfile?.username}
            </p>

            {/* Bio */}
            <p className="text-md md:text-lg font-medium text-left mt-2 text-lightText">
              {myProfile?.bio}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white my-4">
        <NewPostPrompt />
      </div>
      <div className="bg-white rounded-t-xl my-4 w-full">
        <Achivements />
      </div>
      
      <div>
      
        <div className="rounded-t-xl overflow-hidden shadow-lg col-span-12 md:col-span-9 bg-white  mt-2">
        <div className="flex bg-bgPrimary gap-3 md:gap-10 rounded-t-xl px-3">
        <p className="text-xl md:text-3xl font-semibold text-bgSecondary p-4 bg-bgPrimary">
        My Journeys
      </p>
      </div>
          {posts?.length > 0 ? (
            posts?.map((post, index) => <PostCard key={index} post={post} />)
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
