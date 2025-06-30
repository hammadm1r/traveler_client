import React, { useState } from "react";
import userImage from "../assets/Images/UserImage.jpeg";
import ProfileImage from "./ProfileImage";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../Toolkit/slices/feedSlice";
import { useNavigate } from "react-router";

const AddComment = ({ postId }) => {
  const myProfile = useSelector((state) => state.appConfig.myProfile);
  console.log(postId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState();
  const commentHandler = (e) => {
  e.preventDefault();

  if (myProfile) {
    if (!commentText.trim()) {
      console.warn("Comment cannot be empty");
      return;
    }

    console.log("Submitting comment:", { postId, commentText });

    try {
      dispatch(addComment({ postId, commentText }));
      console.log("Comment added successfully");
    } catch (error) {
      console.error("Failed to add comment:", error);
    }

    setCommentText("");
  } else {
    navigate("/login"); // Redirect to login page
  }
};


  return (
    <div className="border-b-2  w-full mx-auto bg-white p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        {/* User Information */}
        <div className="flex items-center space-x-3">
          <ProfileImage userProfileImage={myProfile?.profilePicture?.url} userId={myProfile._id} />
          <div>
            <p className="text-base md:text-lg font-semibold text-gray-800">
              {myProfile?.fullname || "User"}
            </p>
          </div>
        </div>
      </div>

      {/* Comment Input and Button */}
      <div className="">
        <textarea
          placeholder="Write your comment here..."
          className="w-full p-2 bg-[#EFEFEF] text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />

        <button
          type="button"
          className="px-8 mt-2 py-2 bg-blue-400 text-white font-semibold rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={(e) => commentHandler(e)}
        >
          Comment
        </button>
      </div>
    </div>
  );
};

export default AddComment;
