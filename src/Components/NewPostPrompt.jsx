import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CiImageOn } from "react-icons/ci";
import ProfileImage from './ProfileImage';
import { useSelector } from 'react-redux';

const NewPostPrompt = () => {
  const navigate = useNavigate();
  const myProfile = useSelector((state) => state.appConfig.myProfile);
  const handleClick = () => {
    navigate('/createpost');
  };

  return (
    <div
      className="flex items-center p-4 cursor-pointer mb-5 rounded-2xl bg-white border border-gray-300 shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out"
      onClick={handleClick}
    >
      {/* Profile image */}
      <ProfileImage 
        userProfileImage={myProfile?.profilePicture?.url} 
        userId={myProfile._id} 
        className="rounded-full w-12 h-12 object-cover" 
      />

      {/* Input field */}
      <input
        type="text"
        className="flex-1 pl-4 bg-transparent outline-none text-gray-600 text-lg placeholder-gray-400"
        placeholder="What's new on your Journey?"
      />

      {/* Icon */}
      <CiImageOn 
        className="w-8 h-8 text-bgPrimary rounded-full p-1 hover:bg-gray-100 transition-colors duration-200 ease-in-out" 
      />
    </div>
  );
};

export default NewPostPrompt;
