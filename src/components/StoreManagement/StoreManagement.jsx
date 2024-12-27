import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTag } from "react-icons/fa";
const StoreManagement = () => {
  const [stores, setStores] = useState([]);
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [newStore, setNewStore] = useState({
    storeName: "",
    storeAddress: "",
    storePhone: "",
    ownerId: "",
    status: false,
  });
  const [isAdding, setIsAdding] = useState(false);

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

  const handleAddStore = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/store",
        newStore
      );
      console.log("Store added:", response.data);
      setStores([...stores, response.data]); // Cập nhật danh sách
      setNewStore({
        storeName: "",
        storeAddress: "",
        storePhone: "",
        ownerId: "",
        status: false,
      });
      setIsAdding(false);
    } catch (error) {
      console.error("Error adding store:", error);
    }
  };

  const toggleVoucherList = (storeId) => {
    setSelectedStoreId(selectedStoreId === storeId ? null : storeId);
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

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-4">
        <button
          onClick={() => setIsAdding(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add New Store
        </button>
        {isAdding && (
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
                  type="text"
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
                  Owner ID
                </label>
                <input
                  type="number"
                  placeholder="Enter owner ID"
                  value={newStore.ownerId}
                  onChange={(e) =>
                    setNewStore({ ...newStore, ownerId: e.target.value })
                  }
                  className="w-full border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
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
        )}
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
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {stores?.length > 0 ? (
              currentItems.map((store) => (
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
                          {store?.vouchers?.length > 0 ? (
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
        <div className="flex justify-center mt-4">
          <ul className="inline-flex items-center">
            {getPaginationGroup().map((page, index) => (
              <li key={index}>
                {page === "..." ? (
                  <span className="px-4 py-2 text-gray-500">...</span>
                ) : (
                  <button
                    onClick={() => paginate(page)}
                    className={`px-4 py-2 border text-gray-600 ${
                      currentPage === page
                        ? "bg-blue-500 text-white"
                        : "bg-white"
                    }`}
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
