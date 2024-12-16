import React from "react";
import { Link } from "react-router-dom";
const AccountInformation = ({ setCurrentStep }) => {
  return (
    <div className="w-full max-w-md mx-auto sm:mx-0">
      {/* Login prompt */}

      {/* Sign Up Form */}
      <div className="sm:ml-10 mt-12 sm:mt-18">
        <p className="text-2xl sm:text-3xl font-bold text-[#2A2B2C] mb-4">
          Sign Up to Traveler
        </p>

        {/* Username Label and Input */}
        <label
          htmlFor="username"
          className="text-base sm:text-lg text-[#2A2B2C] font-semibold mb-2 sm:mb-4 block"
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="Enter Username"
          className="px-4 py-2 bg-textBox border border-gray-300 rounded w-full mb-4 focus:outline-none focus:ring focus:ring-[#AC68F7]"
        />

        {/* Email Label and Input */}
        <label
          htmlFor="email"
          className="text-base sm:text-lg text-[#2A2B2C] font-semibold mb-2 sm:mb-4 block"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter Email"
          className="px-4 py-2 bg-textBox border border-gray-300 rounded w-full mb-4 focus:outline-none focus:ring focus:ring-[#AC68F7]"
        />

        {/* Password Label and Input */}
        <label
          htmlFor="password"
          className="text-base sm:text-lg text-[#2A2B2C] font-semibold mb-2 sm:mb-4 block"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter Password"
          className="px-4 py-2 bg-textBox border border-gray-300 rounded w-full mb-4 focus:outline-none focus:ring focus:ring-[#AC68F7]"
        />
       
      </div>
    </div>
  );
};

export default AccountInformation;
