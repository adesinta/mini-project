import React from "react";

const Card = ({
  id,
  title,
  category,
  price,
  description,
  image,
  showCartButton,
}) => {

  return (
    <div
      id={id}
      className="bg-[#171A1F] text-white max-w-sm rounded overflow-hidden shadow-lg"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <img
        src={
          image !== null && !image.includes("webp")
            ? image
            : "https://placehold.co/600x500"
        }
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="text-white flex flex-col justify-between h-full p-4">
        <div>
          <div className="font-bold text-xl pb-2 flex justify-between">
            {title}
            <p className="text-sm text-black pb-2 bg-[#62CD14] rounded-full w-24 h-6 text-center">
              {category}
            </p>
          </div>
          <p className="text-base text-gray-300 pb-4">{description}</p>
          <p className="text-[#62CD14] font-bold text-xl">Rp. {price}</p>
        </div>
        <div className="flex justify-between items-center"></div>
        <button
          className="px-4 py-2 mt-4 rounded hover:text-[#62CD14] "
        >
          View Details
        </button>
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
