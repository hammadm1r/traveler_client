import React from 'react';
import Logo from "../assets/Images/logolight.png";
import { FaCircleUser } from "react-icons/fa6";
import { IoReorderThreeOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
const menuHandler = () => {
    setIsMenuOpen(!isMenuOpen);
};

  return (
    <div className='bg-transparent absolute top-0 left-0 w-full z-10 p-4 sm:p-6 flex items-center justify-between'>
        <img src={Logo} alt='Logo' className='h-6 sm:h-6 md:h-8' />
        {/* Add more elements to the navbar here if needed (e.g., navigation links) */}
        <div className='justify-center md:block hidden'>
            <ul className='flex gap-7'>
                <li className='text-white text-lg font-semibold'><Link to="/home">Home</Link></li>
                <li className='text-white text-lg font-semibold'><Link to="/story">Story</Link></li>
                <li className='text-white text-lg font-semibold'><Link to="/forum">Forum</Link></li>
                <li className='text-white text-lg font-semibold'>Travel Advisor</li>
                <li className='text-white text-right text-3xl font-semibold'><FaCircleUser /></li>
            </ul>
        </div>
        <div className=' md:hidden block'>
        <button
          onClick={menuHandler}
          className={`text-white text-right text-3xl font-semibold transform transition-transform duration-300 ${
            isMenuOpen ? 'rotate-90' : ''
          }`}
        >
          <IoReorderThreeOutline />
        </button>
        </div>
    </div>
  );
};

export default Navbar;

