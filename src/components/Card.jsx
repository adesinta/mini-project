import React from "react";

const Card = ({ id, title, category, price, description, image, showCartButton }) => {
  return (
    <div
      id={id}
      className="bg-[#171A1F] text-white max-w-sm rounded overflow-hidden shadow-lg"
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
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
      <div className="flex flex-col justify-between h-full p-4">
        <div>
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-sm text-gray-400 mb-2">{category}</p>
          <p className="text-base text-gray-300 mb-4">{description}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-[#62CD14] font-bold text-xl">{price}</p>
          {showCartButton && <button className="px-4 py-2 bg-[#62CD14] rounded text-black">Add to Cart</button>}
        </div>
      </div>
    </div>
  );
};

export default Card;
