import React, { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../../components/Navbar";
import Card from "../../components/Card";

const Products = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://652fc8d06c756603295da8c8.mockapi.io/products"
        );

        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-black ">
      <Navbar />
      <div>
        {loading ? (
          <div className="w-full h-screen">
            <p className="text-center pt-10 text-2xl text-red-500">
              Loading...
            </p>
          </div>
        ) : (
          <div className="w-2xl grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {product.map((product, index) => (
              <Card
                key={index}
                id={product?.id}
                title={product?.title}
                category={product?.category}
                image={product?.image}
                price={product?.price}
                description={product?.description}
                showCartButton={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
