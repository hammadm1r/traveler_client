import React from "react";
import bgImage from "../assets/Images/bg-Img.png";
function Home() {
  return (
    <>
      <div
        className="h-screen bg-cover bg-center overflow-x-hidden bg-hero-pattern "
        // style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="md:pt-8 md:pl-8 text-wrap mt-8 ml-2 font-semibold text-xl text-white">
            <pre>Access live travel updates ✈️,<br/>
                 discussion forum 💬,<br/>
                currency converter 💵,<br/>
                 and more... all on Traveler.</pre>
                 <button className="bg-bgPrimary px-5 py-3 mt-6 rounded-lg font-semibold">Get started</button>
        </div>
      </div>
    </>
  );
}

export default Home;
