import React from "react";

const ProfileImage = ({userProfileImage}) => {
  return (
    <div className="w-14 h-14 rounded-full overflow-hidden">
      <img src={userProfileImage} alt="User" className="w-full h-full object-cover" />
    </div>
  );
};

export default ProfileImage;
