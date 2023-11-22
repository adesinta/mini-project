import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../features/Darkmode";
import LogoMarket from "../assets/logo.svg";
import cartIcon from "../assets/cart-white.svg";
import ToggleButton from "./ToggleDarkMode";
import Swal from "sweetalert2";

const Navbar = ({ showNavbarOption, showHomeButton }) => {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const [activeSection, setActiveSection] = useState(null);

  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

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

  const clearActiveSection = () => {
    setActiveSection(null);
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
      <div
        onClick={() => {
          navigate("/");
        }}
        className="flex gap-x-2 cursor-default"
      >
        <img src={LogoMarket} alt="" />
        <h1
          className="text-white text-2xl font-bold flex items-center"
          style={headerStyle}
        >
          Fresh<span className="text-[#62CD14]">Market</span>
        </h1>
      </div>

      {showNavbarOption && (
        <div className="flex items-center gap-x-6 cursor-pointer">
          <p
            onClick={() => {
              handleScrollToSection("Home");
              clearActiveSection();
            }}
            className={activeSection === "home" ? "text-[#62CD14]" : "hover:text-[#347C00]"}
          >
            Home
          </p>
          <p
            onClick={() => {
              navigate("/products")
            }}
            className={activeSection === "products" ? "text-[#62CD14]" : "hover:text-[#347C00]"}
          >
            Products
          </p>
          <p
            onClick={() => {
              handleScrollToSection("aboutUs");
              clearActiveSection();
            }}
            className={activeSection === "aboutUs" ? "text-[#62CD14]" : "hover:text-[#347C00]"}
          >
            About Us
          </p>
          <p
            onClick={() => {
              handleScrollToSection("chatbox");
              clearActiveSection();
            }}
            className={activeSection === "chatBox" ? "text-[#62CD14]" : "hover:text-[#347C00]"}
          >
            ChatBox
          </p>
          <p
            onClick={() => {
              handleScrollToSection("contact-us");
              clearActiveSection();
            }}
            className={activeSection === "contact" ? "text-[#62CD14]" : "hover:text-[#347C00]"}
          >
            Contact
          </p>
        </div>
      )}
      <div className="flex items-center gap-x-10">
        <div className="flex gap-x-4">
          {showHomeButton && (
            <button
              onClick={() => {
                navigate("/")
              }}
              className="hover:text-[#347C00]"
            >
              Home
            </button>
          )}
          <button
            onClick={() => {
              navigate("/cart");
              clearActiveSection();
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
            <button
              onClick={() => {
                handleLogout();
                clearActiveSection();
              }}
              className="bg-[#347C00] w-20 h-10 rounded hover:bg-[#2B6700]"
            >
              Log out
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-x-4">
            <button
              onClick={() => {
                handleScrollToSection("signIn");
                clearActiveSection();
              }}
              className={activeSection === "signIn" ? "text-[#62CD14]" : ""}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                handleScrollToSection("signUp");
                clearActiveSection();
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
