import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../components/Darkmode";
import axios from "axios";

import Sidebar from "../../components/Sidebar";
import Search from "../../components/Search";
import Card from "../../components/Card";

const Dashboard = () => {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;

  const pageStyle = {
    backgroundColor: darkMode ? "#000000" : "#ffffff",
    color: darkMode ? "#ffffff" : "black",
    minHeight: "100vh",
  };

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

  const totalCards = products.length;
  const lastCardIndex = currentPage * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;
  const currentCards = products.slice(firstCardIndex, lastCardIndex);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= Math.ceil(totalCards / cardsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  const checkLoginStatus = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/sign-in");
    }
  }

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className=" text-white w-full p-4" style={pageStyle}>
        <h1 className="font-bold pt-8 text-2xl">Dashboard</h1>
        <div className="flex justify-between">
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
                  description={product?.description}
                  image={product?.image}
                  price={product?.price}
                  showCartButton={false}
                />
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`bg-[#347C00] hover:bg-[#2B6700] rounded-md px-4 py-2 text-white ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#2B6700] hover:text-white"
            }`}
          >
            Previous Page
          </button>
          <div className="text-white">
            Page {currentPage} of {Math.ceil(totalCards / cardsPerPage)}
          </div>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={lastCardIndex >= totalCards}
            className={`bg-[#347C00] hover:bg-[#2B6700] rounded-md px-4 py-2 text-white ${
              lastCardIndex >= totalCards
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#2B6700] hover:text-white"
            }`}
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
