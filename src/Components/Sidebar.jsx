import React, { useState } from "react";
import { PiChatsCircle } from "react-icons/pi";
import { IoIosAddCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { RiWechatPayLine } from "react-icons/ri";
import { IoSearchSharp } from "react-icons/io5";
import { Navigate, useNavigate } from "react-router";
import { FaTrophy } from "react-icons/fa";
const Sidebar = ({ active, setActive }) => {
  const navigate = useNavigate();
  const menuItems = [
    { id: "newPost", icon: <IoIosAddCircle />, label: "New Post" },
    { id: "feed", icon: <PiChatsCircle />, label: "Feed" },
    { id: "followers", icon: <RiWechatPayLine />, label: "Followers" },
    { id: "myPosts", icon: <FaEdit />, label: "My Posts" },
  ];
  const awardList = [
    { id: "0", icon: <IoIosAddCircle />, label: "Hammadm1r", position: 1 },
    { id: "1", icon: <PiChatsCircle />, label: "Hamza", position: 2 },
    { id: "2", icon: <RiWechatPayLine />, label: "Rabeel", position: 3 },
  ];

  const menuHandler = (item) => {
    if (item.id === "newPost") {
      navigate("/createpost");
      console.log(item.id);
    }
  };
  return (
    <div>
      <div className="flex justify-center items-center relative w-full max-w-md border-b-2 pb-3">
        <input
          className="py-2 px-4 bg-gray-200 rounded-xl pl-10 pr-10 w-full"
          placeholder="Search"
        />
        <IoSearchSharp className="text-2xl absolute right-3 top-5 transform -translate-y-1/2 text-gray-500" />
      </div>
      {/* Render buttons dynamically */}
      <div className="hidden md:block ">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActive(item.id);
              menuHandler(item);
            }}
            className={`px-4 py-2 mt-2 gap-3 flex items-center justify-center w-full rounded-xl text-lg font-semibold transition-all ${
              active === item.id
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-blue-100"
            }`}
          >
            {item.icon} {item.label}
          </button>
        ))}
        <div className="mt-2  rounded-2xl p-2  mx-auto">
      <h1 className="text-blue-600 text-md font-bold text-center uppercase tracking-widest">
         Achivers of The Week 
      </h1>

      {awardList.map((item) => {
        let trophyColor, bgColor, borderColor;
        if (item.position === 1) {
          trophyColor = "text-yellow-500"; // Gold
          bgColor = "bg-yellow-100";
          borderColor = "border-yellow-400";
        } else if (item.position === 2) {
          trophyColor = "text-gray-400"; // Silver
          bgColor = "bg-gray-100";
          borderColor = "border-gray-400";
        } else {
          trophyColor = "text-orange-500"; // Bronze
          bgColor = "bg-orange-100";
          borderColor = "border-orange-400";
        }

        return (
          <div
            key={item.id}
            className={`flex items-center justify-between ${bgColor} border-l-4 ${borderColor} p-2 my-3 rounded-xl shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg`}
          >
            <div className="flex items-center space-x-3">
              {item.icon}
              <p className="text-lg font-semibold text-gray-800">{item.label}</p>
            </div>
            <FaTrophy className={`${trophyColor} text-2xl`} />
          </div>
        );
      })}
    </div>
      </div>

      <div className="block sm:hidden">
        <div className="flex">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActive(item.id);
                menuHandler(item);
              }}
              className={`px-5 py-2 mt-2 gap-3 flex items-center justify-center w-1/4  text-lg font-semibold transition-all ${
                active === item.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-blue-100"
              }`}
            >
              {item.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
