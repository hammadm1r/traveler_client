import React from "react";
import PostComp from "../Components/Post";
import profileImage from "../assets/Images/UserImage.jpeg";
import CommentCard from "../Components/CommentCard";
import AddComment from "../Components/AddComment";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

const Post = () => {
  const { id } = useParams();
  
  // Assuming 'feed' is an array of posts stored in Redux
  const feed = useSelector((state) => state.feed.feed);
  
  // Find the post based on the ID from the URL
  const post = feed.find((post) => post.id === id); // Assuming 'id' is a string
  
  // If the post is not found, render an error message
  if (!post) {
    return <div>Post not found!</div>;
  }

  return (
    <>
      <div className="h-24 block"></div>
      <div className="flex items-center justify-center">
        <div className="w-full md:w-4/6">
          <div className="border bg-white py-6 px-2 md:p-10 rounded-lg">
            <PostComp
              post = {post}
            />
          </div>
          <div className="mt-8 border bg-white p-10 rounded-lg">
            <p className="m-3 text-2xl font-semibold">Comments</p>
            <AddComment postId={id} /> {/* Pass the postId to AddComment */}
            {post.comments?.map((comment, index) => (
              <CommentCard key={index} comment={comment} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
