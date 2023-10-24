import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import logoImg from "../../assets/logo.svg";
import marketImg from "../../assets/market-img.svg";

const SignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email and password are required!",
      });
      return;
    }

    const dummyUser = { username: "admin@gmail.com", password: "admin123" };
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      (storedUser &&
        storedUser.username === username &&
        storedUser.password === password) ||
      (dummyUser.username === username && dummyUser.password === password)
    ) {
      localStorage.setItem("isLoggedIn", true);

      const user = {
        username: username,
      };
      localStorage.setItem("user", JSON.stringify(user));

      Swal.fire({
        icon: "success",
        title: "Successfully Login!",
        confirmButtonText: "OK",
      }).then((res) => {
        if (res.isConfirmed) {
          navigate("/dashboard-admin");
        }
      });
    } else {
      localStorage.setItem("isLoggedIn", true);

      const user = {
        username: username,
      };
      localStorage.setItem("user", JSON.stringify(user));

      Swal.fire({
        icon: "success",
        title: "Successfully Login!",
        confirmButtonText: "OK",
      }).then((res) => {
        if (res.isConfirmed) {
          navigate("/");
        }
      });
    }
  };

  return (
    <div className="bg-black text-white w-full h-screen overflow-hidden">
      <div className="flex justify-between">
        <div className="">
          <div className="w-[790px] flex justify-between p-4">
            <div>
              <div
                onClick={() => {
                  navigate("/");
                }}
                className="flex gap-x-2 cursor-default"
              >
                <img src={logoImg} alt="" />
                <h1 className="text-white text-2xl font-bold flex items-center">
                  Fresh<span className="text-[#62CD14]">Market</span>
                </h1>
              </div>
            </div>
            <div>
              <div className="flex pt-4 gap-x-2">
                <p>Don't have an account?</p>
                <button
                  onClick={() => {
                    navigate("/sign-up");
                  }}
                  className="text-[#62CD14]"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center h-[600px]">
            <div className="flex flex-col items-center gap-y-8">
              <p className="font-bold text-4xl text-[#62CD14]">Sign In</p>
              <form onSubmit={handleLogin}>
                <div className="flex flex-col gap-y-4">
                  <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="example@gmail.com"
                      className="text-black rounded w-[400px]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="enter at least 8+ characters"
                      className="text-black rounded w-[400px]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#347C00] hover:bg-[#2B6700] h-10 rounded"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <img src={marketImg} alt="" className="" />
      </div>
    </div>
  );
};

export default SignIn;
