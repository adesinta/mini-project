import React from "react";
import { useDarkMode } from "./Darkmode";

const Card = ({
  id,
  title,
  category,
  price,
  description,
  image,
  onClick,
  showCartButton,
}) => {
  const { darkMode } = useDarkMode();

  const cardStyle = {
    backgroundColor: darkMode ? "#171A1F" : "#F4F4F4",
    color: darkMode ? "white" : "black",
    maxWidth: "sm",
    borderRadius: "rounded",
    overflow: "hidden",
    boxShadow: darkMode ? "0 2px 4px rgba(255, 255, 255, 0.4)" : "0 4px 8px rgba(0, 0, 0, 0.5)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const priceStyle = {
    color: darkMode ? "" : "#E36E02"
  }

  return (
    <div id={id} className="max-w-sm rounded overflow-hidden shadow-lg" style={cardStyle}>
      <img
        src={
          image !== null && !image.includes("webp")
            ? image
            : "https://placehold.co/600x500"
        }
        alt={title}
        className="w-full h-60 object-cover"
      />
      <div className="flex flex-col justify-between h-full p-4">
        <div>
          <div className="font-bold text-xl pb-2 flex justify-between">
            {title}
            <p className="text-sm text-black pb-2 bg-[#62CD14] rounded-full w-24 h-6 text-center">
              {category}
            </p>
          </div>
          <div>
            <p className="text-base text-gray-300 pb-4 text-justify">
              {description}
            </p>
          </div>
          <p className="text-yellow-300 font-bold text-xl" style={priceStyle}>Rp. {price}</p>
        </div>
        <div className="flex justify-between items-center"></div>
        {showCartButton && (
          <button onClick={onClick} className="px-4 py-2 mt-4 rounded hover:text-[#62CD14]">
            View Details
          </button>
        )}
        {showCartButton && (
          <button className="px-4 py-2 mt-4 bg-[#62CD14] rounded hover:bg-[#469310] text-black">
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
