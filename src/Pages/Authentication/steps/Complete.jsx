import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosClient } from "../../../utils/axiosClient";
import { setItem, KEY_ACCESS_TOKEN } from "../../../utils/LocalStorageManager";
import { setLoggedIn } from "../../../Toolkit/slices/appConfigSlice";
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

const Complete = ({ accountSetupInfo, accountInfo }) => {
  const [loading, setLoading] = useState(false); // State to track loading
  const navigate = useNavigate(); // Hook for navigation
  const dispatch = useDispatch();
  const formData = new FormData();
    
    // Append account setup info and account info
    formData.append("username", accountInfo.username);
    formData.append("email", accountInfo.email);
    formData.append("password", accountInfo.password);
    formData.append("fullname", accountSetupInfo.fullname);
    formData.append("bio", accountSetupInfo.bio);
    formData.append("dateOfBirth", accountSetupInfo.dateOfBirth);
    formData.append("kofi", accountSetupInfo.kofi);
    formData.append("interests", JSON.stringify(accountSetupInfo.interests));
    if (accountSetupInfo.profilePicture) {
      formData.append("profilePicture", accountSetupInfo.profilePicture);
    }
  const handleSignUp = async () => {
    setLoading(true); // Set loading state to true while the request is in progress
    
    try {
      // Log the data being sent
      console.log("Account Info:", accountInfo);
      console.log("Account Setup Info:", accountSetupInfo);
    
      // Send the signup request
      const response = await axiosClient.post("auth/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });
    console.log(response);
      // Check if response contains a token
      if (response?.data?.result) {
        setItem(KEY_ACCESS_TOKEN, response.data.result);
        dispatch(setLoggedIn(true));
        toast.success("Sign Up Successful");
        navigate("/home"); // Redirect to home page after successful sign-up
      } else {
        toast.error(response.data?.message || "Sign Up Failed");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.error || "An error occurred during sign-up");
    } finally {
      setLoading(false); // Reset loading state after the request is done
    }
    
  };

  return (
    <div>
      <button
        onClick={handleSignUp}
        className="px-4 py-2 bg-[#AC68F7] text-white font-bold rounded w-full hover:bg-[#7C4BD4] transition duration-300"
        disabled={loading} // Disable button while loading
      >
        {loading ? 'Signing Up...' : 'Sign Up'}
      </button>
    </div>
  );
};

export default Complete;
