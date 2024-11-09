import React from 'react'
import Logo from "../assets/Images/logoColor.png"
const Navbar = () => {
  return (
    <div className='bg-transparent absolute top-0 left-0 w-full z-10'>
        <img src={Logo} alt='Logo' className='h-32 pl-20'/>
        
    </div>
  )
}

export default Navbar