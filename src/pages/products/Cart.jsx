import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDarkMode } from "../../components/Darkmode";

import backIcon from "../../assets/back.svg";
import Navbar from "../../components/Navbar";

const Cart = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { items } = useSelector((state) => state.cart);
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/sign-in");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    document.title = "Cart Page";
  }, []);

  return (
    <div
      className={
        darkMode ? "bg-black text-white h-screen" : "bg-white text-black "
      }
    > 
      <Navbar />
      <div className="pt-28 pl-4">
      <button
          onClick={() => {
            navigate("/products");
          }}
          className={`bg-[#62CD14] hover:bg-[#469310] flex gap-2 justify-center items-center w-20 h-10 rounded`}
        >
          <img
            src={backIcon}
            alt=""
            width={10}
            style={{ fill: darkMode ? "#FFF" : "#000" }}
          />
          <p className={`text-${darkMode ? "black" : "black"} text-lg`}>Back</p>
        </button>
      </div>
      <section className="w-full pt- m-auto flex flex-wrap justify-center ">
        {items.length !== 0 ? (
          items.map((item, index) => (
            <div
              key={index}
              className={`max-w-[400px] w-full sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/5 overflow-hidden m-4 rounded-md shadow-md p-4 transition duration-300 ease-in-out transform hover:shadow-xl ${
                darkMode ? "bg-[#171A1F]" : ""
              }`}
            >
              <div>
                <img
                  src={item?.image ?? "https://placehold.co/600x500"}
                  alt={item?.title}
                  className="w-full h-60 object-cover"
                />
              </div>
              <div className="font-bold text-xl pb-2 flex justify-between items-center">
                {item?.title}
                <p
                  className={`text-sm pb-2 rounded-full w-24 h-6 text-center ${
                    darkMode ? "bg-white text-black" : "bg-[#62CD14] text-white"
                  }`}
                >
                  {item?.category}
                </p>
              </div>
              <p
                className={`text-yellow-300 font-bold text-xl ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                Rp. {item?.price}
              </p>
            </div>
          ))
        ) : (
          <div className="w-full h-screen flex items-center justify-center">
            <p
              className={`text-2xl ${
                darkMode ? "text-red-500" : "text-red-500"
              }`}
            >
              No data
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Cart;
