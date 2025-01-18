import { useState } from "react";
import React from "react";
import authPng from "../../assets/Images/Tokyo-pana 1.png";
import logoLight from "../../assets/Images/logoLight.png";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { axiosClient } from "../../utils/axiosClient";
import { setItem,KEY_ACCESS_TOKEN } from "../../utils/LocalStorageManager";
import {setLoggedIn} from "../../Toolkit/slices/appConfigSlice"

function Home() {
  const [email,setEmail]= useState('');
  const [password,setPassword]= useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const submitHandler  = async() =>{
    try {
      const response = await axiosClient.post('auth/login',{email,password});
      console.log(response);
      setItem(KEY_ACCESS_TOKEN,response.data.result.token);
      dispatch(setLoggedIn(true));
      navigate("/home", { replace: true });
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="min-h-screen bg-cover bg-center overflow-x-hidden grid md:grid-cols-7">
      {/* Left Section */}
      <div className="col-span-3 h-screen bg-[#C7A5EA] hidden sm:flex flex-col items-center justify-center relative">
        {/* Logo aligned to top-left */}

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
          <div className="sm:ml-10">
            <p className="text-xl sm:text-2xl font-bold text-[#2A2B2C] mb-4">
              Log In to Traveler
            </p>
            <label className="text-base sm:text-large text-[#2A2B2C] font-semibold mb-2 sm:mb-4">
              Email
            </label>
            <input
              type="text"
              placeholder="Email"
              className="px-4 py-2 bg-textBox rounded w-full mb-4 "
              onChange={(e)=> setEmail(e.target.value)}
            />
            <label className="text-base sm:text-large text-[#2A2B2C] font-semibold mb-2 sm:mb-4">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="px-4 py-2 bg-textBox rounded w-full mb-4"
              onChange={(e)=> setPassword(e.target.value)}
            />
            <p className="mb-6 text-right text-[#AC68F7] underline underline-offset-1 text-xs sm:text-sm mt-1 cursor-pointer">
              Forget Password?
            </p>
            <button className="px-4 py-2 bg-[#AC68F7] text-white font-bold rounded w-full " onClick={submitHandler}>
              Sign In
            </button>
            <p className="text-center text-sm sm:text-base mt-4">
              Not a Member Yet?{" "}
              <span className="text-[#AC68F7] cursor-pointer"><Link to="/signup">Sign Up</Link></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
