import React, { useRef, useState } from "react";
import { PiChatsCircle } from "react-icons/pi";
import { IoIosAddCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { RiWechatPayLine } from "react-icons/ri";
import { IoSearchSharp } from "react-icons/io5";
import { Navigate, useNavigate } from "react-router";
import { FaTrophy } from "react-icons/fa";
import { axiosClient } from "../utils/axiosClient";
const Sidebar = ({ active, setActive }) => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({ users: [], posts: [] });
  const [showResults, setShowResults] = useState(false);
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

  const handleSearch = async () => {
    const trimmedQuery = searchTerm.trim();
    if (trimmedQuery) {
    navigate(`/search?query=${encodeURIComponent(trimmedQuery)}`);
  }
  };

  return (
    <div>
      <div className="flex justify-center items-center relative w-full max-w-md border-b-2 pb-3">
        <input
          ref={inputRef}
          className="py-2 px-4 bg-gray-200 rounded-xl pl-10 pr-10 w-full"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <IoSearchSharp
          className="text-2xl absolute right-3 top-1/2 -translate-y-[68%] text-gray-500 cursor-pointer"
          onClick={handleSearch}
        />
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
                ? "bg-gradient-to-r from-blue-400 to-green-400"
                : "bg-gray-200 text-gray-700 hover:bg-blue-100"
            }`}
          >
            {item.icon} {item.label}
          </button>
        ))}
                <div className="mt-2 rounded-2xl p-2 mx-auto border-2">
          <h1 className="text-blue-600 text-md font-bold text-center uppercase tracking-widest">
            Trending Tags
          </h1>

          <div className="flex flex-wrap gap-2 justify-center mt-3">
            {["#beach", "#hiking", "#adventure", "#mountains", "#foodie", "#nature"].map((tag, index) => (
              <button
                key={index}
                onClick={() => navigate(`/search?query=${encodeURIComponent(tag)}`)}
                className="px-3 py-1 bg-blue-100 hover:bg-blue-300 text-blue-700 rounded-full text-sm font-semibold transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
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
