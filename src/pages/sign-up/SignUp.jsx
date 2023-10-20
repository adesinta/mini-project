import React from "react";
import { Link } from "react-router-dom";

import logoImg from "../../assets/logo.svg";
import marketImg from "../../assets/market-img.svg";

const SignUp = () => {
  return (
    <div className="bg-black text-white w-full h-screen overflow-hidden">
      <div className="flex justify-between">
        <div className="">
          <div className="w-[790px] flex justify-between p-4">
            <div>
              <Link to={"/"}>
                <div className="flex gap-x-2 cursor-default">
                  <img src={logoImg} alt="" />
                  <h1 className="text-white text-2xl font-bold flex items-center">
                    Fresh<span className="text-[#62CD14]">Market</span>
                  </h1>
                </div>
              </Link>
            </div>
            <div>
              <div className="flex pt-4 gap-x-2">
                <p>Already have an account?</p>
                <Link to={"/sign-in"}>
                  <p className="text-[#62CD14]">Sign In</p>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center h-[600px]">
            <div className="flex flex-col items-center gap-y-8">
              <p className="font-bold text-4xl text-[#62CD14]">
                Create an account
              </p>
              <div className="flex flex-col gap-y-4">
                <div className="flex flex-col">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    className="text-black rounded w-[400px]"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    placeholder="enter at least 8+ characters"
                    className="text-black rounded w-[400px]"
                  />
                </div>
                <button className="w-full bg-[#347C00] hover:bg-[#2B6700] h-10 rounded">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <p className="w-60 text-center font-extralight">
              By Signing up, you agree with the Terms of Use & Privacy Policy
            </p>
          </div>
        </div>
        <img src={marketImg} alt="" className="" />
      </div>
    </div>
  );
};

export default SignUp;
