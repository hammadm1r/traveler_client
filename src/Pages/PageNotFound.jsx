import React from 'react'
import notFound from "../assets/Images/404Error.png"

export const PageNotFound = () => {
  return (
    <div className='flex flex-col h-screen w-full items-center justify-center'>
  <img src={notFound} alt='Not Found' className='w-80' />
  <p className='text-xl font-bold text-lightText'>404 - Page Not Found</p>
  <p className='text-md font-thin text-lightText'>Sorry, the page you are looking for doesn't exist.</p>
</div>

  )
}
