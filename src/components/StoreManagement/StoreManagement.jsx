import React, { useEffect, useState } from "react";
import axios from "axios";
import { PencilSquareIcon, EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import { FaTag, FaEdit, FaTrash } from "react-icons/fa";
import './StoreManagement.css'
import { useLocation } from 'react-router-dom';
const StoreManagement = () => {
  const [stores, setStores] = useState([]);
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [newStore, setNewStore] = useState({
    storeName: "",
    storeAddress: "",
    storePhone: "",
    ownerId: "",
    status: false,
    storeImage: [],
  });
  const [editStore, setEditStore] = useState({
    storeId: "",
    storeName: "",
    storeAddress: "",
    storePhone: "",
    ownerId: "",
    status: "",
    storeImage: [],
  });
  const [isAdding, setIsAdding] = useState(false);
  const [owners, setOwners] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [fileName, setFileName] = useState("");
  const [selectedImageStoreId, setSelectedImageStoreId] = useState(null);
  const [selectedVoucherStoreId, setSelectedVoucherStoreId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [storeStats, setStoreStats] = useState({ totalOrders: 0, totalRevenue: 0 });
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [userRole, setUserRole] = useState(localStorage.getItem('role'));
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const email = params.get('email');
    const role = params.get('role');
    const name = params.get('name');

    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      localStorage.setItem('role', role);
      localStorage.setItem('name', name);
      setUserRole(role); // Set the user role state
    }
  }, [location]);



  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/user/owners-without-store");
        setOwners(response.data);
      } catch (error) {
        console.error("Error fetching owners:", error);
      }
    };

    fetchOwners();
  }, []);

  useEffect(() => {
    if (selectedStoreId) {
      fetchStoreStats(selectedStoreId, selectedMonth, selectedYear).then(stats => {
        setStoreStats(stats);
      });
    }
  }, [selectedMonth, selectedYear, selectedStoreId]);
  const toggleImageModal = (storeId) => {
    setSelectedImageStoreId(storeId);
    setIsImageModalOpen(true);
  };


  const setMainImage = async (storeId, imageIndex) => {
    const updatedStores = stores.map((store) => {
      if (store.storeId === storeId) {
        const updatedImage = [...store.storeImage];
        const [mainImage] = updatedImage.splice(imageIndex, 1);
        updatedImage.unshift(mainImage); // Đưa ảnh đã chọn lên đầu mảng
        return { ...store, storeImage: updatedImage };
      }
      return store;
    });
    setStores(updatedStores);
    setIsImageModalOpen(false);

    // Gửi yêu cầu cập nhật lên server
    const storeToUpdate = updatedStores.find(store => store.storeId === storeId);
    try {
      await axios.patch(`http://localhost:8000/api/store/${storeId}/main-image`, {
        storeImage: storeToUpdate.storeImage
      });
      console.log('Store image updated successfully');
    } catch (error) {
      console.error('Error updating store image:', error);
    }
  };
  // const handleEditRemoveImage = (index) => {
  //   setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  //   setEditStore((prevEditStore) => ({
  //     ...prevEditStore,
  //     storeImage: prevEditStore.storeImage.filter((_, i) => i !== index),
  //   }));
  // };
  const handleEditRemoveImage = (index, isNewImage) => {
    if (isNewImage) {
      setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
      setEditStore((prevEditStore) => ({
        ...prevEditStore,
        newImages: prevEditStore.newImages.filter((_, i) => i !== index),
      }));
    } else {
      setEditStore((prevEditStore) => ({
        ...prevEditStore,
        storeImage: prevEditStore.storeImage.filter((_, i) => i !== index),
      }));
    }
  };


  const fetchStoresData = async () => {
    try {
      const storeResponse = await axios.get("http://localhost:8000/api/store");
      console.log(storeResponse.data);
      setStores(storeResponse.data?.stores || storeResponse.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchStoresData();
  }, []);

  // const handleAddStore = async () => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8000/api/store",
  //       newStore
  //     );
  //     console.log("Store added:", response.data);
  //     setStores([...stores, response.data]); // Cập nhật danh sách
  //     setNewStore({
  //       storeName: "",
  //       storeAddress: "",
  //       storePhone: "",
  //       ownerId: "",
  //       status: false,
  //     });
  //     setIsAdding(false);
  //   } catch (error) {
  //     console.error("Error adding store:", error);
  //   }
  // };
  const handleAddStore = async () => {
    // Kiểm tra các trường bắt buộc
  if (!newStore.storeName || !newStore.storeAddress || !newStore.storePhone || !newStore.ownerId) {
    alert("Please fill in all required fields.");
    return;
  }

  // Kiểm tra số điện thoại
  const phoneRegex = /^[0-9]{10,11}$/;
  if (!phoneRegex.test(newStore.storePhone)) {
    alert("Please enter a valid phone number (10-11 digits).");
    return;
  }
    const formData = new FormData();
    formData.append("storeName", newStore.storeName);
    formData.append("storeAddress", newStore.storeAddress);
    formData.append("storePhone", newStore.storePhone);
    formData.append("ownerId", newStore.ownerId);
    formData.append("status", newStore.status ? 'true' : 'false'); // Convert to string 'true' or 'false'
    // newStore.storeImage.forEach((file, index) => {
    //   formData.append(`storeImage`, file);
    // });
    newStore.storeImage.forEach((file, index) => {
      formData.append("storeImage", file);
      console.log(`File ${index}:`, file);
    });


    // Log dữ liệu trước khi gửi
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    try {
      const response = await axios.post("http://localhost:8000/api/store", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200 || response.status === 201) {
        alert("Store added successfully!");
        setIsAdding(false);
        fetchStoresData(); // Refresh the list of stores
      } else {
        alert("Failed to add store. Please try again.");
      }
    } catch (error) {
      console.error("Error adding store:", error);
      alert("An error occurred while adding the store. Please try again.");
    }
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStore((prevNewStore) => ({
      ...prevNewStore,
      [name]: value,
    }));
  };

  // code cu
  // const handleFileChange = (e) => { 
  //   const files = Array.from(e.target.files);
  //   const filePreviews = files.map((file) => URL.createObjectURL(file));
  //   setImagePreviews(filePreviews);

  //   setNewStore((prevNewStore) => ({
  //     ...prevNewStore,
  //     storeImage: files,
  //   }));
  // };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const filePreviews = files.map((file) => URL.createObjectURL(file));

    setImagePreviews((prevPreviews) => [
      ...prevPreviews,
      ...filePreviews,
    ]);

    setNewStore((prevNewStore) => ({
      ...prevNewStore,
      storeImage: [...prevNewStore.storeImage, ...files],
    }));
  };
  const handleRemoveImage = (index) => {
    setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
    setNewStore((prevNewStore) => ({
      ...prevNewStore,
      storeImage: prevNewStore.storeImage.filter((_, i) => i !== index),
    }));
  };


  const handleEditStore = (storeId) => {
    const store = stores.find((s) => s.storeId === storeId);
    if (store) {
      setEditStore({
        ...store,
        storeImage: store.storeImage.map((image) => `http://localhost:8000${image}`),
        newImages: [],
      });
      setImagePreviews([]); // Clear previews when editing starts
      setIsEditing(true);
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditStore((prevEditStore) => ({
      ...prevEditStore,
      [name]: value,
    }));
  };

  const handleEditFileChange = (e) => {
    // const file = e.target.files[0];
    // const filePreview = URL.createObjectURL(file);
    // setImagePreviews([filePreview]);
    // setFileName(file.name);

    // setEditStore((prevEditStore) => ({
    //   ...prevEditStore,
    //   storeImage: file,
    // }));
    const files = Array.from(e.target.files);
    const filePreviews = files.map((file) => URL.createObjectURL(file));

    setImagePreviews((prevPreviews) => [
      ...prevPreviews,
      ...filePreviews,
    ]);

    setEditStore((prevEditStore) => ({
      ...prevEditStore,
      newImages: [...(prevEditStore.newImages || []), ...files],
    }));
  };

  const handleUpdateStore = async () => {
    const formData = new FormData();
    formData.append("storeName", editStore.storeName);
    formData.append("storeAddress", editStore.storeAddress);
    formData.append("storePhone", editStore.storePhone);
    formData.append("ownerId", editStore.ownerId);
    formData.append("status", editStore.status ? 'true' : 'false');
    // if (editStore.storeImage instanceof File) {
    //   formData.append("storeImage", editStore.storeImage);
    // }
    // Append existing images
    // Append existing images as strings
    // Append existing images as strings
    console.log("Existing Images:");
    editStore.storeImage.forEach((image, index) => {
      if (typeof image === 'string') {
        const relativePath = image.replace('http://localhost:8000', '');
        formData.append("existingImages[]", relativePath);
        console.log(`Existing Image ${index}:`, relativePath);
      }
    });

    // Append new images as files
    if (editStore.newImages) {
      console.log("New Images:");
      editStore.newImages.forEach((file, index) => {
        formData.append("newImages", file);
        console.log(`New Image ${index}:`, file);
      });
    }

    // Log dữ liệu trước khi gửi
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    try {
      const response = await axios.patch(`http://localhost:8000/api/store/${editStore.storeId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        alert("Store updated successfully!");
        setIsEditing(false);
        fetchStoresData(); // Refresh the list of stores
      } else {
        alert("Failed to update store. Please try again.");
      }
    } catch (error) {
      console.error("Error updating store:", error);
      alert("An error occurred while updating the store. Please try again.");
    }
  };

  const handleDeleteStore = async (storeId) => {
    if (window.confirm("Are you sure you want to delete this store?")) {
      try {
        const response = await axios.delete(`http://localhost:8000/api/store/${storeId}`);
        if (response.status === 200) {
          alert("Store deleted successfully!");
          fetchStoresData(); // Refresh the list of stores
        } else {
          alert("Failed to delete store. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting store:", error);
        alert("An error occurred while deleting the store. Please try again.");
      }
    }
  };

  const toggleVoucherList = (storeId) => {
    setSelectedVoucherStoreId(selectedVoucherStoreId === storeId ? null : storeId);
  };

  const handleViewStore = async (storeId) => {
    const stats = await fetchStoreStats(storeId, selectedMonth, selectedYear);
    setStoreStats(stats);
    setSelectedStoreId(storeId);
    setIsModalOpen(true);
  };

  const fetchStoreStats = async (storeId, month, year) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/order/stats/${storeId}`, {
        params: { month: month === "All" ? null : month, year }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching store stats:', error);
      return { totalOrders: 0, totalRevenue: 0 };
    }
  };



  const itemsPerPage = 9;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    stores?.length > 0 ? stores.slice(indexOfFirstItem, indexOfLastItem) : [];

  const totalPages =
    stores?.length > 0 ? Math.ceil(stores?.length / itemsPerPage) : 0;

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

  // Component để hiển thị modal chọn ảnh
  const ImageModal = ({ isOpen, images, onClose, onSelectImage }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
        <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-1/3">
          <h2 className="text-xl font-semibold mb-4">Select Main Image</h2>
          <div className="grid grid-cols-3 gap-4">
            {images.map((image, index) => (
              <img
                key={index}
                src={`http://localhost:8000${image}`}
                alt={`Store Image ${index}`}
                className="w-full h-32 object-cover cursor-pointer"
                onClick={() => onSelectImage(index)}
              />
            ))}
          </div>
          <button
            onClick={onClose}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    );
  };



  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Store Management</h1>
      <div className="flex items-center mb-4">
      {userRole === 'manager' && (
        <button
          onClick={() => setIsAdding(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add New Store
        </button>
      )}
        {/* Modal pop-up for updating store */}
        {isEditing && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 mb-6 rounded-lg shadow-lg max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Edit Store</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Store Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter store name"
                    value={editStore.storeName}
                    onChange={handleEditInputChange}
                    name="storeName"
                    className="w-full border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="Enter address"
                    value={editStore.storeAddress}
                    onChange={handleEditInputChange}
                    name="storeAddress"
                    className="w-full border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Phone
                  </label>
                  <input
                    type="number"
                    placeholder="Enter phone number"
                    value={editStore.storePhone}
                    onChange={handleEditInputChange}
                    name="storePhone"
                    className="w-full border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Owner ID
                  </label>
                  <input
                    type="number"
                    placeholder="Enter owner ID"
                    value={editStore.ownerId}
                    onChange={handleEditInputChange}
                    name="ownerId"
                    className="w-full border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editStore.status === 1 || editStore.status === true}
                    onChange={(e) =>
                      setEditStore({ ...editStore, status: e.target.checked ? 1 : 0 })
                    }
                    name="status"
                    className="h-5 w-5 text-blue-500 focus:ring-2 focus:ring-blue-500 rounded border-gray-300"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-600">
                    Active
                  </label>
                </div>
                <div>
                  {/* <label className="block text-sm font-medium text-gray-600 mb-1">
                    Store Image
                  </label>
                  <div className="flex items-center">
                    <label className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer">
                      Choose File
                      <input
                        type="file"
                        onChange={handleEditFileChange}
                        className="hidden"
                      />
                    </label>
                    <span className="ml-4">
                      {fileName ? fileName : "No file selected"}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap">
                    {imagePreviews.length > 0 ? (
                      imagePreviews.map((preview, index) => (
                        <img
                          key={index}
                          src={preview}
                          alt={`Preview ${index}`}
                          className="w-20 h-20 object-cover mr-2 mb-2"
                        />
                      ))
                    ) : (
                      <img
                        src={`http://localhost:8000${editStore.storeImage}`}
                        alt="Current Store Image"
                        className="w-20 h-20 object-cover mr-2 mb-2"
                      />
                    )}
                  </div>
                </div>
              </div> */}
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Store Images
                  </label>
                  <div className="flex items-center">
                    <label className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer">
                      Choose File
                      <input
                        type="file"
                        multiple
                        onChange={handleEditFileChange}
                        className="hidden"
                      />
                    </label>
                    <span className="ml-4">
                      {imagePreviews.length > 0 ? `${imagePreviews.length} file(s) selected` : "No file selected"}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap">
                    {editStore.storeImage.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Current Store Image ${index}`}
                          className="w-20 h-20 object-cover mr-2 mb-2"
                        />
                        <button
                          type="button"
                          onClick={() => handleEditRemoveImage(index, false)}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                    {imagePreviews.length > 0 && imagePreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={preview}
                          alt={`Preview ${index}`}
                          className="w-20 h-20 object-cover mr-2 mb-2"
                        />
                        <button
                          type="button"
                          onClick={() => handleEditRemoveImage(index, true)}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-6 space-x-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg shadow hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateStore}
                  className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-600 transition"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {isAdding && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 mb-6 rounded-lg shadow-lg max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Add Store</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Store Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter store name"
                    value={newStore.storeName}
                    onChange={(e) =>
                      setNewStore({ ...newStore, storeName: e.target.value })
                    }
                    className="w-full border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="Enter address"
                    value={newStore.storeAddress}
                    onChange={(e) =>
                      setNewStore({ ...newStore, storeAddress: e.target.value })
                    }
                    className="w-full border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Phone
                  </label>
                  <input
                    type="number"
                    placeholder="Enter phone number"
                    value={newStore.storePhone}
                    onChange={(e) =>
                      setNewStore({ ...newStore, storePhone: e.target.value })
                    }
                    className="w-full border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Owner
                  </label>
                  <select
                    value={newStore.ownerId}
                    onChange={(e) =>
                      setNewStore({ ...newStore, ownerId: e.target.value })
                    }
                    className="w-full border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="">Select owner</option>
                    {owners.map((owner) => (
                      <option key={owner.id} value={owner.id}>
                        {owner.displayName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newStore.status}
                    onChange={(e) =>
                      setNewStore({ ...newStore, status: e.target.checked })
                    }
                    className="h-5 w-5 text-blue-500 focus:ring-2 focus:ring-blue-500 rounded border-gray-300"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-600">
                    Active
                  </label>
                </div>
                {/* <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Store Image
                  </label>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="w-full border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <div className="mt-2 flex flex-wrap">
                    {imagePreviews.map((preview, index) => (
                      <img
                        key={index}
                        src={preview}
                        alt={`Preview ${index}`}
                        className="w-20 h-20 object-cover mr-2 mb-2"
                      />
                    ))}
                  </div>
                </div> */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Store Images
                  </label>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="w-full border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <div className="mt-2 flex flex-wrap">
                    {/* {imagePreviews.map((preview, index) => (
                      <img
                        key={index}
                        src={preview}
                        alt={`Preview ${index}`}
                        className="w-20 h-20 object-cover mr-2 mb-2"
                      />
                    ))} */}
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={preview}
                          alt={`Preview ${index}`}
                          className="w-20 h-20 object-cover mr-2 mb-2"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-6 space-x-4">
                <button
                  onClick={() => setIsAdding(false)}
                  className="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg shadow hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddStore}
                  className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-600 transition"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr>
              {[
                "Store ID",
                "Store Name",
                "Address",
                "Phone",
                "Owner Name",
                "Status",
                "Store Image",
                "Vouchers",
                "Actions",
              ].map((heading, index) => (
                <th
                  key={index}
                  className="border border-gray-200 px-4 py-2 text-center text-gray-600 font-semibold"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stores?.length > 0 ? (
              currentItems.map((store) => (
                <React.Fragment key={store.storeId}>
                  <tr className="hover:bg-gray-100 transition-all">
                    <td className="border border-gray-200 px-4 py-2">{store.storeId}</td>
                    <td className="border border-gray-200 px-4 py-2">{store.storeName}</td>
                    <td className="border border-gray-200 px-4 py-2">{store.storeAddress}</td>
                    <td className="border border-gray-200 px-4 py-2">{store.storePhone}</td>
                    <td className="border border-gray-200 px-4 py-2">{store.owner.displayName}</td>
                    <td className="border border-gray-200 px-4 py-2">
                      {store.status ? (
                        <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
                          Active
                        </span>
                      ) : (
                        <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {store.storeImage && store.storeImage.length > 0 ? (
                        <div className="relative">
                          <img
                            src={`http://localhost:8000${store.storeImage[0]}`}
                            alt="Store"
                            className="w-32 h-32 object-cover cursor-pointer"
                            onClick={() => toggleImageModal(store.storeId)}
                          />
                        </div>
                      ) : (
                        <span>No image available</span>
                      )}
                    </td>
                    <td
                      className="border border-gray-200 px-4 py-2 "
                      onClick={(event) => {
                        event.stopPropagation(); // Ngăn chặn sự kiện click lan truyền lên các phần tử cha
                        toggleVoucherList(store.storeId);
                      }}
                    >
                      {store?.vouchers?.length > 0 ? (
                        <span className="flex items-center text-blue-500 font-semibold underline hover:text-blue-700">
                          <FaTag className="mr-2" />
                          {store?.vouchers?.length} Voucher(s)
                        </span>
                      ) : (
                        <span className="text-gray-500">
                          <FaTag className="mr-2" />
                          No vouchers
                        </span>
                      )}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      <button
                        onClick={() => handleViewStore(store.storeId)}
                        className="p-2 hover:bg-gray-200 rounded"
                      >
                        <EyeIcon className="h-5 w-5 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleEditStore(store.storeId)}
                        className="p-2 hover:bg-gray-200 rounded"
                      >
                        <PencilSquareIcon className="h-5 w-5 text-gray-600" />
                      </button>
                    </td>
                  </tr>
                  {selectedVoucherStoreId === store.storeId && (
                    <tr>
                      <td colSpan="8">
                        <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                          {store?.vouchers?.length > 0 ? (
                            <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
                              <thead>
                                <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                                  <th className="py-3 px-6 text-left">Voucher ID</th>
                                  <th className="py-3 px-6 text-left">Voucher Name</th>
                                  <th className="py-3 px-6 text-left">Discount</th>
                                </tr>
                              </thead>
                              <tbody className="text-gray-600 text-sm font-light">
                                {store.vouchers.map((voucher) => (
                                  <tr
                                    key={voucher.voucherId}
                                    className="border-b border-gray-200 hover:bg-gray-100"
                                  >
                                    <td className="py-3 px-6 text-left">{voucher.voucherId}</td>
                                    <td className="py-3 px-6 text-left">{voucher.voucherName}</td>
                                    <td className="py-3 px-6 text-left">{voucher.voucherDiscount}%</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            <p className="text-center py-3 px-6">No vouchers found.</p>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td
                  className="border border-gray-200 px-4 py-2 text-center"
                  colSpan="9"
                >
                  No stores found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <ImageModal
          isOpen={isImageModalOpen}
          images={stores.find(store => store.storeId === selectedImageStoreId)?.storeImage || []}
          onClose={() => setIsImageModalOpen(false)}
          onSelectImage={(index) => setMainImage(selectedImageStoreId, index)}
        />

        {/* Modal for Store Statistics */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-1/3">
              <h2 className="text-xl font-semibold mb-4">Store Statistics</h2>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="month">
                  Month
                </label>
                <select
                  id="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                >

                  {[...Array(12).keys()].map((month) => (
                    <option key={month + 1} value={month + 1}>
                      {month + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="year">
                  Year
                </label>
                <select
                  id="year"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                >
                  {[...Array(6).keys()].map((year) => (
                    <option key={year + 2020} value={year + 2020}>
                      {year + 2020}
                    </option>
                  ))}
                </select>
              </div>
              <p><strong>Total Orders:</strong> {storeStats.totalOrders}</p>
              <p><strong>Total Revenue:</strong> {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(storeStats.totalRevenue)}</p>
              <p><strong>Admin Revenue (10%):</strong> {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(storeStats.totalRevenue * 0.1)}</p>
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
        <div className="flex justify-center mt-4">
          <ul className="inline-flex items-center">
            {getPaginationGroup().map((page, index) => (
              <li key={index}>
                {page === "..." ? (
                  <span className="px-4 py-2 text-gray-500">...</span>
                ) : (
                  <button
                    onClick={() => paginate(page)}
                    className={`px-4 py-2 border text-gray-600 ${currentPage === page ? "bg-blue-500 text-white" : "bg-white"}`}
                  >
                    {page}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StoreManagement;
