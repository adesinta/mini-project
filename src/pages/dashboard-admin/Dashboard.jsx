import React, { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../../components/Sidebar";
import Search from "../../components/Search";
import Card from "../../components/Card";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://652fc8d06c756603295da8c8.mockapi.io/products"
      );

      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = () => {
    const productsCopy = [...products];

    const filteredProducts = productsCopy.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setProducts(filteredProducts);
  };

  useEffect(() => {
    if (searchQuery === "") {
      fetchData();
    }
  }, [searchQuery]);

  const totalCards = products.length;
  const lastCardIndex = currentPage * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;
  const currentCards = products.slice(firstCardIndex, lastCardIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex">
      <Sidebar />
      <div className="bg-black text-white w-full p-4">
        <h1 className="font-bold pt-8 text-2xl">Dashboard</h1>
        <div className="flex justify-between">
          <div className="inline-flex rounded-md shadow-sm mt-10" role="group">
            <button
              type="button"
              className="w-36 px-4 py-2 text-sm font-medium text-gray-900 bg-white border rounded-l-lg hover:bg-[#347C00] hover:text-white"
            >
              All Products
            </button>
            <button
              type="button"
              className="w-36 px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-[#347C00] hover:text-white "
            >
              Vegetables
            </button>
            <button
              type="button"
              className="w-36 px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-[#347C00] hover:text-white "
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
        <div className="mt-8">
          {loading ? (
            <div className="w-full h-screen">
              <p className="text-center pt-10 text-2xl text-red-500">
                Loading...
              </p>
            </div>
          ) : (
            <div className="w-2xl grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4">
              {currentCards.map((product, index) => (
                <Card
                  key={index}
                  id={product?.id}
                  title={product?.title}
                  category={product?.category}
                  image={product?.image}
                  price={product?.price}
                  description={product?.description}
                  showCartButton={false}
                />
              ))}
            </div>
          )}
        </div>
        <div className="mt-4 flex items-center justify-center">
          {Array.from({ length: Math.ceil(totalCards / cardsPerPage) }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`mr-2 px-4 py-2 text-sm font-medium text-gray-900 bg-white border ${
                  currentPage === index + 1
                    ? "bg-[#347C00] text-slate-400"
                    : "hover:bg-[#347C00] hover:text-white"
                }`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;  
