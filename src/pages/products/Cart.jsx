import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useDarkMode } from "../../components/Darkmode";
import { removeItem } from "../../features/CartSlice";
import Swal from "sweetalert2";

import backIcon from "../../assets/back.svg";
import Navbar from "../../components/Navbar";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const { items } = useSelector((state) => state.cart);
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const [showCheckoutPopup, setShowCheckoutPopup] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/sign-in");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    document.title = "Cart Page";
  }, []);

  const handleCheckout = (index) => {
    setShowCheckoutPopup(true);
    setSelectedItemIndex(index);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const selectedProduct = items[selectedItemIndex];

    if (selectedProduct) {
      localStorage.setItem("checkoutData", JSON.stringify(formData));
      dispatch(removeItem(selectedProduct));
      setShowCheckoutPopup(false);
      setFormData({});
      setSelectedItemIndex(null);
    }

    Swal.fire({
      title: "Checkout was successful!",
      text: "Thank you for shopping!",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

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
              <div className="font-bold text-xl pb-2 mt-4 flex justify-between items-center">
                {item?.title}
                <p
                  className={`text-sm pb-2 rounded-full w-24 h-6 text-center ${
                    darkMode ? "bg-white text-black" : "bg-[#62CD14] text-white"
                  }`}
                >
                  {item?.category}
                </p>
              </div>
              <div>
                <p
                  className={`text-yellow-300 font-bold text-xl ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  Rp. {item?.price}
                </p>
                <button
                  onClick={() => handleCheckout(index)}
                  className={`bg-[#62CD14] hover:bg-[#469310] flex justify-center items-center w-full mt-10 h-10 rounded`}
                >
                  <p className={`text-${darkMode ? "black" : "black"} text-lg`}>
                    Checkout
                  </p>
                </button>
              </div>
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
      {showCheckoutPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-xl font-bold mb-4">Checkout Form</h2>
            <form onSubmit={handleFormSubmit}>
              <label htmlFor="name" className="block mb-2">
                Name:
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="border rounded w-full p-2"
                  required
                />
              </label>

              <label htmlFor="address" className="block mb-2">
                Address:
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="border rounded w-full p-2"
                  required
                />
              </label>

              <label htmlFor="phoneNumber" className="block mb-2">
                Phone Number:
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="border rounded w-full p-2"
                  required
                />
              </label>
              <div className="flex justify-between">
                <button
                  onClick={() => setShowCheckoutPopup(false)}
                  className="text-white bg-red-700 hover:bg-red-800 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#62CD14] hover:bg-[#46940f] text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
