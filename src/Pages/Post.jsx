import React from "react";
import PostComp from "../Components/Post";
import profileImage from "../assets/Images/UserImage.jpeg";
import CommentCard from "../Components/CommentCard";
import AddComment from "../Components/AddComment";
const Post = () => {
  const post = {
    userImage: profileImage,
    username: "Hammad Farooq Meer",
    timesAgo: "14 minutes ago",
    title: "Journey to the African Safari! Bring your mosquito repellent!",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ultricies risus at lectus tincidunt, in tincidunt eros volutpat...",
    likes: 14,
    comments: 3,
    loc: "Kotli Loharan West,Pakistan",
  };
  return (
    <>
      <div className="h-24 block"></div>
      <div className=" flex items-center justify-center">
        <div className="w-full  md:w-4/6">
          <div className="border bg-white  py-6 px-2 md:p-10 rounded-lg">
            <PostComp
              userImage={post.userImage}
              username={post.username}
              timesAgo={post.timesAgo}
              title={post.title}
              desc={post.desc}
              likes={post.likes}
              comments={post.comments}
              loc={post.loc}
            />
          </div>
          <div className="mt-8 border bg-white p-10 rounded-lg">
            <p className="m-3 text-2xl font-semibold">Comments</p>
            <AddComment />
            <CommentCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
