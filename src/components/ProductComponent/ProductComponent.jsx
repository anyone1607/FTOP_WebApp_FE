import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaEye, FaPlus } from "react-icons/fa";

const ProductComponent = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    categoryId: "",
    status: true,
    productImage: "",
    storeId: "",
  });
  const itemsPerPage = 10;  

  useEffect(() => {
    const fetchDataProducts = async () => {
      try {
        const productResponse = await axios.get(
          "http://localhost:8000/api/product"
        );
        const fetchedProducts =
          productResponse.data.data?.products ||
          productResponse.data.data ||
          [];
        if (Array.isArray(fetchedProducts)) {
          setProducts(fetchedProducts);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/category"); // URL API của danh mục
        setCategories(response.data.data || []); // Đặt danh sách danh mục
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle form input changes for add/update
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "productPrice" && !isNaN(value) ? parseFloat(value) : value,
    }));
  };

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  const handleAddSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra tất cả các trường dữ liệu có đầy đủ không
    if (!formData.productName || !formData.productPrice || !formData.categoryId || !file || !formData.storeId) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const formDataObj = new FormData();
      formDataObj.append("productName", formData.productName);
      formDataObj.append("productPrice", formData.productPrice);
      formDataObj.append("categoryId", formData.categoryId);
      formDataObj.append("storeId", formData.storeId);
      formDataObj.append("productImage", file);

      // Log lại formData để dễ dàng debug
      console.log("Form Data to be sent:", Object.fromEntries(formDataObj.entries()));

      // Gửi request đến backend
      const response = await axios.post("http://localhost:8000/api/product", formDataObj, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200 || response.status === 201) {
        alert("Product added successfully!");
        setShowAddModal(false);
        // Cập nhật lại danh sách sản phẩm
        setProducts((prev) => [...prev, response.data.data]);
        console.log("Product added response:", response.data);
      } else {
        alert("Failed to add product. Please try again.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("An error occurred while adding the product. Please try again.");
    }
  };



  // Handle updating product
  // const handleUpdateSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     // Gửi yêu cầu PUT để cập nhật sản phẩm
  //     await axios.put(
  //       `http://localhost:8000/api/product/${currentProduct.productId}`,
  //       formData
  //     );

  //     // Cập nhật lại danh sách sản phẩm trong state
  //     setProducts(products.map(product =>
  //       product.productId === currentProduct.productId
  //         ? { ...product, ...formData } // Cập nhật sản phẩm đã chọn
  //         : product // Các sản phẩm khác không thay đổi
  //     ));

  //     alert("Product updated successfully!");
  //     setShowUpdateModal(false);
  //   } catch (error) {
  //     console.error("Error updating product:", error);
  //     alert("Error occurred while updating the product. Please try again.");
  //   }
  // };
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra trường dữ liệu bắt buộc
    if (
      !formData.productName ||
      !formData.productPrice ||
      !formData.categoryId ||
      !file ||
      !formData.storeId
    ) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const formDataObj = new FormData();
      formDataObj.append("productName", formData.productName);
      formDataObj.append("productPrice", formData.productPrice);
      formDataObj.append("categoryId", formData.categoryId);
      formDataObj.append("storeId", formData.storeId);
      formDataObj.append("productImage", file);

      // Log dữ liệu để kiểm tra trước khi gửi
      console.log("Form Data to be sent for update:", Object.fromEntries(formDataObj.entries()));
      console.log("Updating Product:", currentProduct);

      const response = await axios.put(
        `http://localhost:8000/api/product/${currentProduct.productId}`,
        formDataObj,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // Log phản hồi từ server
      console.log("Update response:", response.data);

      if (response.status === 200 || response.status === 201) {
        alert("Product updated successfully!");
        setShowUpdateModal(false);

        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.productId === currentProduct.productId
              ? { ...product, ...response.data.data }
              : product
          )
        );
      } else {
        alert("Failed to update product. Please try again.");
      }
    } catch (error) {
      console.error("Error updating product:", error);

      // Log chi tiết lỗi từ server (nếu có)
      if (error.response) {
        console.error("Server response error:", error.response.data);
      }

      alert("An error occurred while updating the product. Please try again.");
    }
  };

  // Handle deleting product
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/product/${currentProduct.productId}`
      );
      alert("Product deleted successfully!");
      // Cập nhật lại state products sau khi xóa thành công
      setProducts(products.filter(product => product.productId !== currentProduct.productId));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };


  const refreshProducts = async () => {
    const updatedProducts = await axios.get(
      "http://localhost:8000/api/product"
    );
    setProducts(updatedProducts.data.data.products);
  };

  // Open modals with selected product
  const handleView = (product) => {
    setCurrentProduct(product);
    setShowViewModal(true);
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setFormData({
      productName: product.productName,
      productPrice: product.productPrice,
      categoryId: product.categoryId,
      status: product.status, 
      productImage: product.productImage,
      storeId: product.storeId,
    });
    setShowUpdateModal(true);
  };

  const handleDeleteConfirmation = (product) => {
    setCurrentProduct(product);
    setShowDeleteModal(true);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.length > 0 ? products.slice(indexOfFirstItem, indexOfLastItem) : [];
  
  const totalPages = products.length > 0 ? Math.ceil(products.length / itemsPerPage) : 0;

  const getPaginationGroup = () => {
    let startPage = 1;
    let endPage = totalPages;
    const range = 2;
    if (totalPages > 5) {
      if (currentPage <= range) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + range >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - range;
        endPage = currentPage + range;
      }
    }
    let pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    if (startPage > 1) {
      pages.unshift(1, "...");
    }
    if (endPage < totalPages) {
      pages.push("...", totalPages);
    }
    return pages;
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-6">
      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center bg-green-500 text-white font-bold py-2 px-4 rounded"
        >
          <FaPlus className="mr-2" />
          Add Product
        </button>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto">
        {products.length === 0 ? (
          <p>Loading products...</p>
        ) : (
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                <th className="py-3 px-6 text-left">Product ID</th>
                <th className="py-3 px-6 text-left">Product Name</th>
                <th className="py-3 px-6 text-left">Product Price</th>
                <th className="py-3 px-6 text-left">Category Name</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Product Image</th>
                <th className="py-3 px-6 text-left">Store Name</th>
                <th className="py-3 px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {currentItems.map((product) => (
                <tr
                  key={product.productId}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">{product.productId}</td>
                  <td className="py-3 px-6 text-left">{product.productName}</td>
                  <td className="py-3 px-6 text-left">
                    {product.productPrice}
                  </td>
                  <td className="py-3 px-6 text-left">{product.categoryName }</td>
                  <td className="py-3 px-6 text-left">
                    {product.status ? (
                      <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
                        Active
                      </span>
                    ) : (
                      <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-6 text-left">
                    <img
                      src={`http://localhost:8000${product.productImage}`}
                      alt={product.productName}
                      className="w-12 h-12 object-cover"
                    />

                  </td>
                  <td className="py-3 px-6 text-left">{product.storeName}</td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleView(product)}
                        className="bg-blue-500 text-white px-2 py-1 rounded flex items-center hover:text-blue-700 transition duration-300"
                      >
                        <FaEye className="mr-1" /> View
                      </button>
                      <button
                        onClick={() => handleEdit(product)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded flex items-center hover:text-yellow-700 transition duration-300"
                      >
                        <FaEdit className="mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteConfirmation(product)}
                        className="bg-red-500 text-white px-2 py-1 rounded flex items-center hover:text-red-700 transition duration-300"
                      >
                        <FaTrash className="mr-1" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <ul className="inline-flex items-center">
          {getPaginationGroup().map((page, index) => (
            <li key={index}>
              {page === "..." ? (
                <span className="px-4 py-2 text-gray-500">...</span>
              ) : (
                <button
                  onClick={() => paginate(page)}
                  className={`px-4 py-2 border text-gray-600 ${currentPage === page ? "bg-blue-500 text-white" : "bg-white"
                    }`}
                >
                  {page}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <h2 className="text-2xl mb-4">Add Product</h2>
            <form onSubmit={handleAddSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Product Name</label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  className="border px-4 py-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Product Price</label>
                <input
                  type="number"
                  name="productPrice"
                  value={formData.productPrice}
                  onChange={handleInputChange}
                  className="border px-4 py-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Category</label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  className="border px-4 py-2 w-full"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => {
                    console.log("Rendering category:", category);
                    return (
                      <option key={category.categoryId} value={category.categoryId}>
                        {category.categoryName}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Product Image URL</label>
                <input
                  type="file"
                  name="productImage"
                  onChange={handleFileChange}
                  className="border px-4 py-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Store Name</label>
                <input
                  type="text"
                  name="storeId"
                  value={formData.storeId}
                  onChange={handleInputChange}
                  className="border px-4 py-2 w-full"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* View Product Modal */}
      {showViewModal && currentProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/2 max-w-lg space-y-6">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">View Product</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <label className="text-gray-700 font-medium">Product Name</label>
                <p className="text-gray-900">{currentProduct.productName}</p>
              </div>

              <div className="flex justify-between">
                <label className="text-gray-700 font-medium">Product Price</label>
                <p className="text-gray-900">
                  {currentProduct.productPrice}
                </p>
              </div>

              <div className="flex justify-between">
                <label className="text-gray-700 font-medium">Category Name</label>
                <p className="text-gray-900">{currentProduct.categoryName}</p>
              </div>

              <div className="flex justify-between">
                <label className="text-gray-700 font-medium">Status</label>
                <p className="text-gray-900">{currentProduct.status ? "Active" : "Inactive"}</p>
              </div>

              <div className="flex justify-between items-center">
                <label className="text-gray-700 font-medium">Product Image</label>
                <img
                  src={`http://localhost:8000${currentProduct.productImage}`}
                  alt={currentProduct.productName}
                  className="w-24 h-24 object-cover rounded-lg shadow-md border-2 border-gray-300 hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowViewModal(false)}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Update Product Modal */}
      {showUpdateModal && currentProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <h2 className="text-2xl mb-4">Update Product</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Product Name</label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  className="border px-4 py-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Product Price</label>
                <input
                  type="number"
                  name="productPrice"
                  value={formData.productPrice}
                  onChange={handleInputChange}
                  className="border px-4 py-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Category ID</label>
                <input
                  type="text"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  className="border px-4 py-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Product Image </label>
                <input
                  type="file"
                  name="productImage"
                  onChange={handleFileChange}
                  className="border px-4 py-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Store ID</label>
                <input
                  type="text"
                  name="storeId"
                  value={formData.storeId}
                  onChange={handleInputChange}
                  className="border px-4 py-2 w-full"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowUpdateModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && currentProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <h2 className="text-2xl mb-4">Delete Product</h2>
            <p>Are you sure you want to delete this product?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductComponent;
