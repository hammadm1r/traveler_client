import React from "react";
import authPng from "../../assets/Images/Tokyo-pana 1.png";
import logoLight from "../../assets/Images/logoLight.png";

function Home() {
  return (
    <div className="h-screen bg-cover bg-center overflow-x-hidden grid md:grid-cols-7">
      {/* Left Section */}
      <div className="col-span-3 h-screen bg-[#C7A5EA] hidden sm:flex flex-col items-center justify-center relative">
        {/* Logo aligned to top-left */}
        <div className="absolute top-0 left-4 sm:left-10">
          <img src={logoLight} alt="logo" className="w-24 h-auto sm:w-32" />
        </div>
        <div className="text-left text-2xl font-bold text-[rgba(0,0,0,0.55)] sm:ml-10 mt-20 sm:mt-0">
          <p>
            Get reliable and accurate travel
            <br /> information all on one site.
          </p>
          <img src={authPng} alt="Travel illustration" className="mt-8" />
        </div>
      </div>

      {/* Right Section */}
      <div className="col-span-4 flex items-center justify-center bg-white h-screen px-4 sm:px-0">
        <div className="w-full max-w-md">
          <div className="absolute top-4 right-4 sm:right-10">
            <p className="text-right text-sm sm:text-base">
              Not a Member Yet?{" "}
              <span className="text-[#AC68F7] cursor-pointer">Sign Up</span>
            </p>
          </div>
          <div className="sm:ml-10">
            <p className="text-xl sm:text-2xl font-bold text-[#2A2B2C] mb-4">
              Log In to Traveler
            </p>
            <label className="text-base sm:text-large text-[#2A2B2C] font-semibold mb-2 sm:mb-4">
              Email
            </label>
            <input
              type="text"
              placeholder="Username"
              className="px-4 py-2 bg-textBox rounded w-full mb-4 "
            />
            <label className="text-base sm:text-large text-[#2A2B2C] font-semibold mb-2 sm:mb-4">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="px-4 py-2 bg-textBox rounded w-full mb-4"
            />
            <p className="mb-6 text-right text-[#AC68F7] underline underline-offset-1 text-xs sm:text-sm mt-1 cursor-pointer">
              Forget Password?
            </p>
            <button className="px-4 py-2 bg-[#AC68F7] text-white font-bold rounded w-full">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
