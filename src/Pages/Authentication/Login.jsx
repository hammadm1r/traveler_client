import React from "react";
import authPng from "../../assets/Images/Tokyo-pana 1.png"

function Home() {
  return (
    <div className="h-screen bg-cover bg-center overflow-x-hidden grid md:grid-cols-7 ">
      {/* Left Section */}
      <div className="col-span-3 h-screen bg-[#C7A5EA] flex items-center justify-center md:block">
        <div className="text-left ml-10 text-2xl font-bold text-[rgba(0,0,0,0.55)]">
          <div>
            <p>Get reliable and accurate travel<br /> information all on one site.</p>
          </div>
          <img src={authPng} alt="Travel illustration" className="mt-8" />
        </div>
      </div>

      {/* Right Section */}
      <div className="col-span-4 flex items-center justify-center">
        <div className="w-full max-w-md ml-10">
          <p className="text-2xl font-bold text-[#2A2B2C] mb-4">Sign In to Traveler</p>
          <label className="text-large font-semibold mb-4">Email</label>
          <input
            type="text"
            placeholder="Username"
            className="px-4 py-2 border border-gray-400 rounded w-full mb-4"
          />
        <label className="text-large font-semibold mb-4">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 border border-gray-400 rounded w-full mb-4"
          />
          <button className="px-4 py-2 bg-[#2A2B2C] text-white font-bold rounded w-full">Sign In</button>
        </div>
      </div>
    </div>
  );
}

export default Home;

