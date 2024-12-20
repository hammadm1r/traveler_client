import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserImage from "../assets/Images/UserImage.jpeg";
import { CiImageOn } from "react-icons/ci";

const NewPostPrompt = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/createpost');
  };

  return (
    <div
      className="flex items-center p-3 cursor-pointer mb-5"
      onClick={handleClick}
    >
      <img
        src={UserImage}
        alt="User"
        className="w-10 h-10 object-cover rounded-full mr-3"
      />
      <input
        type="text"
        className="flex-1 bg-transparent outline-none text-gray-500 text-lg"
        placeholder="What's new on your Journey?"
        disabled
      />
     <CiImageOn className='w-6 h-6 text-bgPrimary' />
    </div>
  );
};

export default NewPostPrompt;
