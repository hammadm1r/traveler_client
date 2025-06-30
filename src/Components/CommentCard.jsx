import React from "react";
import userImage from "../assets/Images/UserImage.jpeg";
import ProfileImage from "./ProfileImage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
const CommentCard = ({comment}) => {
  const myProfile = useSelector((state)=>state.appConfig.myProfile)
  console.log(comment);
    const navigate = useNavigate();
  const handleUserProfile = () =>{
    navigate(`/profile/${comment?.userId}`);
  }
  return (
    <div className=" border-b-2 pb-6 pt-6 px-0 md:px-8  ">
      <div className="flex items-center justify-between mb-4">
        {/* User Information */}
        <div className="flex items-center space-x-3">
          <ProfileImage userProfileImage={comment.userProfileImage} userId={comment.userId}/>
          <div>
            <p className="text-base md:text-lg font-semibold text-gray-800 cursor-pointer" onClick={handleUserProfile}>
              {comment.commentUserName}
            </p>
            <p className="text-xs md:text-sm font-medium text-gray-500">
              {comment.commentedAt}
            </p>
          </div>
        </div>
      </div>
      <div>
        <p className="text-sm md:text-base text-gray-600 mt-2">{comment.commentText}</p>
      </div>
    </div>
  );
};

export default CommentCard;
