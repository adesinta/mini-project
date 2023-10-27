import React, {useEffect} from "react";
import { useDarkMode } from "../../components/Darkmode";

import welcomeImage from "../../assets/welcome-image.svg";
import AboutImage from "../../assets/about-image.svg";

import Navbar from "../../components/Navbar";
import ChatBox from "./ChatBox";
import ContactUs from "./ContactUs";

const LandingPage = () => {
  const { darkMode } = useDarkMode();

  const pageStyle = {
    backgroundColor: darkMode ? "#000000" : "#ffffff",
    color: darkMode ? "#ffffff" : "#000000",
    minHeight: "100vh",
  };

  const buttonStyle = {
    color: darkMode ? "#ffffff" : "#ffffff",
  }

  const footerStyle = {
    color: darkMode ? "#ffffff" : "#ffffff",
  }

  useEffect(() => {
    document.title = "Landing Page";
  }, []);

  return (
    <div style={pageStyle}>
      <div className="">
        <Navbar showNavbarOption={true} />
        <div
          id="home"
          className="p-10 flex flex-col text-center gap-y-2 items-center"
        >
          <h1 className="font-bold text-4xl pt-20">
            Welcome to <span className="text-[#62CD14]">Fresh Market</span>
          </h1>
          <p>
          Find Health in Every Bite! Choose High Quality Vegetables and Fruits Only Here.
          </p>
          <img src={welcomeImage} alt="" className="mt-8 rounded-lg" />
        </div>
        <div
          id="about-us"
          className="p-10 flex flex-col justify-center items-center text-justify gap-y-4"
        >
          <h1 className="font-bold text-4xl pt-14">About Us</h1>
          <p className="px-36 leading-loose">
            Welcome to Fresh Market, your ultimate destination for a
            high-quality shopping experience with fresh vegetables and fruits.
            We collaborate with trusted local farmers to bring you fresh
            products directly from the fields to your table. With a focus on
            diversity and deliciousness, we offer a complete range of organic
            vegetables, exotic fruits, and the finest selections of each season.
            At Fresh Market, we invite you to explore the world of natural
            flavors, promote a healthy lifestyle, and support sustainable
            farming. Thank you for choosing us as your loyal partner on the
            journey towards true health and delight.
          </p>
          <img src={AboutImage} alt="" className="rounded-lg" />
        </div>
        <ChatBox />
        <ContactUs />
        <div className="bg-[#2B6700] p-4" style={footerStyle}>
          <p className="text-center"> &copy; Copyright FreshMarket. All Right reserved. Develop by Ade Sinta.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
