import React from 'react'
import { Link } from 'react-router-dom';

const Landing = () => {
  
  return (
    <>
    <div
      className="h-screen bg-cover bg-center overflow-x-hidden bg-hero-pattern "
      // style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="md:pt-8 md:pl-8 text-wrap mt-20 ml-2 font-semibold text-xl text-white">
          <pre>Access live travel updates ✈️,<br/>
               discussion forum 💬,<br/>
              currency converter 💵,<br/>
               and more... all on Traveler.</pre>
               <Link to="/signup" ><button className="bg-bgPrimary px-5 py-3 mt-6 rounded-lg font-semibold">Get started</button></Link>
      </div>
    </div>
  </>
  )
}

export default Landing