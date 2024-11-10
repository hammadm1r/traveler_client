import React from 'react';
import pana from '../assets/Images/Underconstruction-pana1.png';

const UnderConstruction = () => {
  return (
    <div className='flex flex-col h-screen w-full items-center justify-center'>
      <img src={pana} alt='Under Construction' className='w-80 mb-4' />
      <p className='text-xl font-bold  text-lightText '>This Page is Under Construction</p>
      <p className='text-md font-thin  text-lightText' >Please Check Back Later</p>
    </div>
  );
};

export default UnderConstruction;

