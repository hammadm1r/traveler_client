import React from "react";
import { useNavigate } from "react-router";

const ProfileImage = ({ userProfileImage, userId }) => {
  const navigate = useNavigate();

  const handleUserProfile = (e) => {
    e.stopPropagation();
    navigate(`/profile/${userId}`);
  };

  return (
    <div
      onClick={handleUserProfile}
      className="w-14 h-14 max-w-full aspect-square rounded-full overflow-hidden cursor-pointer"
      title="View Profile"
    >
      
      <img
        src={userProfileImage || "/default-profile.png"} // fallback image if needed
        alt="User Profile"
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
};

export default ProfileImage;
