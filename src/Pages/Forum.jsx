import React, { useEffect } from "react";
import pana from "../assets/Images/Onlineworld-pana1.png";
import Header from "../Components/Header";
import PostCard from "../Components/PostCard";
import Sidebar from "../Components/Sidebar";
import { useSelector } from "react-redux";

const Forum = () => {
  const feedStatus = useSelector((state) => state.feed.status);
  const feed = useSelector((state) => state.feed.feed);
  console.log('Feed data:', feed);
  console.log('Feed status:', feedStatus); // Ensure the feed data is logged correctly

  return (
    <div className="bg-gray-100 h-screen">
      {/* Header Section */}
      <Header
        titlePage="Forum"
        desc="Share your travel experiences and advice with others."
        img={pana}
      />

      {/* Content Section */}
      <div className="container h-3/4 mx-auto mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 px-4">
        {/* Sidebar Section */}
        <div className="col-span-12 md:col-span-3">
          <div className="sticky top-24 h-full bg-white shadow rounded-lg p-4">
            <Sidebar />
          </div>
        </div>

        {/* Main Content Section */}
        <div className="col-span-12 md:col-span-9 overflow-y-scroll bg-white shadow rounded-lg p-4">
          {feedStatus === "loading" && <div>Loading posts...</div>}
          
          {/* Only render feed posts if feed is an array and has data */}
          {Array.isArray(feed) && feed.length > 0 ? (
            feed.map((post) => (
              <PostCard
              key={post.id}
              post={post}
              />
            ))
          ) : (
            <div>No posts available.</div> // If feed is empty or not an array
          )}
        </div>
      </div>
    </div>
  );
};

export default Forum;
