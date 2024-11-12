import React from "react";
import pana from "../assets/Images/Onlineworld-pana1.png";
const Header = () => {
  return (
    <div className="h-28 bg-bgPrimary block md:h-60">
      <div className="h-28 md:block hidden"></div>
      <div className="h-full  flex justify-between">
        <div >
          <p className="text-2xl font-bold text-white md:ml-20 pt-12">Forum Page</p>
          <p className="text-medium font-thin text-white mt-3 md:ml-20 hidden md:block">
            Share your travel experiences and advices with others.
          </p>
        </div>
        <div className="mr-20 md:block hidden">
          <img src={pana} alt="Pana" className="w-60" />
        </div>
      </div>
    </div>
  );
};

export default Header;
