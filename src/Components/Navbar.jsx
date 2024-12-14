import React, { useState, useEffect } from "react";
import Logo from "../assets/Images/logoColor.png";
import { FaCircleUser } from "react-icons/fa6";
import { IoReorderThreeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { getItem, KEY_ACCESS_TOKEN } from '../utils/LocalStorageManager';
import { useSelector } from "react-redux";

const Navbar = () => {
  // State to handle mobile menu
  const isLoggedIn = useSelector((state) =>state.appConfig.isLoggedIn);
  const myProfile = useSelector((state)=>state.appConfig.myProfile);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // State to check if the user is logged in
  const userId = myProfile?._id;

  // Toggle mobile menu visibility
  const menuHandler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Common Menu Items
  const menuItems = (
    <>
      <li className="text-white text-lg font-semibold hover:text-blue-400">
        <Link to="/home">Home</Link>
      </li>
      <li className="text-white text-lg font-semibold hover:text-blue-400">
        <Link to="/story">Story</Link>
      </li>
      <li className="text-white text-lg font-semibold hover:text-blue-400">
        <Link to="/forum">Forum</Link>
      </li>
      <li className="text-white text-lg font-semibold hover:text-blue-400">
        Travel Advisor
      </li>
      {isLoggedIn && (
        <li className="text-white text-3xl font-semibold hover:text-blue-400">
        <Link to={`/profile/${userId}`}>
          {/* If no profile picture, fall back to an icon */}
          <img 
            src={myProfile?.profilePicture?.url || ''} 
            alt={myProfile?.profilePicture?.url ? "Profile Picture" : "User Icon"} 
            className="w-8 h-8 object-cover border-2 border-bgPrimary rounded-full" 
          />
        </Link>
      </li>
      
      )}
    </>
  );

  return (
    <div className="bg-transparent absolute top-0 left-0 w-full z-10 p-4 sm:p-6 flex items-center justify-between">
      <Link to="/home">
        <img src={Logo} alt="Logo" className="h-6 sm:h-6 md:h-8" />
      </Link>

      {/* Desktop Navigation */}
      <div className={`justify-center hidden ${isLoggedIn ? "md:block" : "md:hidden" }`}>
        <ul className="flex gap-7">{menuItems}</ul>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${isLoggedIn ? "hidden" : "block" }`}>
        <button
          onClick={menuHandler}
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
          className={`text-white text-right text-3xl font-semibold transform transition-transform duration-300 ${isMenuOpen ? "rotate-90" : ""}`}
        >
          <IoReorderThreeOutline />
        </button>

        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-gradient-to-b from-gray-900 to-gray-700 shadow-lg rounded-b-lg">
            <ul className="flex flex-col items-center p-6 gap-3 transition-all duration-300 ease-in-out">
              {menuItems}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
