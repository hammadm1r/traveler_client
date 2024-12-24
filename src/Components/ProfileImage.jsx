import React from "react";
import { useNavigate } from "react-router";

const ProfileImage = ({userProfileImage,userId}) => {
  const navigate = useNavigate();
  const handleUserProfile = (e) =>{
    e.stopPropagation();
    navigate(`/profile/${userId}`);
  };
  return (
    <div className="w-14 h-14 rounded-full overflow-hidden " onClick={handleUserProfile}>
      <img src={userProfileImage} alt="User" className="w-full h-full object-cover" />
    </div>
  );
};

export default ProfileImage;
