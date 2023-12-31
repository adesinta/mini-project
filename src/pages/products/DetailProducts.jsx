import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDarkMode } from "../../features/Darkmode";

import backIcon from "../../assets/back.svg";
import Navbar from "../../components/global-components/Navbar";

const DetailProducts = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  const product = location.state.product;

  if (!product) {
    return <div>Produk tidak ditemukan</div>;
  }

  useEffect(() => {
    document.title = "Detail Page";
  }, []);

  return (
    <div>
      <Navbar />
      <div
        className={`bg-${darkMode ? "black" : "white"} h-screen w-full overflow-auto text-${
          darkMode ? "white" : "black"
        }`}
      >
        <div className="flex flex-col lg:flex-row md:h-screen md:justify-evenly md:items-center">
          <div className="flex items-center">
            {product?.image && (
              <img
                src={product?.image}
                alt={product?.title}
                className="w-[500px] md:rounded-3xl"
              />
            )}
          </div>
          <div>
            <button
              onClick={() => {
                navigate("/products");
              }}
              className={`bg-[#62CD14] hover:bg-[#469310] md:flex gap-2 justify-center items-center w-20 h-10 rounded hidden`}
            >
              <img
                src={backIcon}
                alt=""
                width={10}
                style={{ fill: darkMode ? "#FFF" : "#000" }}
              />
              <p className={`text-${darkMode ? "black" : "black"} text-lg`}>
                Back
              </p>
            </button>
            <div className="flex flex-col gap-y-10 pt-10">
              <div className="flex justify-between items-center w-full px-2 md:w-[500px]">
                <p className="font-bold text-4xl text-[#62CD14]">
                  {product?.title}
                </p>
                <div className="pt-2">
                  <p className="text-sm text-black pb-2 bg-[#62CD14] rounded-full w-24 h-6 text-center">
                    {product?.category}
                  </p>
                </div>
              </div>
              <div>
                <p className="w-full md:w-[500px]  text-justify px-2">
                  {product?.description}
                </p>
              </div>
              <p
                className={`text-${
                  darkMode ? "yellow-300" : "orange-600"
                } text-2xl font-semibold pt-2 px-2`}
              >
                Rp. {product?.price}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProducts;
