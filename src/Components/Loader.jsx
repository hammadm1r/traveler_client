import React from 'react';
import Lottie from 'react-lottie';
import loaderData from '../assets/circle-loader.json'; // Import the loader JSON

const Loader = () => {
  const defaultOptions = {
    loop: true, // The animation will repeat
    autoplay: true, // Start playing automatically
    animationData: loaderData, // Your loader JSON data
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice", // Ensures correct aspect ratio for the animation
    },
  };

  return <div className='pt-36'>
  {<Lottie options={defaultOptions} height={150} width={150} />}
  <p className='text-center text-2xl font-bold text-bgPrimary'>Wait The Content Is Loading....</p>
  </div>
};

export default Loader;
