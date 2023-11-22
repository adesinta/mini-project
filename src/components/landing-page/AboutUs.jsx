import React from "react";
import AboutImage from "../../assets/about-image.svg";

const AboutUs = () => {
  return (
      <div id="aboutUs" className="p-10 flex flex-col justify-center items-center text-justify gap-y-4">
        <h1 className="font-bold text-4xl pt-14">About Us</h1>
        <p className="lg:px-80 leading-loose">
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
  );
};

export default AboutUs;
