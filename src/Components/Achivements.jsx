import React from 'react';
import achivementOne from '../assets/Achivements/achivement1.png';
import achivementTwo from '../assets/Achivements/achivement2.png';
import achivementThree from '../assets/Achivements/achivement3.png';
import achivementFour from '../assets/Achivements/achivement4.png';

const Achivements = () => {
    const TotalAchivements = [
        { src: achivementTwo, achieved: false },
        { src: achivementThree, achieved: true },
        { src: achivementFour, achieved: false },
    ];

    // Sort achievements: Achieved items come first
    const sortedAchievements = [...TotalAchivements].sort((a, b) => b.achieved - a.achieved);

    return (
        <div className="rounded-xl">
            <p className="md:text-3xl md:font-bold text-xl font-semibold text-bgSecondary p-4 bg-bgPrimary">
                Achievements
            </p>
            <div className="flex flex-auto gap-4">
                {sortedAchievements.map((achievement, index) => (
                    <div
                        key={index}
                        className={`md:w-80 md:h-80 w-20 h-20 ${!achievement.achieved ? 'grayscale' : ''}`}
                    >
                        <img
                            src={achievement.src}
                            alt={`Achievement ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Achivements;
