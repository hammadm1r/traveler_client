import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import {
  followAndUnfollowUser,
  getUserProfile,
} from "../Toolkit/slices/userProfileSlice";
import NewPostPrompt from "../Components/NewPostPrompt";
import PostCard from "../Components/PostCard";
import Achivements from "../Components/Achivements";

const Profile = () => {
  const { id } = useParams(); // User profile id from URL params
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get profile and posts from Redux state
  const myProfile = useSelector((state) => state.appConfig.myProfile);
  const profile = useSelector((state) => state.userProfile.user);
  const posts = useSelector((state) => state.userProfile.posts);
  const isFollowing = useSelector((state) => state.userProfile.isFollowing);

  const [owner, setOwner] = useState(false);
  const [isContentOpen, setIsContentOpen] = useState(false);
  

  // First useEffect: fetch user profile if the id doesn't match myProfile._id
  useEffect(() => {
    if (!id) return;
  
    // Fetch the profile for the given ID
    dispatch(getUserProfile(id)).then(() => {
      // Check ownership after fetching the profile
      if (id === myProfile?._id) {
        setOwner(true);
      } else {
        setOwner(false);
      }
    });
  }, [id, dispatch, myProfile]);

  const handleToggleContent = () => {
    setIsContentOpen(!isContentOpen);
  };
  const handleFollow = () => {
    const body = {
      followId: id,
    };
    dispatch(followAndUnfollowUser(body));
  };
  // If the profile data is still loading, show a loading message
  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mt-24 md:mx-20 mx-4">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 items-center">
        {/* User Image Section */}
        <div className="md:col-span-2 flex justify-center relative">
          <img
            src={profile?.profilePicture?.url}
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
                {profile?.followers?.length}
              </p>
              <p className="md:text-md text-sm font-medium text-bgSecondary">
                Followers
              </p>
            </div>
            <div className="border-x-2 border-t-textBox text-center">
              <p className="md:text-2xl text-lg font-bold text-bgSecondary">
                {profile?.following?.length}
              </p>
              <p className="md:text-md text-sm font-medium text-bgSecondary">
                Following
              </p>
            </div>
            <div className="text-center">
              <p className="md:text-2xl text-lg font-bold text-bgSecondary">
                {profile?.posts?.length}
              </p>
              <p className="md:text-md text-sm font-medium text-bgSecondary">
                Posts
              </p>
            </div>
          </div>

          {/* Name and Username Section */}
          <div className="mt-5 space-y-3">
            <div className="flex items-center justify-between flex-wrap">
              <p className="text-3xl font-bold text-bgPrimary w-full sm:w-auto text-center sm:text-left">
                {profile?.fullname}
              </p>

              {owner && (
                <FaUserEdit
                  className="text-2xl text-gray-600 hover:text-bgPrimary cursor-pointer"
                  onClick={() => navigate("/updateprofile")}
                  title="Edit Profile"
                />
              )}

              {!owner && (
                <div className="flex justify-center w-full sm:w-auto mt-2 sm:mt-0">
                  <button
                    className="bg-bgPrimary text-2xl font-bold text-white px-6 py-3 rounded-xl hover:bg-blue-500 w-full sm:w-auto"
                    onClick={handleFollow}
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </button>
                </div>
              )}
            </div>

            <p className="text-xl font-semibold text-lightText">
              @{profile?.username}
            </p>
            <p className="text-md md:text-lg font-medium text-left mt-2 text-lightText">
              {profile?.bio}
            </p>
          </div>
        </div>
      </div>

      {/* New Post Prompt */}
      {owner && (
        <div className=" my-4">
          <NewPostPrompt />
        </div>
      )}

      {/* Achievements */}
      <div className="bg-white rounded-t-xl my-4 w-full">
        <Achivements />
      </div>

      {/* User's Posts */}
      <div className="rounded-t-xl overflow-hidden col-span-12 md:col-span-9 bg-white mt-2 mb-3 shadow-lg">
        <div className="text-bgSecondary p-4 bg-bgPrimary flex justify-between items-center">
          <p className="text-xl md:text-3xl font-semibold text-left">
            My Journeys
          </p>
          <p
            className="text-xl md:text-3xl text-right cursor-pointer"
            onClick={handleToggleContent}
          >
            {isContentOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
          </p>
        </div>

        {/* Content Section with smooth transition */}
        <div
          className={`flex flex-col transition-all duration-500 ease-in-out ${
            isContentOpen
              ? "h-auto opacity-100"
              : "h-0 opacity-0 pointer-events-none"
          }`}
          style={{
            transitionProperty: "height, opacity",
          }}
        >
          {isContentOpen && posts?.length > 0
            ? posts?.map((post, index) => <PostCard key={index} post={post} />)
            : isContentOpen && (
                <p className=" text-center font-bold text-xl text-lightText  p-6">
                  No posts available.
                </p>
              )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
