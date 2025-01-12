import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosClient } from "../../../utils/axiosClient";
import { setItem, KEY_ACCESS_TOKEN } from "../../../utils/LocalStorageManager";
import { setLoggedIn } from "../../../Toolkit/slices/appConfigSlice";
import { useDispatch } from 'react-redux';

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
      // Log the data being sent for clarity
      console.log('Account Info:', accountInfo);
      console.log('Account Setup Info:', accountSetupInfo);

      const response = await axiosClient.post('auth/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      });
      // Check if response contains a token or user info
      if (response.data.token) {
        setItem(KEY_ACCESS_TOKEN, response.data.token);
        dispatch(setLoggedIn(true));
        console.log('Sign Up Successful');
        navigate('/home'); // Redirect to home page after successful sign-up
      } else {
        console.error('Error: Sign up failed, no token received');
      }
    } catch (error) {
      console.error('Error during sign-up:', error.response ? error.response.data : error.message);
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
