import React, { useEffect, useState } from "react";
import pana from "../assets/Images/Onlineworld-pana1.png";
import Header from "../Components/Header";
import PostCard from "../Components/PostCard";
import Sidebar from "../Components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader";
import { getFeedData } from "../Toolkit/slices/feedSlice";

const Forum = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState("feed");
  const myProfile = useSelector((state) => state.appConfig.myProfile);
  const feedStatus = useSelector((state) => state.feed.status);
  const feed = useSelector((state) => state.feed.feed);
  const followerPosts = feed.filter((post) =>myProfile?.following?.includes(post.owner._id))
  const myPosts = feed.filter((post) => post.owner._id === myProfile._id);
  return (
    <div className="bg-gray-100 h-screen">
      {/* Header Section */}
      <Header
        titlePage="Forum"
        desc="Share your travel experiences and advice with others."
        img={pana}
      />

      {/* Content Section */}
      <div className="container h-4/5 mx-auto mt-4 grid grid-cols-1 md:grid-cols-12 gap-6 px-4">
        {/* Sidebar Section */}
        <div className="col-span-12 md:col-span-3">
          <div className="sticky top-24 h-full bg-white shadow rounded-lg p-4">
            <Sidebar active={active} setActive={setActive} />
          </div>
        </div>

        {/* Main Content Section */}
        <div className="col-span-12 md:col-span-9 overflow-y-scroll bg-white shadow rounded-lg p-4">
          {feedStatus === "loading" && <div>
            <Loader/>
          </div>}

          {/* Only render feed posts if feed is an array and has data */}
          {active === "feed" &&
            (Array.isArray(feed) && feed.length > 0 ? (
              feed.map((post) => (
                <PostCard key={`feed-${post.id}`} post={post} />
              ))
            ) : (
              <div>No posts available.</div>
            ))}
          {active === "followers" &&
            (Array.isArray(followerPosts) && followerPosts.length > 0 ? (
              followerPosts.map((post) => (
                <PostCard key={`followers-${post.id}`} post={post} />
              ))
            ) : (
              <div>No posts available.</div>
            ))}
          {active === "myPosts" &&
            (Array.isArray(myPosts) && myPosts.length > 0 ? (
              myPosts.map((post) => (
                <PostCard key={`myPosts-${post.id}`} post={post} />
              ))
            ) : (
              <div>No posts available.</div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Forum;
