import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit, FaEye, FaPlus, FaTag, FaTrash } from "react-icons/fa";
const StoreManagement = () => {
  const [stores, setStores] = useState([]);
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentStore, setCurrentStore] = useState(null);
  const [formData, setFormData] = useState({
    storeName: "",
    storePhone: "",
    ownerId: "",
    status: true,
    storeAddress: "",
  });

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

  // Handle form input changes for add/update
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.name === "storePhone" ? parseFloat(e.target.value) || 0 : e.target.value,
    });
  };

  // Handle adding store
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/store", formData);
      alert("Store added successfully!");
      setShowAddModal(false);
      refreshStores();
    } catch (error) {
      console.error("Error adding store:", error);
    }
  };

  // Handle updating store
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8000/api/store/${currentStore.storeId}`,
        formData
      );
      alert("Store updated successfully!");
      setShowUpdateModal(false);
      refreshStores();
    } catch (error) {
      console.error("Error updating store:", error);
    }
  };

  // Handle deleting store
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/store/${currentStore.storeId}`
      );
      alert("Store deleted successfully!");
      setShowDeleteModal(false);
      refreshStores();
    } catch (error) {
      console.error("Error deleting store:", error);
    }
  };

  // Open modals with selected store
  const handleView = (store) => {
    setCurrentStore(store);
    setShowViewModal(true);
  };

  const handleEdit = (store) => {
    setCurrentStore(store);
    setFormData({
      storeName: store.storeName,
      storePhone: store.storePhone,
      ownerId: store.ownerId,
      status: store.status,
      storeAddress: store.storeAddress,
    });
    setShowUpdateModal(true);
  };

  const handleDeleteConfirmation = (store) => {
    setCurrentStore(store);
    setShowDeleteModal(true);
  };

  const refreshStores = async () => {
    const updatedStores = await axios.get(
      "http://localhost:8000/api/store"
    );
    setStores(updatedStores.data.data.stores);
  };

  const toggleVoucherList = (storeId) => {
    setSelectedStoreId(selectedStoreId === storeId ? null : storeId);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-4">
        <h1 className="text-2xl font-bold">Store Management</h1>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center bg-green-500 text-white font-bold py-2 px-4 rounded"
        >
          <FaPlus className="mr-2" />
          Add Store
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
              <th className="py-3 px-6 text-left">Store ID</th>
              <th className="py-3 px-6 text-left">Store Name</th>
              <th className="py-3 px-6 text-left">Address</th>
              <th className="py-3 px-6 text-left">Phone</th>
              <th className="py-3 px-6 text-left">Owner ID</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Vouchers</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {stores.length > 0 ? (
              stores.map((store) => (
                <React.Fragment key={store.storeId}>
                  <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">{store.storeId}</td>
                    <td className="py-3 px-6 text-left">{store.storeName}</td>
                    <td className="py-3 px-6 text-left">
                      {store.storeAddress}
                    </td>
                    <td className="py-3 px-6 text-left">{store.storePhone}</td>
                    <td className="py-3 px-6 text-left">{store.ownerId}</td>
                    <td className="py-3 px-6 text-left">
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
                    <td
                      className="py-3 px-6 text-left cursor-pointer flex items-center"
                      onClick={() => toggleVoucherList(store.storeId)}
                    >
                      {store.vouchers.length > 0 ? (
                        <span className="flex items-center text-blue-500 font-semibold underline hover:text-blue-700">
                          <FaTag className="mr-2" />
                          {store.vouchers.length} Voucher(s)
                        </span>
                      ) : (
                        <span className="text-gray-500">
                          <FaTag className="mr-2" />
                          No vouchers
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-6 text-left">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleView(store)}
                        className="bg-blue-500 text-white px-2 py-1 rounded flex items-center hover:text-blue-700 transition duration-300"
                      >
                        <FaEye className="mr-1" /> View
                      </button>
                      <button
                        onClick={() => handleEdit(store)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded flex items-center hover:text-yellow-700 transition duration-300"
                      >
                        <FaEdit className="mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteConfirmation(store)}
                        className="bg-red-500 text-white px-2 py-1 rounded flex items-center hover:text-red-700 transition duration-300"
                      >
                        <FaTrash className="mr-1" /> Delete
                      </button>
                    </div>
                  </td>
                  </tr>
                  {selectedStoreId === store.storeId && (
                    <tr>
                      <td colSpan="7">
                        <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                          {/* <ul>
                            {store.vouchers.map((voucher) => (
                              <li key={voucher.voucherId} className="mb-2">
                                <span className="font-semibold">{voucher.voucherName}</span> - {voucher.voucherDiscount}
                              </li>
                            ))}
                          </ul> */}
                          {store.vouchers.length > 0 ? (
                            <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
                              <thead>
                                <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                                  <th className="py-3 px-6 text-left">
                                    Voucher ID
                                  </th>
                                  <th className="py-3 px-6 text-left">
                                    Voucher Name
                                  </th>
                                  <th className="py-3 px-6 text-left">
                                    Discount
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="text-gray-600 text-sm font-light">
                                {store.vouchers.map((voucher) => (
                                  <tr
                                    key={voucher.voucherId}
                                    className="border-b border-gray-200 hover:bg-gray-100"
                                  >
                                    <td className="py-3 px-6 text-left">
                                      {voucher.voucherId}
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                      {voucher.voucherName}
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                      {voucher.voucherDiscount}%
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            <p className="text-center py-3 px-6">
                              No vouchers found.
                            </p>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-3 px-6">
                  No stores found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Add Store Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <h2 className="text-2xl mb-4">Add Store</h2>
            <form onSubmit={handleAddSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Store Name</label>
                <input
                  type="text"
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleInputChange}
                  className="border px-4 py-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Store Phone</label>
                <input
                  type="number"
                  name="storePhone"
                  value={formData.storePhone}
                  onChange={handleInputChange}
                  className="border px-4 py-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Owner ID</label>
                <input
                  type="text"
                  name="ownerId"
                  value={formData.ownerId}
                  onChange={handleInputChange}
                  className="border px-4 py-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Store Address</label>
                <input
                  type="text"
                  name="storeAddress"
                  value={formData.storeAddress}
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

      {/* View Store Modal */}
      {showViewModal && currentStore && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/2">
        <h2 className="text-2xl mb-4">View Store</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Store Name</label>
          <p>{currentStore.storeName}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Store Phone</label>
          <p>{currentStore.storePhone}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Owner ID</label>
          <p>{currentStore.ownerId}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Status</label>
          <p>{currentStore.status ? "Active" : "Inactive"}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Store Address</label>
          <p>{currentStore.storeAddress}</p>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setShowViewModal(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )}

      {/* Update Store Modal */}
      {showUpdateModal && currentStore && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/2">
        <h2 className="text-2xl mb-4">Update Store</h2>
        <form onSubmit={handleUpdateSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Store Name</label>
            <input
              type="text"
              name="storeName"
              value={formData.storeName}
              onChange={handleInputChange}
              className="border px-4 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Store Phone</label>
            <input
              type="number"
              name="storePhone"
              value={formData.storePhone}
              onChange={handleInputChange}
              className="border px-4 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Owner ID</label>
            <input
              type="text"
              name="ownerId"
              value={formData.ownerId}
              onChange={handleInputChange}
              className="border px-4 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Store  Address</label>
            <input
              type="text"
              name="storeAddress"
              value={formData.storeAddress}
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
      {showDeleteModal && currentStore && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/2">
        <h2 className="text-2xl mb-4">Delete Store</h2>
        <p>Are you sure you want to delete this store?</p>
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

export default StoreManagement;
