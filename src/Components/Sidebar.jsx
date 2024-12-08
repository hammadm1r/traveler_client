import React, { useState } from "react";
import { PiChatsCircle } from "react-icons/pi";
import { IoIosAddCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { RiWechatPayLine } from "react-icons/ri";

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
