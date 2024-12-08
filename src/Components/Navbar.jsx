import React from "react";
import Logo from "../assets/Images/logoColor.png";
import { FaCircleUser } from "react-icons/fa6";
import { IoReorderThreeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Navbar = () => {
  const userId = 123;
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuHandler = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  console.log("Navbar component rendered");
  console.log("User ID:", userId);
  console.log("Menu open state:", isMenuOpen);

  return (
    <div className="bg-transparent absolute top-0 left-0 w-full z-10 p-4 sm:p-6 flex items-center justify-between">
      <Link to="/home">
        <img src={Logo} alt="Logo" className="h-6 sm:h-6 md:h-8" />
      </Link>
      <div className="justify-center md:block hidden">
        <ul className="flex gap-7">
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
          <li className="text-white text-right text-3xl font-semibold hover:text-blue-400">
            <Link
              to={`/profile/${userId}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <FaCircleUser />
            </Link>
          </li>
        </ul>
      </div>
      <div className="md:hidden block">
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
              <li className="text-white text-lg font-semibold hover:text-blue-400 transition-colors duration-200">
                <Link to="/home" onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li className="text-white text-lg font-semibold hover:text-blue-400 transition-colors duration-200">
                <Link to="/story" onClick={() => setIsMenuOpen(false)}>
                  Story
                </Link>
              </li>
              <li className="text-white text-lg font-semibold hover:text-blue-400 transition-colors duration-200">
                <Link to="/forum" onClick={() => setIsMenuOpen(false)}>
                  Forum
                </Link>
              </li>
              <li className="text-white text-lg font-semibold hover:text-blue-400 transition-colors duration-200">
                Travel Advisor
              </li>
              <li className="text-white text-3xl font-semibold hover:text-blue-400 transition-colors duration-200">
                <Link
                  to={`/profile/${userId}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaCircleUser />
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
