import React from "react";
import { Link } from "react-router-dom";

import welcomeImage from "../../assets/welcome-image.svg";
import AboutImage from "../../assets/about-image.svg";

import Navbar from "../../components/Navbar";
import ChatBox from "./ChatBox";
import ContactUs from "./ContactUs";

const LandingPage = () => {
  return (
    <div className="bg-black text-white">
      <Navbar />
      <div className="p-10 flex flex-col text-center gap-y-2  items-center">
        <h1 className="font-bold text-4xl">
          Welcome to <span className="text-[#62CD14]">Fresh Market</span>
        </h1>
        <p>
          Temukan Kesehatan dalam Setiap Gigitan! Pilih Sayuran dan Buah-buahan
          Berkualitas Tinggi Hanya di Sini.
        </p>
        <Link to={"/sign-up"}>
        <button className="bg-[#347C00] hover:bg-[#2B6700] w-40 h-10 rounded mt-6">
          Sign Up Now
        </button>
        </Link>
        <img src={welcomeImage} alt="" className="mt-8 rounded-lg" />
      </div>
      <div className="p-10 flex flex-col justify-center items-center text-justify gap-y-4">
        <h1 className="font-bold text-4xl pt-14">About Us</h1>
        <p className="px-36 leading-loose">
          Welcome to Fresh Market, your ultimate destination for a high-quality
          shopping experience with fresh vegetables and fruits. We collaborate
          with trusted local farmers to bring you fresh products directly from
          the fields to your table. With a focus on diversity and deliciousness,
          we offer a complete range of organic vegetables, exotic fruits, and
          the finest selections of each season. At Fresh Market, we invite you
          to explore the world of natural flavors, promote a healthy lifestyle,
          and support sustainable farming. Thank you for choosing us as your
          loyal partner on the journey towards true health and delight.
        </p>
        <img src={AboutImage} alt="" className="rounded-lg" />
      </div>
      <ChatBox/>
      <ContactUs/>
      <div className="bg-[#2B6700] p-4">
        <p> &copy; Copyright FreshMarket. All Right reserved.</p>
      </div>
    </div>
  );
};

export default LandingPage;
