import React, { useEffect } from "react";
import { useDarkMode } from "../../features/Darkmode";

import welcomeImage from "../../assets/welcome-image.svg";

import Navbar from "../../components/global-components/Navbar";
import AboutUs from "../../components/landing-page/AboutUs";
import ChatBox from "../../components/landing-page/ChatBox";
import ContactUs from "../../components/landing-page/ContactUs";

const LandingPage = () => {
  const { darkMode } = useDarkMode();

  const pageStyle = {
    backgroundColor: darkMode ? "#000000" : "#ffffff",
    color: darkMode ? "#ffffff" : "#000000",
    minHeight: "100vh",
  };

  const buttonStyle = {
    color: darkMode ? "#ffffff" : "#ffffff",
  };

  const footerStyle = {
    color: darkMode ? "#ffffff" : "#ffffff",
  };

  useEffect(() => {
    document.title = "Landing Page";
  }, []);

  return (
    <div style={pageStyle} className="overflow-hidden">
      <div className="">
        <Navbar showNavbarOption={true} showHomeButton={false} />
        <div id="Home">
          <div className="p-10 flex flex-col text-center gap-y-2 items-center">
            <h1 className="font-bold text-4xl pt-20">
              Welcome to <span className="text-[#62CD14]">Fresh Market</span>
            </h1>
            <p>
              Find Health in Every Bite! Choose High Quality Vegetables and
              Fruits Only Here.
            </p>
            <img src={welcomeImage} alt="" className="mt-8 rounded-lg" />
          </div>
        </div>
        <AboutUs />
        <ChatBox />
        <ContactUs />
        <div className="bg-[#2B6700] p-4" style={footerStyle}>
          <p className="text-center">
            {" "}
            &copy; Copyright FreshMarket. All Right reserved. Develop by Ade
            Sinta.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
