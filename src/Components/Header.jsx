import React from "react";
import pana from "../assets/Images/Onlineworld-pana1.png";
const Header = ({ titlePage, desc, img }) => {
  return (
    <div className="bg-gradient-to-r from-blue-400 to-teal-400 text-white py-4 text-center">
        <h1 className="text-4xl font-bold">{titlePage}</h1>
        <p className="mt-2 text-lg">{desc}</p>
      </div>

  );
};


export default Header;
