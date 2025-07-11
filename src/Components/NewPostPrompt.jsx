import {useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CiImageOn } from "react-icons/ci";
import ProfileImage from "./ProfileImage";
import { useSelector } from "react-redux";

const NewPostPrompt = () => {
  const navigate = useNavigate();
  const myProfile = useSelector((state) => state.appConfig.myProfile);
  const handleClick = () => {
    navigate("/createpost");
  };
  const [placeholder, setPlaceholder] = useState("What's new on your Journey?");

  useEffect(() => {
    const updatePlaceholder = () => {
      if (window.innerWidth < 640) {
        // Mobile breakpoint in Tailwind (sm = 640px)
        setPlaceholder("What's new?");
      } else {
        setPlaceholder("What's new on your Journey?");
      }
    };

    updatePlaceholder();
    window.addEventListener("resize", updatePlaceholder);

    return () => window.removeEventListener("resize", updatePlaceholder);
  }, []);

  return (
    <div
      className="flex items-center p-4 cursor-pointer mb-5 rounded-2xl bg-white border border-gray-300 shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out"
      onClick={handleClick}
    >
      {/* Profile image */}
      <img
  src={myProfile?.profilePicture?.url}
  alt="O"
  className="w-14 h-14 rounded-full object-cover transition-opacity duration-300 ease-in-out"
/>


      {/* Input field */}
      <input
        type="text"
        className="flex-1 pl-4 bg-transparent outline-none text-gray-600 text-lg placeholder-gray-400"
        placeholder={placeholder}
      />

      {/* Icon */}
      <CiImageOn className="w-8 h-8 md:block hidden text-bgPrimary rounded-full p-1 hover:bg-gray-100 transition-colors duration-200 ease-in-out" />
    </div>
  );
};

export default NewPostPrompt;
