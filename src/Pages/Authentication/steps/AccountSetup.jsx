import React, { useState } from "react";

const AccountSetup = ({ setCurrentStep }) => {
  const [fullname, setFullname] = useState("");
  const [bio, setBio] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [interests, setInterests] = useState([]);

  const handleInterestChange = (event) => {
    const value = event.target.value;
    setInterests((prevInterests) =>
      prevInterests.includes(value)
        ? prevInterests.filter((interest) => interest !== value)
        : [...prevInterests, value]
    );
  }
  return (
    <div className="w-full max-w-md mx-auto sm:mx-0">
      <div className="sm:ml-10 mt-12 sm:mt-20">
        <p className="text-2xl sm:text-3xl font-bold text-[#2A2B2C] mb-4">
          Complete Your Account Setup
        </p>

        {/* Full Name */}
        <label
          htmlFor="fullname"
          className="text-base sm:text-lg text-[#2A2B2C] font-semibold mb-2 sm:mb-4 block"
        >
          Full Name
        </label>
        <input
          id="fullname"
          type="text"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          placeholder="Enter Full Name"
          className="px-4 py-2 bg-textBox border border-gray-300 rounded w-full mb-4 focus:outline-none focus:ring focus:ring-[#AC68F7]"
        />

        {/* Bio */}
        <label
          htmlFor="bio"
          className="text-base sm:text-lg text-[#2A2B2C] font-semibold mb-2 sm:mb-4 block"
        >
          Bio (Optional)
        </label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell us about yourself"
          className="px-4 py-2 bg-textBox border border-gray-300 rounded w-full mb-4 focus:outline-none focus:ring focus:ring-[#AC68F7]"
          maxLength="300"
        />

        {/* Date of Birth */}
        <label
          htmlFor="dateOfBirth"
          className="text-base sm:text-lg text-[#2A2B2C] font-semibold mb-2 sm:mb-4 block"
        >
          Date of Birth
        </label>
        <input
          id="dateOfBirth"
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          className="px-4 py-2 bg-textBox border border-gray-300 rounded w-full mb-4 focus:outline-none focus:ring focus:ring-[#AC68F7]"
        />

        {/* Profile Picture Upload */}
        <label
          htmlFor="profilePicture"
          className="text-base sm:text-lg text-[#2A2B2C] font-semibold mb-2 sm:mb-4 block"
        >
          Profile Picture
        </label>
        <input
          id="profilePicture"
          type="file"
          accept="image/*"
          onChange={(e) => setProfilePicture(e.target.files[0])}
          className="px-4 py-2 bg-textBox border border-gray-300 rounded w-full mb-4 focus:outline-none focus:ring focus:ring-[#AC68F7]"
        />

        {/* User Interests */}
        <label
          htmlFor="interests"
          className="text-base sm:text-lg text-[#2A2B2C] font-semibold mb-2 sm:mb-4 block"
        >
          Select Your Interests (Choose multiple if you'd like)
        </label>
        <div className="flex flex-wrap gap-4 mb-4">
          {["Adventure", "History", "Technology", "Art", "Nature", "Food", "Travel", "Sports"].map((interest) => (
            <label key={interest} className="flex items-center">
              <input
                type="checkbox"
                value={interest}
                onChange={handleInterestChange}
                checked={interests.includes(interest)}
                className="mr-2"
              />
              {interest}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountSetup;
