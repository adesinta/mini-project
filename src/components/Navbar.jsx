import React from 'react'
import { Link } from 'react-router-dom'
import LogoMarket from "../assets/logo.svg"

const Navbar = () => {
  return (
    <div className='bg-black p-4 fixed left-0 right-0 text-white flex justify-between'>
      <Link to={"/"}>
      <div className='flex gap-x-2 cursor-default'>
        <img src={LogoMarket} alt="" />
        <h1 className='text-white text-2xl font-bold flex items-center'>Fresh<span className='text-[#62CD14]'>Market</span></h1>
      </div>
      </Link>
      <div className='flex items-center gap-x-6 cursor-pointer'>
        <p className='hover:text-[#62CD14]'>Home</p>
        <Link to={"/products"}>
        <p className='hover:text-[#62CD14]'>Products</p>
        </Link>
        <p className='hover:text-[#62CD14]'>About Us</p>
        <p className='hover:text-[#62CD14]'>Contact</p>
        <p className='hover:text-[#62CD14]'>ChatBox</p>
      </div>
      <div className='flex items-center gap-x-4'>
        <Link to={"/sign-in"}>
        <button className='hover:text-[#62CD14]'>
            Sign In
        </button>
        </Link>
        <Link to={"/sign-up"}>
        <button className='bg-[#347C00] w-20 h-10 rounded hover:bg-[#2B6700]'>
            Sign Up
        </button>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
