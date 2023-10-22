import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import imageCompression from "browser-image-compression";

const EditProductModal = ({ showEditModal, closeEditModal, fetchData, selectedProduct }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState("");
  const [editedProduct, setEditedProduct] = useState({
    title: "",
    category: "",
    image: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    if (selectedProduct) {
      setEditedProduct({
        title: selectedProduct.title,
        category: selectedProduct.category,
        image: selectedProduct.image,
        description: selectedProduct.description,
        price: selectedProduct.price,
      });
    }
  }, [selectedProduct]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (file && !file.type.startsWith("image/")) {
      setImageError("The selected file is not an image.");
    } else {
      setImageError("");

      const options = {
        maxSizeMB: 0.05,
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onloadend = () => {
          setEditedProduct((prevProduct) => ({
            ...prevProduct,
            image: reader.result,
          }));
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const response = await axios.put(
        `https://652fc8d06c756603295da8c8.mockapi.io/products/${selectedProduct.id}`,
        editedProduct
      );

      if (response.status === 200) {
        fetchData();
        closeEditModal();

        await Swal.fire({
          icon: "success",
          title: "Product updated successfully!",
          showConfirmButton: "Ok",
        }).then((res) => {
          if (res.isConfirmed) {
            navigate("/products-table");
          }
        });
      } 
    } catch (error) {
        console.error("Error updating product:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Error updating product. Please try again. ${error.message || error}`,
        });
    }
  };

  return (
    showEditModal && (
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-10"></div>
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
          &#8203;
          <div
            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
              <form className="text-black">
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={editedProduct.title}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={editedProduct.category}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    <option value="vegetables">Vegetables</option>
                    <option value="fruits">Fruits</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleImageChange}
                    className="block w-full border rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={editedProduct.description}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Price
                  </label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={editedProduct.price}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
              </form>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={handleUpdateProduct}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#347C00] text-base font-medium text-white hover:bg-[#2B6700] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#347C00] sm:ml-3 sm:w-auto sm:text-sm"
              >
                Update
              </button>
              <button
                type="button"
                onClick={closeEditModal}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#347C00] sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default EditProductModal;
