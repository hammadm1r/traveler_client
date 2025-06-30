import React from "react";
import logo from "../assets/Images/t.gif";

const Loader = () => {
  return (
    <div className="pt-36 flex justify-center">
      <img src={logo} alt="Loading..." className="w-44 h-44" />
    </div>
  );
};

export default Loader;
