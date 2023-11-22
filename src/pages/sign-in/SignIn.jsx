import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../features/Darkmode";
import Swal from "sweetalert2";

import ToggleButton from "../../components//global-components/ToggleDarkMode";
import logoImg from "../../assets/logo.svg";
import marketImg from "../../assets/market-img.svg";

const SignIn = () => {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email and password are required!",
      });
      return;
    }

    const adminCredentials = { email: "admin@gmail.com", password: "admin123" };
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      email === adminCredentials.email &&
      password === adminCredentials.password
    ) {
      localStorage.setItem("isLoggedIn", true);

      const user = {
        email,
      };
      localStorage.setItem("user", JSON.stringify(user));

      Swal.fire({
        icon: "success",
        title: "Admin Successfully Logged In!",
        confirmButtonText: "OK",
      }).then((res) => {
        if (res.isConfirmed) {
          navigate("/dashboard-admin");
        }
      });
    } else if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      localStorage.setItem("isLoggedIn", true);

      const user = {
        email,
      };
      localStorage.setItem("user", JSON.stringify(user));

      Swal.fire({
        icon: "success",
        title: "Successfully Logged In!",
        confirmButtonText: "OK",
      }).then((res) => {
        if (res.isConfirmed) {
          navigate("/");
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email and password are not available. Please, sign-up first.",
      });
    }
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
                  <p className="text-sm">Don't have an account?</p>
                </div>
                <div>
                  <button
                    onClick={() => {
                      navigate("/sign-up");
                    }}
                    className="text-[#62CD14] text-sm"
                  >
                    Sign Up
                  </button>
                </div>
                <ToggleButton />
              </div>
            </div>
          </div>

          <div className="flex items-center h-[400px] md:h-[800px] justify-center px-8 w-full ">
            <div className="flex flex-col items-center gap-y-8" >
              <p className="font-bold text-4xl text-[#62CD14]">Sign In</p>
              <form onSubmit={handleLogin}>
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
                      className="text-black rounded w-80 md:w-[400px]"
                    />
                  </div>
                  <button
                    type="submit"
                    className={`text-${
                      darkMode ? "white" : "white"
                    } w-full bg-[#347C00] hover:bg-[#2B6700] h-10 rounded`}
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="hidden lg:block w-[80rem] h-screen">
          <img src={marketImg} alt="" className="bg-cover w-full" />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
