import React, { useState } from 'react';
import { PiChatsCircle } from "react-icons/pi";
import { IoIosAddCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { RiWechatPayLine } from "react-icons/ri";

const Sidebar = () => {
  const [active, setActive] = useState("newPost");

  const handleSetActive = (name) => {
    setActive(name);
  };

  return (
    <div>
      <button
        onClick={() => handleSetActive("newPost")}
        className={`bg-blue-400 px-5 py-2 items-center justify-center flex gap-3 w-full rounded-xl text-lg text-white font-semibold hover:bg-bgPrimary ${
          active === "newPost" ? "bg-blue-500" : ""
        }`}
      >
        <IoIosAddCircle /> New Post
      </button>
      <button
        onClick={() => handleSetActive("feed")}
        className={`mt-4 px-5 py-1 gap-3 flex items-center justify-center w-full rounded-xl text-lg text-lightText font-semibold hover:text-default ${
          active === "feed" ? "text-default font-bold" : ""
        }`}
      >
        <PiChatsCircle /> Feed
      </button>
      <button
        onClick={() => handleSetActive("followers")}
        className={`px-5 py-1 gap-3 flex items-center justify-center w-full rounded-xl text-lg text-lightText font-semibold hover:text-default ${
          active === "followers" ? "text-default font-bold" : ""
        }`}
      >
        <RiWechatPayLine /> Followers
      </button>
      <button
        onClick={() => handleSetActive("myPosts")}
        className={`px-5 py-1 gap-3 flex items-center justify-center w-full rounded-xl text-lg text-lightText font-semibold hover:text-default ${
          active === "myPosts" ? "text-default font-bold" : ""
        }`}
      >
        <FaEdit /> My Posts
      </button>
    </div>
  );
};

export default Sidebar;
