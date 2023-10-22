import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import cartIcon from "../../assets/cart.svg";
import Navbar from "../../components/Navbar";

const DetailProducts = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state.product;
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  if (!product) {
    return <div>Produk tidak ditemukan</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="bg-black h-screen w-full text-white">
        <div className="flex h-screen justify-evenly items-center ">
          <div className="flex items-center">
            {product?.image && (
              <img
                src={product?.image}
                alt={product?.title}
                className="w-[500px] rounded-3xl"
              />
            )}
          </div>
          <div className="flex flex-col gap-y-10">
            <div className="flex justify-between items-center w-[500px]">
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
              <p className="w-[500px] text-justify">{product?.description}</p>
            </div>
            <div className="flex flex-col gap-y-8">
              <div className="flex justify-between">
                <p className="text-2xl font-semibold text-yellow-300 pt-2">
                  Rp. {product?.price}
                </p>
                  <div className="flex">
                    <button
                      className="h-10 w-10 flex items-center justify-center text-3xl bg-[#469310] hover:bg-[#347C00]  rounded-l"
                      onClick={handleDecreaseQuantity}
                    >
                      -
                    </button>
                    <span className="h-10 w-10 font-semibold text-2xl flex items-center justify-center">
                      {quantity}
                    </span>
                    <button
                      className="h-10 w-10 flex items-center justify-center text-2xl bg-[#469310] hover:bg-[#347C00] rounded-r"
                      onClick={handleIncreaseQuantity}
                    >
                      +
                    </button>
                  </div>
              </div>
              <div className="flex justify-center bg-[#62CD14] rounded hover:bg-[#469310] text-black gap-x-2">
                <img src={cartIcon} alt="" />
                <button className="h-10">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProducts;
