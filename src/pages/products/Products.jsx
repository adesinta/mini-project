import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import productsHeader from "../../assets/products-header.svg";

import Navbar from "../../components/Navbar";
import Card from "../../components/Card";
import Search from "../../components/Search";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      let apiUrl = "https://652fc8d06c756603295da8c8.mockapi.io/products";

      if (categoryFilter !== "all") {
        apiUrl += `?category=${categoryFilter}`;
      }

      const response = await axios.get(apiUrl);

      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryFilter]);

  const handleSearch = () => {
    const productsCopy = [...products];

    const filteredProducts = productsCopy
      .filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((product) =>
        categoryFilter === "all" ? true : product.category === categoryFilter
      );

    setProducts(filteredProducts);
  };

  useEffect(() => {
    if (searchQuery === "") {
      fetchData();
    }
  }, [searchQuery]);

  return (
    <div className="w-full h-screen bg-black">
      <Navbar />
      <div className="bg-black ">
        <img src={productsHeader} alt="" className="w-full" />
        <div className="flex justify-between px-8">
          <div className="inline-flex rounded-md shadow-sm mt-10" role="group">
            <button
              onClick={() => {
                setCategoryFilter("all");
              }}
              className={`w-36 px-4 py-2 text-sm font-medium text-gray-900 bg-white border rounded-l-lg hover:bg-[#347C00] hover:text-white`}
            >
              All Products
            </button>
            <button
              onClick={() => {
                setCategoryFilter("vegetables");
              }}
              className={`w-36 px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-[#347C00] hover:text-white `}
            >
              Vegetables
            </button>
            <button
              onClick={() => {
                setCategoryFilter("fruits");
              }}
              className={`w-36 px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-[#347C00] hover:text-white `}
            >
              Fruits
            </button>
          </div>
          <div className="flex gap-x-2">
            <Search
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="bg-[#347C00] hover:bg-[#2B6700] rounded-md w-28 h-13 mt-10"
            >
              Search
            </button>
          </div>
        </div>
        {loading ? (
          <div className="w-full h-screen">
            <p className="text-center pt-10 text-2xl text-red-500">
              Loading...
            </p>
          </div>
        ) : (
          <div className="w-xl p-8 grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {products.map((product, index) => (
                <Card
                  key={index}
                  id={product?.id}
                  title={product?.title}
                  category={product?.category}
                  image={product?.image}
                  price={product?.price}
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
