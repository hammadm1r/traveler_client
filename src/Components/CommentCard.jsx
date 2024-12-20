import React from "react";
import userImage from "../assets/Images/UserImage.jpeg";
import ProfileImage from "./ProfileImage";
const CommentCard = () => {
  const myProfile = useSelector((state)=>state.appConfig.myProfile)
  return (
    <div className=" border-b-2 pb-6 pt-6 px-0 md:px-8  ">
      <div className="flex items-center justify-between mb-4">
        {/* User Information */}
        <div className="flex items-center space-x-3">
          <ProfileImage userProfileImage={userImage} />
          <div>
            <p className="text-base md:text-lg font-semibold text-gray-800">
              Hammad Farooq
            </p>
            <p className="text-xs md:text-sm font-medium text-gray-500">
              4 Hours ago
            </p>
          </div>
        </div>
      </div>
      <div>
        <p className="text-sm md:text-base text-gray-600 mt-2">Awesome Picture And Fun You Have on Trip!!</p>
      </div>
    </div>
  );
};

export default CommentCard;
