import React from 'react'
import LogoMarket from "../assets/logo.svg"

const Navbar = () => {
  return (
    <div className='bg-black p-4 text-white flex justify-between'>
      <div className='flex gap-x-2 cursor-default'>
        <img src={LogoMarket} alt="" />
        <h1 className='text-white text-2xl font-bold flex items-center'>Fresh<span className='text-[#62CD14]'>Market</span></h1>
      </div>
      <div className='flex items-center gap-x-6 cursor-pointer'>
        <p className='hover:text-[#62CD14]'>Home</p>
        <p className='hover:text-[#62CD14]'>Products</p>
        <p className='hover:text-[#62CD14]'>About Us</p>
        <p className='hover:text-[#62CD14]'>Contact</p>
        <p className='hover:text-[#62CD14]'>ChatBox</p>
      </div>
      <div className='flex items-center gap-x-4'>
        <button className='hover:text-[#62CD14]'>
            Sign In
        </button>
        <button className='bg-[#347C00] w-20 h-10 rounded hover:bg-[#2B6700]'>
            Sign Up
        </button>
      </div>
    </div>
  )
}

export default Navbar
