import React from 'react';
import { Link } from 'react-router-dom';
const Complete = () => {
  const handleSignUp = () => {
    // Add logic for completing sign-up, e.g., form submission
    console.log("Sign Up Complete");
    // You can redirect to another page or show a success message here
  };

  return (
    <div>
      <button
        onClick={handleSignUp}
        className="px-4 py-2 bg-[#AC68F7] text-white font-bold rounded w-full hover:bg-[#7C4BD4] transition duration-300"
      >
        <Link to="/home">Sign Up</Link>
      </button>
    </div>
  );
};

export default Complete;
