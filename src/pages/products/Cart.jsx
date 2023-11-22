import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useDarkMode } from "../../features/Darkmode";
import { removeItem } from "../../features/CartSlice";
import backIcon from "../../assets/back.svg";
import Navbar from "../../components/Navbar";
import Swal from "sweetalert2";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const { items } = useSelector((state) => state.cart);
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const [showCheckoutPopup, setShowCheckoutPopup] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [quantities, setQuantities] = useState({});

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

  const handleRemoveItem = (index) => {
    const selectedProduct = items[index];
    const quantity = quantities[index] || 1;

    dispatch(removeItem(selectedProduct));

    Swal.fire({
      icon: "success",
      title: "Order Successful!",
      text: `Your order for ${quantity} ${selectedProduct.title} has been confirmed successfully.`,
      confirmButtonText: "OK",
    }).then(() => {
      setShowCheckoutPopup(false);
      setSelectedItemIndex(null);
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [index]: undefined,
      }));
    });
  };

  const handleQuantityChange = (index, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [index]: newQuantity,
    }));
  };

  const incrementQuantity = (index) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [index]: (prevQuantities[index] || 1) + 1,
    }));
  };

  const decrementQuantity = (index) => {
    if (quantities[index] && quantities[index] > 1) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [index]: prevQuantities[index] - 1,
      }));
    }
  };

  const handleDelete = (index) => {
    Swal.fire({
      title: "Delete Product",
      text: "Are you sure you want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#62CD14",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeItem(items[index]));

        Swal.fire({
          icon: "success",
          title: "Product Deleted!",
          text: `${items[index]?.title} has been removed from your cart.`,
          confirmButtonText: "OK",
        });
      }
    });
  };

  return (
    <div className={`bg-${darkMode ? "black" : "white"} text-${darkMode ? "white" : "black"} h-screen overflow-auto`}>
      <Navbar />
      <div className="absolute pt-24 pl-5">
        <button
          onClick={() => {
            navigate("/products");
          }}
          className={`bg-[#62CD14] hover:bg-[#469310] flex gap-2 justify-center items-center w-20 h-10 rounded text-white`}
        >
          <img
            src={backIcon}
            alt=""
            width={10}
            style={{ fill: darkMode ? "#FFF" : "#000" }}
          />
          <p className={`text-lg`}>Back</p>
        </button>
      </div>
      <div className="w-full pt-24">
        <section className="w-full m-auto flex flex-wrap justify-center ">
          {items.length !== 0 ? (
            items.map((item, index) => (
              <div
                key={index}
                className={`w-full sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/5 overflow-hidden m-4 rounded-md shadow-md p-4 transition duration-300 ease-in-out transform hover:shadow-xl ${
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
                      darkMode
                        ? "bg-white text-black"
                        : "bg-[#62CD14] text-white"
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
                  <div className="flex justify-between gap-x-4">
                    <div className="flex items-center mt-4">
                      <button
                        onClick={() => decrementQuantity(index)}
                        className={`bg-[#62CD14] text-white px-3 py-1 rounded-l ${
                          darkMode ? "hover:bg-[#46940f]" : "hover:bg-[#469310]"
                        } transition-colors h-10`}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        min="1"
                        value={quantities[index] || 1}
                        onChange={(e) =>
                          handleQuantityChange(index, e.target.value)
                        }
                        className={` text-${darkMode ? "white" : "black"} bg-${
                          darkMode ? "transparent" : "transparent"
                        } w-10 text-center border-none 
                    }`}
                      />
                      <button
                        onClick={() => incrementQuantity(index)}
                        className={`bg-[#62CD14] text-white px-3 py-1 rounded-r ${
                          darkMode ? "hover:bg-[#46940f]" : "hover:bg-[#469310]"
                        } transition-colors h-10`}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => handleCheckout(index)}
                      className={`bg-[#62CD14] hover:bg-[#469310] flex justify-center items-center w-full mt-4 h-10 rounded text-white`}
                    >
                      <p
                        className={`text-${
                          darkMode ? "black" : "black"
                        } text-lg`}
                      >
                        Checkout
                      </p>
                    </button>

                    <button
                      onClick={() => handleDelete(index)}
                      className={`bg-red-500 hover:bg-red-600 text-white h-6 text-sm w-6 text-center rounded-full absolute top-0 right-0 mt-2`}
                      style={{ cursor: "pointer" }}
                    >
                      x
                    </button>
                  </div>
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
      </div>
      {showCheckoutPopup && selectedItemIndex !== null && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div
            className={`bg-white p-8 rounded-md shadow-lg ${
              darkMode ? "text-black" : "text-black"
            }`}
          >
            <h2
              className={`text-${
                darkMode ? "black" : "black"
              } text-2xl font-bold mb-4`}
            >
              Order Summary
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500">Product Name:</p>
                <p className="font-semibold">
                  {items[selectedItemIndex]?.title}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Category:</p>
                <p>{items[selectedItemIndex]?.category}</p>
              </div>
              <div>
                <p className="text-gray-500">Price:</p>
                <p>Rp. {items[selectedItemIndex]?.price}</p>
              </div>
            </div>
            <hr className="my-6 border-gray-300" />
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold">Total:</p>
              <p className="text-lg">
                Rp.{" "}
                {items[selectedItemIndex]?.price *
                  (quantities[selectedItemIndex] || 1)}
              </p>
            </div>
            <div className="flex justify-end mt-8">
              <button
                onClick={() => handleRemoveItem(selectedItemIndex)}
                className="bg-[#62CD14] hover:bg-[#46940f] text-white px-4 py-2 rounded mr-4"
              >
                Confirm Order
              </button>
              <button
                onClick={() => {
                  setShowCheckoutPopup(false);
                  setSelectedItemIndex(null);
                }}
                className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
