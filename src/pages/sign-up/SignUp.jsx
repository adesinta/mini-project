import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDarkMode } from "../../features/Darkmode";
import Swal from "sweetalert2";

import ToggleButton from "../../components/global-components/ToggleDarkMode";
import logoImg from "../../assets/logo.svg";
import marketImg from "../../assets/market-img.svg";
import HumbergerIcon from "../../assets/humberger-icon.svg";

const SignUp = () => {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email and password are required!");
      return;
    }

    const user = { email, password };
    localStorage.setItem("user", JSON.stringify(user));

    Swal.fire({
      icon: "success",
      title: "Registration Successful!",
      text: "Please sign in with your new account.",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/sign-in");
      }
    });
  };

  const cartIconStyle = {
    filter: darkMode ? "invert(1)" : "invert(0)",
  };

  return (
    <div
      className={`bg-${darkMode ? "black" : "white"} text-${
        darkMode ? "white" : "black"
      } w-full h-screen overflow-hidden`}
    >
      <div className="flex justify-between">
        <div className="">
        <div className="w-full md:w-[790px] flex flex-col justify-center items-center md:flex-row md:justify-between p-4">
            <div>
              <div
                onClick={() => {
                  navigate("/");
                }}
                className="flex gap-x-2 cursor-default"
              >
                <img src={logoImg} alt="" className="w-13 md:w-14" />
                <h1
                  className={`bg-${darkMode ? "black" : "white"} text-${
                    darkMode ? "white" : "black"
                  } text-2xl font-bold flex items-center`}
                >
                  Fresh<span className="text-[#62CD14]">Market</span>
                </h1>
              </div>
            </div>
            <div>
              <div className="flex p-4 gap-x-4 text-center items-center">
                <div>
                  <p className="text-sm">Already have an account?</p>
                </div>
                <div>
                  <button
                    onClick={() => {
                      navigate("/sign-in");
                    }}
                    className="text-[#62CD14] text-sm"
                  >
                    Sign In
                  </button>
                </div>
                <ToggleButton />
              </div>
            </div>
          </div>

          <div className="flex items-center h-[400px] md:h-[800px] justify-center px-8 w-full ">
            <div className="flex flex-col items-center gap-y-8">
              <p className="font-bold text-4xl text-[#62CD14]">
                Create an account
              </p>
              <form onSubmit={handleSignUp}>
                <div className="flex flex-col gap-y-4">
                  <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@gmail.com"
                      className="text-black rounded w-80 md:w-[400px]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="enter your password"
                      className="text-black rounded md:w-[400px]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#347C00] hover:bg-[#2B6700] h-10 rounded"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="flex justify-center">
            <p className="w-60 text-center font-extralight">
              By Signing up, you agree with the Terms of Use & Privacy Policy
            </p>
          </div>
        </div>
        <div className="hidden lg:block w-[80rem] h-screen">
          <img src={marketImg} alt="" className="bg-cover w-full" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
