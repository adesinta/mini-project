import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDarkMode } from "../components/Darkmode";
import LogoMarket from "../assets/logo.svg";
import cartIcon from "../assets/cart-white.svg";
import ToggleButton from "./ToggleDarkMode";
import Swal from "sweetalert2";

const Navbar = ({ showNavbarOption }) => {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  const handleLogout = () => {
    Swal.fire({
      text: "Are you sure you want to log out?",
      title: "Logout",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((response) => {
      if (response.isConfirmed) {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user");
        navigate("/sign-in");
      }
    });
  };

  const navbarStyle = {
    backgroundColor: darkMode ? "#000000" : "#ffffff",
    color: darkMode ? "white" : "#000000",
    boxShadow: darkMode
      ? "2px 2px 5px rgba(255, 255, 255, 0.1)"
      : "2px 2px 5px rgba(0, 0, 0, 0.1)",
  };

  const headerStyle = {
    color: darkMode ? "white" : "#000000",
  };

  const signUpStyle = {
    color: darkMode ? "white" : "white",
  };

  const cartIconStyle = {
    filter: darkMode ? "invert(1)" : "invert(0)",
  };

  return (
    <div
      className="p-4 fixed left-0 right-0 text-white flex justify-between z-50"
      style={navbarStyle}
    >
      <Link to={"/"}>
        <div className="flex gap-x-2 cursor-default">
          <img src={LogoMarket} alt="" />
          <h1
            className="text-white text-2xl font-bold flex items-center"
            style={headerStyle}
          >
            Fresh<span className="text-[#62CD14]">Market</span>
          </h1>
        </div>
      </Link>
      {showNavbarOption && (
        <div className="flex items-center gap-x-6 cursor-pointer">
          <a href="#home">
            <p className="hover:text-[#62CD14]">Home</p>
          </a>
          <Link to={"/products"}>
            <p className="hover:text-[#62CD14]">Products</p>
          </Link>
          <a href="#about-us">
            <p className="hover:text-[#62CD14]">About Us</p>
          </a>
          <a href="#chatbox">
            <p className="hover:text-[#62CD14]">ChatBox</p>
          </a>
          <a href="#contact-us">
            <p className="hover:text-[#62CD14]">Contact</p>
          </a>
        </div>
      )}
      <div className="flex items-center gap-x-10">
        <div className="flex gap-x-4">
          <button
            onClick={() => {
              navigate("/cart");
            }}
          >
            <img
              src={cartIcon}
              alt=""
              width={30}
              style={{ ...cartIconStyle, fill: darkMode ? "white" : "black" }}
            />
          </button>
          <ToggleButton />
        </div>
        {localStorage.getItem("isLoggedIn") ? (
          <div>
            <button onClick={handleLogout} className="bg-[#347C00] w-20 h-10 rounded hover:bg-[#2B6700]">
              Log out
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-x-4">
            <button
              onClick={() => {
                navigate("/sign-in");
              }}
              className="hover:text-[#62CD14]"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                navigate("/sign-up");
              }}
              className="bg-[#347C00] w-20 h-10 rounded hover:bg-[#2B6700]"
              style={signUpStyle}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
