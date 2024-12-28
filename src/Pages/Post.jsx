import React, { useEffect } from "react";
import PostComp from "../Components/Post";
import profileImage from "../assets/Images/UserImage.jpeg";
import CommentCard from "../Components/CommentCard";
import AddComment from "../Components/AddComment";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostById } from "../Toolkit/slices/feedSlice";
import { PageNotFound } from "./PageNotFound";

const Post = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // Assuming 'feed' is an array of posts stored in Redux
  const feed = useSelector((state) => state.feed.feed);
  console.log(feed)
  const status = useSelector((state) => state.feed.status);
  // Find the post based on the ID from the URL
  const post = feed.find((post) => post.id === id); // Assuming 'id' is a string
  useEffect(() => {
    if (!post) {
      dispatch(fetchPostById(id)); // Fetch the post from the backend if it's not available
    }
  }, [id, dispatch, post,feed]);

  if (post) {
    return (
      <>
        <div className="h-24 block"></div>
        <div className="flex items-center justify-center">
          <div className="w-full md:w-4/6">
            <div className="border bg-white py-6 px-2 md:p-10 rounded-lg">
              <PostComp post={post} />
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
  }

if (status === 'failed') {
  return <div><PageNotFound/></div>;
}
};

export default Post;
