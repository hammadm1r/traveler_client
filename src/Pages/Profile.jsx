import React from "react";
import ProfileImage from "../Components/ProfileImage";
import UserImage from "../assets/Images/UserImage.jpeg";
const Profile = () => {
  return (
    <div className="mt-24 md:mx-20 mx-4">
  <div className="grid grid-cols-1 md:grid-cols-6 gap-6 items-center">
    {/* User Image Section */}
    <div className="md:col-span-2 flex justify-center">
      <img
        src={UserImage}
        alt="User"
        className="md:w-72 md:h-72 w-44 h-44 object-cover rounded-full"
      />
    </div>

    {/* User Info Section */}
    <div className="md:col-span-4 text-center md:text-left">
      {/* Stats Section */}
      <div className="max-w-md mx-auto md:mx-0 justify-center bg-bgPrimary rounded-2xl grid grid-cols-3 gap-4 p-4">
        <div className="text-center">
          <p className="md:text-2xl text-lg font-bold text-bgSecondary">102</p>
          <p className="md:text-md text-sm font-medium text-bgSecondary">Followers</p>
        </div>
        <div className="border-x-2 border-t-textBox text-center">
          <p className="md:text-2xl text-lg font-bold text-bgSecondary">102</p>
          <p className="md:text-md text-sm font-medium text-bgSecondary">Followings</p>
        </div>
        <div className="text-center">
          <p className="md:text-2xl text-lg font-bold text-bgSecondary">29</p>
          <p className="md:text-md text-sm font-medium text-bgSecondary">Posts</p>
        </div>
      </div>

      {/* Name and Username Section */}
      <div className="mt-5">
        <p className="text-3xl font-bold text-bgPrimary">Hammad Farooq Ahmed Meer</p>
        <p className="text-xl font-semibold text-lightText">@hammadm1r</p>
      </div>
    </div>
  </div>
</div>

  );
};

export default Profile;
