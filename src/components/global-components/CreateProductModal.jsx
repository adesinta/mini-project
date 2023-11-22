import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import imageCompression from "browser-image-compression";

const CreateProductModal = ({
  showModal,
  closeModal,
  fetchData,
  afterCreate,
}) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState("");
  const [errors, setErrors] = useState({});

  const [newProduct, setNewProduct] = useState({
    title: "",
    category: "",
    image: "",
    description: "",
    price: "",
  });

  const validateForm = (formData) => {
    const errors = {};

    if (!formData.title) {
      errors.title = "Product Name is required";
    }

    if (!formData.category) {
      errors.category = "Category is required";
    }

    if (!formData.image) {
      errors.image = "Image is required";
    }

    if (!formData.description) {
      errors.description = "Description is required";
    }

    if (!formData.price) {
      errors.price = "Price is required";
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      errors.price = "Price must be a valid positive number";
    }

    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "price" && !/^\d+$/.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Price must be a valid positive number",
      }));
      return;
    }

    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
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
          setNewProduct((prevProduct) => ({
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

  const handleCreateProduct = async () => {
    const validationErrors = validateForm(newProduct);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(
        "https://652fc8d06c756603295da8c8.mockapi.io/products",
        newProduct
      );

      if (response.status === 201) {
        fetchData();
        closeModal();

        await Swal.fire({
          icon: "success",
          title: "Product added successfully!",
          showConfirmButton: "Ok",
        }).then((res) => {
          if (res.isConfirmed) {
            navigate("/products-table");
          }
        });
        
        setNewProduct({
          title: "",
          category: "",
          image: "",
          description: "",
          price: "",
        });

        afterCreate();
      } else {
        console.error(
          "Error creating product. Unexpected status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    showModal && (
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
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
              <h2 className="text-2xl font-bold mb-4">Create Product</h2>
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
                    value={newProduct.title}
                    onChange={handleInputChange}
                    className={`mt-1 p-2 border border-gray-300 rounded-md w-full ${
                      errors.title ? "border-red-500" : ""
                    }`}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                  )}
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
                    value={newProduct.category}
                    onChange={handleInputChange}
                    className={`mt-1 p-2 border border-gray-300 rounded-md w-full ${
                      errors.category ? "border-red-500" : ""
                    }`}
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    <option value="vegetables">Vegetables</option>
                    <option value="fruits">Fruits</option>
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.category}
                    </p>
                  )}
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
                    className={`block w-full border rounded-lg ${
                      errors.image ? "border-red-500" : ""
                    }`}
                  />
                  {errors.image && (
                    <p className="text-red-500 text-xs mt-1">{errors.image}</p>
                  )}
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
                    value={newProduct.description}
                    onChange={handleInputChange}
                    className={`mt-1 p-2 border border-gray-300 rounded-md w-full ${
                      errors.description ? "border-red-500" : ""
                    }`}
                  ></textarea>
                  {errors.description && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.description}
                    </p>
                  )}
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
                    value={newProduct.price}
                    onChange={handleInputChange}
                    className={`mt-1 p-2 border border-gray-300 rounded-md w-full ${
                      errors.price ? "border-red-500" : ""
                    }`}
                  />
                  {errors.price && (
                    <p className="text-red-500 text-xs mt-1">{errors.price}</p>
                  )}
                </div>
              </form>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={handleCreateProduct}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#347C00] text-base font-medium text-white hover:bg-[#2B6700] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#347C00] sm:ml-3 sm:w-auto sm:text-sm"
              >
                Create
              </button>
              <button
                type="button"
                onClick={closeModal}
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

export default CreateProductModal;
