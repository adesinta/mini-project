import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../features/Darkmode";
import HumbergerIcon from "../../assets/humberger-icon.svg";
import LogoMarket from "../../assets/logo.svg";
import cartIcon from "../../assets/cart-white.svg";
import ToggleButton from "./ToggleDarkMode";
import Swal from "sweetalert2";

const Navbar = ({ showNavbarOption, showHomeButton }) => {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

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
      className="p-4 fixed right-0 left-0 text-white flex justify-between z-50  w-full"
      style={navbarStyle}
    >
      <div
        onClick={() => {
          navigate("/");
        }}
        className="hidden sm:flex gap-x-2 cursor-default"
      >
        <img src={LogoMarket} alt="" />
        <h1
          className="text-white lg:text-2xl font-bold flex items-center"
          style={headerStyle}
        >
          Fresh<span className="text-[#62CD14]">Market</span>
        </h1>
      </div>

      {showNavbarOption && (
        <div className="hidden sm:flex  items-center gap-x-6 cursor-pointer">
          <p
            onClick={() => {
              handleScrollToSection("Home");
              clearActiveSection();
            }}
            className={
              activeSection === "home"
                ? "text-[#62CD14]"
                : "hover:text-[#347C00]"
            }
          >
            Home
          </p>
          <p
            onClick={() => {
              navigate("/products");
            }}
            className={
              activeSection === "products"
                ? "text-[#62CD14]"
                : "hover:text-[#347C00]"
            }
          >
            Products
          </p>
          <p
            onClick={() => {
              handleScrollToSection("aboutUs");
              clearActiveSection();
            }}
            className={
              activeSection === "aboutUs"
                ? "text-[#62CD14]"
                : "hover:text-[#347C00]"
            }
          >
            About Us
          </p>
          <p
            onClick={() => {
              handleScrollToSection("chatbox");
              clearActiveSection();
            }}
            className={
              activeSection === "chatBox"
                ? "text-[#62CD14]"
                : "hover:text-[#347C00]"
            }
          >
            ChatBox
          </p>
          <p
            onClick={() => {
              handleScrollToSection("contact-us");
              clearActiveSection();
            }}
            className={
              activeSection === "contact"
                ? "text-[#62CD14]"
                : "hover:text-[#347C00]"
            }
          >
            Contact
          </p>
        </div>
      )}

      <div className="hidden sm:flex items-center gap-x-10">
        <div className="flex gap-x-4">
          {showHomeButton && (
            <button
              onClick={() => {
                navigate("/");
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
                navigate("/sign-in");
              }}
              className={activeSection === "signIn" ? "text-[#62CD14]" : ""}
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

      <div className="sm:hidden ">
        <button onClick={toggleMobileMenu} className="outline-none">
          <img
            src={HumbergerIcon}
            alt=""
            width={40}
            className={`${isMobileMenuOpen} `}
            style={{ ...cartIconStyle, fill: darkMode ? "white" : "white" }}
          />
        </button>
      </div>

      {isMobileMenuOpen && (
        <div
          style={navbarStyle}
          className="sm:hidden absolute top-16 left-0 right-0 bg-white"
        >
          <div className="flex flex-col">
            <div className="flex justify-between pr-5">
              <div className="flex items-center p-4 space-x-2 text-white">
                <img src={LogoMarket} alt="Logo" className="w-8 h-8" />
                <p style={headerStyle} className="text-lg font-bold">
                  FreshMarket
                </p>
              </div>
              <div className="flex gap-x-4">
                {showNavbarOption && (
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
                      style={{
                        ...cartIconStyle,
                        fill: darkMode ? "white" : "black",
                      }}
                    />
                  </button>
                )}
                <ToggleButton />
              </div>
            </div>

            <div className="pl-4">
              <div className="pb-4">
                {showHomeButton && (
                  <button
                    onClick={() => {
                      navigate("/");
                    }}
                    className="hover:text-[#347C00]"
                  >
                    Home
                  </button>
                )}
              </div>
              {showHomeButton && (
                <button
                  onClick={() => {
                    navigate("/cart");
                    clearActiveSection();
                  }}
                  className="hover:text-[#347C00] pb-4"
                >
                  Cart
                </button>
              )}
            </div>
          </div>

          {showNavbarOption && (
            <div className="flex flex-col cursor-pointer pl-5 gap-y-4 pb-5">
              <p
                onClick={() => {
                  navigate("/");
                }}
                id="beranda"
                className="hover:text-[#62CD14]"
              >
                Home
              </p>

              <p
                onClick={() => {
                  navigate("/products");
                }}
                className=" hover:text-[#62CD14]"
              >
                Products
              </p>
              <p
                onClick={() => {
                  handleScrollToSection("aboutUs");
                  clearActiveSection();
                  toggleMobileMenu();
                }}
                className={
                  activeSection === "aboutUs"
                    ? "text-[#62CD14]"
                    : "hover:text-[#62CD14]"
                }
              >
                About Us
              </p>

              <p
                onClick={() => {
                  handleScrollToSection("chatbox");
                  clearActiveSection();
                  toggleMobileMenu();
                }}
                className={
                  activeSection === "aboutUs"
                    ? "text-[#62CD14]"
                    : "hover:text-[#62CD14]"
                }
              >
                Chat Box
              </p>

              <p
                onClick={() => {
                  handleScrollToSection("contact-us");
                  clearActiveSection();
                  toggleMobileMenu();
                }}
                className={
                  activeSection === "aboutUs"
                    ? "text-[#62CD14]"
                    : "hover:text-[#62CD14]"
                }
              >
                Contact
              </p>
            </div>
          )}

          {localStorage.getItem("isLoggedIn") ? (
            <div>
              <button
                onClick={() => {
                  handleLogout();
                  clearActiveSection();
                }}
                className="bg-[#347C00] w-full text-white h-10 rounded hover:bg-[#2B6700]"
              >
                Log out
              </button>
            </div>
          ) : (
            <div className="flex gap-x-1">
              <button
                onClick={() => {
                  navigate("/sign-in");
                }}
                className={
                  activeSection === "signIn"
                    ? "text-[#62CD14] w-full bg-[#62CD14]"
                    : "w-full h-10 rounded bg-[#62CD14] text-black hover:bg-[#2B6700] hover:text-white "
                }
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  navigate("/sign-up");
                }}
                className={
                  activeSection === "signIn"
                    ? "text-[#62CD14] w-full bg-[#62CD14]"
                    : "w-full h-10 rounded bg-[#62CD14] text-black hover:bg-[#2B6700] hover:text-white "
                }
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
