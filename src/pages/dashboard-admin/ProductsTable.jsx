import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../features/Darkmode";
import axios from "axios";
import Swal from "sweetalert2";

import deleteIcon from "../../assets/delete.svg";
import editIcon from "../../assets/edit.svg";
import plusIcon from "../../assets/plus-icon.svg";
import Sidebar from "../../components/global-components/Sidebar";
import Search from "../../components/global-components/Search";
import CreateProductModal from "../../components/global-components/CreateProductModal";
import EditProductModal from "../../components/global-components/EditProductModal";

const ProductsTable = () => {
  const navigate  = useNavigate()
  const { darkMode } = useDarkMode();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

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

  const paginate = (pageNumber) => {
    if (
      pageNumber > 0 &&
      pageNumber <= Math.ceil(products.length / itemsPerPage)
    ) {
      setCurrentPage(pageNumber);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const editModal = () => {
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    editModal();
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this product!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      });

      if (result.isConfirmed) {
        const response = await axios.delete(
          `https://652fc8d06c756603295da8c8.mockapi.io/products/${productId}`
        );

        console.log("Delete response:", response);

        if (response.status === 200) {
          fetchData();
          Swal.fire("Deleted!", "Your product has been deleted.", "success");
        } else {
          console.error(
            "Error deleting product. Unexpected status:",
            response.status
          );
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error deleting product. Please try again.",
          });
        }
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error deleting product. Please try again.",
      });
    }
  };

  const handleSearch = () => {
    const productsCopy = [...products];

    const filteredProducts = productsCopy.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setProducts(filteredProducts);
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      navigate("/sign-in"); 
    } else {
      fetchData(); 
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      fetchData();
    }
  }, [searchQuery]);

  return (
    <div className={`flex ${darkMode ? 'black' : ''}`}>
      <Sidebar />
      <div className={`bg-${darkMode ? 'black' : 'white'} text-${darkMode ? 'white' : 'black'} w-full p-4`}>
        <h1 className="font-bold text-2xl pt-8">Products</h1>
        <div className="flex justify-between">
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
          <div className="flex justify-center gap-x-2 bg-[#347C00] px-2 hover:bg-[#2B6700] rounded-md w-40 h-13 mt-10">
            <img src={plusIcon} alt="" width={18} className="pt-1" />
            <button onClick={openModal}>Create Product</button>
          </div>
        </div>
        <CreateProductModal
          showModal={showModal}
          closeModal={closeModal}
          fetchData={fetchData}
        />
        {loading ? (
          <div className="w-full h-screen">
            <p className="text-center pt-10 text-2xl text-red-500">
              Loading...
            </p>
          </div>
        ) : (
          <div>
            <table className="w-full mt-10 text-sm rounded border-black border-2 text-left text-[#251C1C] dark:text-gray-400">
              <thead className="text-base bg-[#171A1F] text-white dark:bg-gray-700 dark:text-gray-400">
                <tr className={`text-${darkMode ? "white" : "white"} bg-${darkMode ? "bg-[#171A1F]" : "gray-300"}`}>
                  <th className="px-5 py-3">No</th>
                  <th className="px-5 py-3">Product Name</th>
                  <th className="px-20 py-3">Category</th>
                  <th className="px-28 py-3">Image</th>
                  <th className="px-5 py-3">Description</th>
                  <th className="px-5 py-3">Price</th>
                  <th className="px-5 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="border-gray-950 border">
                {currentItems.map((product, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 1 ? "bg-[#171A1F]" : ""
                    } bg-${darkMode ? "" : "white"} text-${darkMode ? "white" : "black"} border border-slate-950`}
                  >
                    <td className="px-6 py-4">
                      {index + 1 + indexOfFirstItem}
                    </td>
                    <td className="px-6 py-4">{product?.title}</td>
                    <td className="px-20 py-4">{product?.category}</td>
                    <td className="px-2 py-4 flex justify-center items-center pt-14">
                      {product?.image && (
                        <img
                          src={product?.image}
                          alt={product?.title}
                          className="max-w-[200px] max-h-[200px]"
                        />
                      )}
                    </td>
                    <td className="px-6 py-4 w-[500px] text-justify">
                      {product?.description}
                    </td>
                    <td className="px-6 py-4 w-80">Rp. {product?.price}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-4">
                        <button onClick={() => handleEditProduct(product)}>
                          <img src={editIcon} alt="" />
                        </button>
                        <EditProductModal
                          showEditModal={showEditModal}
                          closeEditModal={closeEditModal}
                          fetchData={fetchData}
                          selectedProduct={selectedProduct}
                        />
                        <button
                          onClick={() => handleDeleteProduct(product?.id)}
                        >
                          <img src={deleteIcon} alt="" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-[#347C00] hover:bg-[#2B6700] rounded-md px-4 py-2 text-white"
              >
                Previous Page
              </button>
              <div className="text-white">
                Page {currentPage} of{" "}
                {Math.ceil(products.length / itemsPerPage)}
              </div>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastItem >= products.length}
                className="bg-[#347C00] hover:bg-[#2B6700] rounded-md px-4 py-2 text-white"
              >
                Next Page
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsTable;
