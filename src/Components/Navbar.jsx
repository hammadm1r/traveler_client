import React, { useState, useEffect, useRef } from "react";
import Logo from "../assets/Images/t(3).gif";
import { FaCircleUser } from "react-icons/fa6";
import { IoReorderThreeOutline } from "react-icons/io5";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { removeItem, getItem, KEY_ACCESS_TOKEN } from "../utils/LocalStorageManager";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { IoMdNotifications } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { setLoggedIn } from "../Toolkit/slices/appConfigSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.appConfig.isLoggedIn);
  const myProfile = useSelector((state) => state.appConfig.myProfile);
  const user = getItem(KEY_ACCESS_TOKEN);
  const userId = myProfile?._id;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const subMenuRef = useRef(null);

  const menuHandler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (subMenuRef.current && !subMenuRef.current.contains(event.target)) {
        setIsSubMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const location = useLocation();
  useEffect(() => {
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

  const menuItems = (
    <>
      <li className="hover:text-blue-400">
        <Link to="/home" >Home</Link>
      </li>
      <li className="hover:text-blue-400" >
        <Link to="/story" >Story</Link>
      </li>
      <li className="hover:text-blue-400" >
        <Link to="/forum">Forum</Link>
      </li>
      <li className="hover:text-blue-400">
        <Link to="/traveladvisor">Travel Advisor</Link>
      </li>

      {isLoggedIn && (
        <li className="relative">
          <button onClick={toggleSubMenu} className="focus:outline-none">
            <img
              src={myProfile?.profilePicture?.url || ""}
              alt="User"
              className="w-8 h-8 object-cover border-2 border-bgPrimary rounded-full"
            />
          </button>
          {isSubMenuOpen && (
            <ul
              ref={subMenuRef}
              className="absolute right-0 mt-2 w-40 bg-gray-800 text-white rounded-lg shadow-lg p-2 z-50"
            >
              <Link to={`/profile/${userId}`}>
                <li className="p-2 hover:bg-gray-700 rounded" onClick={(e) => e.stopPropagation()}>
                  Profile
                </li>
              </Link>
              <Link to="/notification">
                <li className="p-2 hover:bg-gray-700 rounded" onClick={(e) => e.stopPropagation()}>
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
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="bg-white text-black dark:bg-gray-900 dark:text-white fixed inset-0 z-50 flex flex-col">
          {/* Close Button */}
          <div className="flex justify-end p-6">
            <button onClick={menuHandler} className="text-3xl">
              <RxCross1 />
            </button>
          </div>

          {/* Centered Items */}
          <div className="flex-grow flex justify-center ">
            <ul className="flex flex-col gap-6 text-xl font-semibold text-center">
              {menuItems}
            </ul>
          </div>
        </div>
      )}

      {/* Top Navbar */}
      <div className="bg-transparent absolute top-0 left-0 w-full z-10 p-4 sm:p-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/home">
          <img src={Logo} alt="Logo" className="h-6 md:h-10" />
        </Link>

        {/* Desktop Navigation */}
        <div className={`justify-center hidden ${isLoggedIn ? "md:block" : "md:hidden"}`}>
          <ul className="flex gap-7 text-white text-lg font-semibold">{menuItems}</ul>
        </div>

        {/* Mobile Menu Toggle Button */}
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
