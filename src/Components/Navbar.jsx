import React, { useState, useEffect, useRef } from "react";
import Logo from "../assets/Images/logoColor.png";
import { FaCircleUser } from "react-icons/fa6";
import { IoReorderThreeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import {
  removeItem,
  getItem,
  KEY_ACCESS_TOKEN,
} from "../utils/LocalStorageManager";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { IoIosLogOut } from "react-icons/io";
import { setLoggedIn } from "../Toolkit/slices/appConfigSlice";
import Swal from "sweetalert2";
import { IoMdNotifications } from "react-icons/io";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.appConfig.isLoggedIn);
  const user = getItem(KEY_ACCESS_TOKEN);
  const myProfile = useSelector((state) => state.appConfig.myProfile);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const subMenuRef = useRef(null);
  const userId = myProfile?._id;

  // Toggle mobile menu visibility
  const menuHandler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Toggle submenu visibility
  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  // Close submenu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (subMenuRef.current && !subMenuRef.current.contains(event.target)) {
        setIsSubMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const location = useLocation();

useEffect(() => {
  // Close submenu and mobile menu whenever the route changes
  setIsSubMenuOpen(false);
  setIsMenuOpen(false);
}, [location.pathname]);
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to Logout?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeItem(KEY_ACCESS_TOKEN);
        window.location.replace("/");
      }
    });
  };

  // Common Menu Items
  const menuItems = (
    <> 
      <li
        className="text-white text-lg font-semibold hover:text-blue-400"
        onClick={menuHandler}
      >
        <Link to="/home">Home</Link>
      </li>
      <li
        className="text-white text-lg font-semibold hover:text-blue-400"
        onClick={menuHandler}
      >
        <Link to="/story">Story</Link>
      </li>
      <li
        className="text-white text-lg font-semibold hover:text-blue-400"
        onClick={menuHandler}
      >
        <Link to="/forum">Forum</Link>
      </li>
      <li
        className="text-white text-lg font-semibold hover:text-blue-400"
        onClick={menuHandler}
      >
        <Link to="/traveladvisor">Travel Advisor</Link>
      </li>

      {isLoggedIn && (
        <li className="relative">
          <button onClick={toggleSubMenu} className="focus:outline-none">
            <img
              src={myProfile?.profilePicture?.url || ""}
              alt={
                myProfile?.profilePicture?.url ? "Profile Picture" : "User Icon"
              }
              className="w-8 h-8 object-cover border-2 border-bgPrimary rounded-full"
            />
          </button>

          {/* Submenu */}
          {isSubMenuOpen && (
            <ul
              ref={subMenuRef}
              className="absolute right-0 mt-2 w-40 bg-gray-800 text-white rounded-lg shadow-lg p-2 z-100"
            >
              <Link to={`/profile/${userId}`}>
                <li
                  className="p-2 hover:bg-gray-700 rounded"
                  onClick={(e) => e.stopPropagation()}
                >
                  Profile
                </li>
              </Link>
              <Link to="/notification">
                <li
                  className="p-2 hover:bg-gray-700 rounded"
                  onClick={(e) => e.stopPropagation()}
                >
                  Notification
                </li>
              </Link>
              <li
                className="p-2 hover:bg-gray-700 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLogout();
                }}
              >
                Logout
              </li>
            </ul>
          )}
        </li>
      )}
    </>
  );

  return (
    <div>
      {/* Overlay when menu is open (only visible on mobile screens) */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center sm:hidden"
          onClick={menuHandler}
        />
      )}

      <div className="bg-transparent absolute top-0 left-0 w-full z-10 p-4 sm:p-6 flex items-center justify-between">
        <Link to="/home">
          <img src={Logo} alt="Logo" className="h-6 sm:h-6 md:h-8" />
        </Link>

        {/* Desktop Navigation */}
        <div
          className={`justify-center hidden ${
            isLoggedIn ? "md:block" : "md:hidden"
          }`}
        >
          <ul className="flex gap-7">{menuItems}</ul>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden ${isLoggedIn ? "block" : "hidden"}`}>
          <button
            onClick={menuHandler}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
            className={`text-white text-right text-3xl font-semibold transform transition-transform duration-300 ${
              isMenuOpen ? "rotate-90" : ""
            }`}
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
    </div>
  );
};

export default Navbar;
