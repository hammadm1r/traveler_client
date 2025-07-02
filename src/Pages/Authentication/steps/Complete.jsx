import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../../../utils/axiosClient";
import { setItem, KEY_ACCESS_TOKEN } from "../../../utils/LocalStorageManager";
import { setLoggedIn } from "../../../Toolkit/slices/appConfigSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { uploadProfilePictureToCloudinary } from "../../../utils/cloudinaryUpload";

const Complete = ({ accountSetupInfo, accountInfo }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    setLoading(true);
    try {
      let uploadedProfilePicture = null;

      if (accountSetupInfo.profilePicture) {
        uploadedProfilePicture = await uploadProfilePictureToCloudinary(
          accountSetupInfo.profilePicture
        );
      }

      // Prepare plain JS object
      const signupData = {
        username: accountInfo.username,
        email: accountInfo.email,
        password: accountInfo.password,
        fullname: accountSetupInfo.fullname,
        bio: accountSetupInfo.bio,
        dateOfBirth: accountSetupInfo.dateOfBirth,
        kofi: accountSetupInfo.kofi,
        interests: accountSetupInfo.interests,
        profilePictureUrl: uploadedProfilePicture?.secure_url || null,
        profilePicturePublicId: uploadedProfilePicture?.public_id || null,
      };

      // Send JSON directly
      const response = await axiosClient.post("auth/signup", signupData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response?.data?.result) {
        setItem(KEY_ACCESS_TOKEN, response.data.result);
        dispatch(setLoggedIn(true));
        toast.success("Sign Up Successful");
        navigate("/home");
      } else {
        toast.error(response.data?.message || "Sign Up Failed");
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.error?.message || "An error occurred during sign-up"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleSignUp}
        disabled={loading}
        className={`px-4 py-2 font-bold rounded w-full transition duration-300
    ${
      loading
        ? "bg-[#AC68F7] opacity-50 cursor-not-allowed"
        : "bg-[#AC68F7] hover:bg-[#7C4BD4] text-white"
    }
  `}
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
    </div>
  );
};

export default Complete;
