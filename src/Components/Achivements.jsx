import React, { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useSelector } from "react-redux";
const Achivements = () => {
  const [isContentOpen, setIsContentOpen] = useState(false); // To track if content is open or closed
  const myProfile = useSelector((state) => state.userProfile.user);
  const totalAchievements = [
    {
      id: 1,
      src: "https://res.cloudinary.com/djiqzvcev/image/upload/v1739281946/achivement3_hlkpml.png",
      alt: "first_Step",
      title: "first_Step",
    },
    {
      id: 2,
      src: "https://res.cloudinary.com/djiqzvcev/image/upload/v1739281968/achivement2_xqn8uc.png",
      alt: "adventurer",
      title: "adventurer",
    },
    {
      id: 3,
      src: "https://res.cloudinary.com/djiqzvcev/image/upload/v1739309183/achivement4_xeacf0_c_crop_w_400_h_400_puophi.png",
      alt: "explorer",
      title: "explorer",
    },
    {
      id: 4,
      src: "https://res.cloudinary.com/djiqzvcev/image/upload/v1739307386/mountain-and-lake-travel-badge-with-airplane_10964465_tvmfaa.png",
      alt: "Nomad",
      title: "Nomad",
    },
    {
      id: 5,
      src: "https://res.cloudinary.com/djiqzvcev/image/upload/v1739307394/pngtree-mountain-summer-time-badge-png-image_11928438_axvgod.png",
      alt: "Nature Lover",
      title: "Nature Lover",
    },
    {
      id: 6,
      src: "https://res.cloudinary.com/djiqzvcev/image/upload/v1739307403/travel-badge-with-forest-lake-mountain-and-beautiful-landscape-_10964474_qagip6.png",
      alt: "Cultural Traveler",
      title: "Cultural Traveler",
    },
  ];

  const handleToggleContent = () => {
    setIsContentOpen(!isContentOpen); // Toggle the content visibility
  };

  return (
    <div className="rounded-t-xl overflow-hidden shadow-lg">
      <div className="text-bgSecondary p-4 bg-bgPrimary justify-between flex items-center">
        <p className="text-xl md:text-2xl font-semibold text-left">
          Achievements
        </p>
        <p
          className="text-xl md:text-3xl text-right cursor-pointer"
          onClick={handleToggleContent}
        >
          {isContentOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
        </p>
      </div>

      {isContentOpen && (
        <div className="flex overflow-x-auto gap-4 p-4">
          {totalAchievements.map((achievement, index) => {
            const hasBadge = myProfile?.badges?.some(
              (badge) => badge.name === achievement.title
            );

            // Debugging Output (if needed)
            console.log(
              `Achievement: ${achievement.title}, Has Badge: ${hasBadge}`
            );

            return (
              <div
                key={index}
                className={`relative group w-24 md:w-32 h-24 md:h-32 rounded-xl overflow-hidden transition-transform transform 
            ${hasBadge ? "" : "grayscale"} hover:scale-105`}
              >
                <img
                  src={achievement.src}
                  alt={achievement.alt}
                  aria-label={achievement.alt}
                  className="w-full h-full object-cover transition-opacity duration-300 ease-in-out"
                />
                {!hasBadge && (
                  <div className="absolute inset-0 bg-black opacity-50 flex items-center justify-center text-white font-bold text-lg">
                    Locked
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Achivements;
