import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserImage from "../assets/Images/UserImage.jpeg";
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
      className="flex items-center p-3 cursor-pointer mb-5 rounded-xl bg-white"
      onClick={handleClick}
    >
     <ProfileImage userProfileImage={myProfile?.profilePicture?.url} userId={myProfile._id} />
      <input
        type="text"
        className="flex-1 pl-3 bg-transparent outline-none text-gray-500 text-lg"
        placeholder="What's new on your Journey?"
      />
     <CiImageOn className='w-6 h-6 text-bgPrimary' />
    </div>
  );
};

export default NewPostPrompt;
