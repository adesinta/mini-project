import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../../features/CartSlice";
import { useDarkMode } from "../../features/Darkmode";
import axios from "axios";
import Swal from "sweetalert2";

import productsHeader from "../../assets/products-header.svg";

import Navbar from "../../components/global-components/Navbar";
import Card from "../../components/global-components/Card";
import Search from "../../components/global-components/Search";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const cardsPerPage = 5;
  const totalCards = products.length;
  const lastCardIndex = currentPage * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;
  const currentCards = products.slice(firstCardIndex, lastCardIndex);

  const pageStyle = {
    backgroundColor: darkMode ? "#000000" : "#ffffff",
    color: darkMode ? "#ffffff" : "#000000",
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

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Sorry, you need to Sign-in to add items to the cart.",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#347C00",
        confirmButtonText: "Sign In",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/sign-in");
        }
      });
      return;
    }

    const newItem = {
      id: product?.id,
      title: product?.title,
      image: product?.image,
      category: product?.category,
      description: product?.description,
      price: product?.price,
    };

    dispatch(addItem(newItem));
    navigate("/cart");
  };

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= Math.ceil(totalCards / cardsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryFilter]);

  useEffect(() => {
    if (searchQuery === "") {
      fetchData();
    }
  }, [searchQuery]);

  useEffect(() => {
    document.title = "Products Page";
  }, []);

  return (
    <div className="w-full h-screen">
      <Navbar showNavbarOption={false} showHomeButton={true}/>
      <div style={pageStyle}>
        <img src={productsHeader} alt="" className="w-full h-60 md:h-auto" />
        <div className="flex flex-col md:flex-row justify-between px-8">
          <div className="inline-flex rounded-md shadow-sm md:mt-10" role="group">
            <button
              onClick={() => {
                setCategoryFilter("all");
              }}
              className={`w-36 px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-500 rounded-l-lg hover:bg-[#347C00] hover:text-white`}
            >
              All Products
            </button>
            <button
              onClick={() => {
                setCategoryFilter("vegetables");
              }}
              className={`w-36 px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-500 hover:bg-[#347C00] hover:text-white `}
            >
              Vegetables
            </button>
            <button
              onClick={() => {
                setCategoryFilter("fruits");
              }}
              className={`w-36 px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-500 rounded-r-md hover:bg-[#347C00] hover:text-white `}
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
          <div className="w-2xl p-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {currentCards.map((product, index) => (
              <Card
                key={index}
                id={product?.id}
                title={product?.title}
                category={product?.category}
                image={product?.image}
                price={product?.price}
                showCartButton={true}
                handleNavigateDetails={() => {
                  navigate(`/details/${product?.id}`, {
                    state: { product },
                  });
                }}
                handleAddtoCart={() => handleAddToCart(product)}
              />
            ))}
          </div>
        )}
        <div className="flex justify-between items-center px-8 pb-8">
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

export default Products;
