import React, { useState } from "react";
import { PiChatsCircle } from "react-icons/pi";
import { IoIosAddCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { RiWechatPayLine } from "react-icons/ri";
import { IoSearchSharp } from "react-icons/io5";
const Sidebar = () => {
  const [active, setActive] = useState("feed");

  const menuItems = [
    { id: "newPost", icon: <IoIosAddCircle />, label: "New Post" },
    { id: "feed", icon: <PiChatsCircle />, label: "Feed" },
    { id: "followers", icon: <RiWechatPayLine />, label: "Followers" },
    { id: "myPosts", icon: <FaEdit />, label: "My Posts" },
  ];

  return (
    <div>
       <div className="flex justify-center items-center relative w-full max-w-md border-b-2 pb-3">
      <input
        className="py-2 px-4 bg-gray-200 rounded-xl pl-10 pr-10 w-full"
        placeholder="Search"
      />
      <IoSearchSharp className="text-2xl absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
    </div>
      {/* Render buttons dynamically */}

      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActive(item.id)}
          className={`px-5 py-2 mt-2 gap-3 flex items-center justify-center w-full rounded-xl text-lg font-semibold transition-all ${
            active === item.id
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-blue-100"
          }`}
        >
          {item.icon} {item.label}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
