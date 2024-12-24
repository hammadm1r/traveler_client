import React, { useState } from 'react';
import achievementOne from '../assets/Achivements/achivement1.png';
import achievementTwo from '../assets/Achivements/achivement2.png';
import achievementThree from '../assets/Achivements/achivement3.png';
import achievementFour from '../assets/Achivements/achivement4.png';
import achievementFive from '../assets/Achivements/achivement5.png';
import { FaArrowDown,FaArrowUp } from "react-icons/fa";
import { IoMdArrowDropdown,IoMdArrowDropup } from "react-icons/io";
const Achivements = () => {
  const [isContentOpen, setIsContentOpen] = useState(false);  // To track if content is open or closed

  const totalAchievements = [
    { src: achievementOne, achieved: true, alt: 'Achievement 1' },
    { src: achievementTwo, achieved: false, alt: 'Achievement 2' },
    { src: achievementThree, achieved: true, alt: 'Achievement 3' },
    { src: achievementFour, achieved: false, alt: 'Achievement 4' },
    { src: achievementFive, achieved: true, alt: 'Achievement 5' }
  ];

  // Sort achievements: Achieved items come first
  const sortedAchievements = totalAchievements.sort((a, b) => b.achieved - a.achieved);

  const handleToggleContent = () => {
    setIsContentOpen(!isContentOpen);  // Toggle the content visibility
  };

  return (
    <div className="rounded-t-xl overflow-hidden shadow-lg">
      <div className="text-bgSecondary p-4 bg-bgPrimary justify-between flex items-center">
        <p className="text-xl md:text-3xl font-semibold text-left">
          Achievements
        </p>
        <p className="text-xl md:text-3xl text-right cursor-pointer" onClick={handleToggleContent}>
          {isContentOpen ? <IoMdArrowDropup />:<IoMdArrowDropdown />}
        </p>
      </div>

      {isContentOpen && (
        <div className="flex overflow-x-auto gap-4 p-4">
          {sortedAchievements.map((achievement, index) => (
            <div
              key={index}
              className={`relative group w-24 md:w-32 h-24 md:h-32 rounded-xl overflow-hidden transition-transform transform ${
                !achievement.achieved ? 'grayscale' : 'hover:scale-105'
              }`}
            >
              <img
                src={achievement.src}
                alt={achievement.alt}
                aria-label={achievement.alt}
                className="w-full h-full object-cover transition-opacity duration-300 ease-in-out"
              />
              {!achievement.achieved && (
                <div className="absolute inset-0 bg-black opacity-50 flex items-center justify-center text-white font-bold text-lg">
                  Locked
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Achivements;
