import React, { useState, useEffect } from "react";
import { FaTrash, FaEye } from "react-icons/fa";
import axios from "axios";

const FoodOrdersComponent = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [storeOrders, setStoreOrders] = useState([]);
  const [storeLoading, setStoreLoading] = useState(false);
  const [selectedStoreName, setSelectedStoreName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStore, setSelectedStore] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [stores, setStores] = useState([]);
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await fetch("http://localhost:8000/api/order");

  //       if (!response.ok) {
  //         throw new Error("Failed to fetch orders");
  //       }

  //       const ordersData = await response.json();
  //       setOrders(ordersData);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchOrders();
  // }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const email = params.get('email');
    const role = params.get('role');
    const name = params.get('name');
  
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      localStorage.setItem('role', role);
      localStorage.setItem('name', name);
    }
  }, []);
  
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const email = localStorage.getItem('email');
        const response = await axios.get(`http://localhost:8000/api/user/email/${email}`);
        console.log("Fetched user ID:", response.data.id);
        setUserId(response.data.id);
        setRole(localStorage.getItem('role'));
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };
  
    fetchUserId();
  }, []);
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const role = localStorage.getItem('role');
        const response = await axios.get("http://localhost:8000/api/order", {
          params: {
            userId: userId,
            role: role
          }
        });
  
        if (response.status !== 200) {
          throw new Error("Failed to fetch orders");
        }
  
        const ordersData = response.data;
        setOrders(ordersData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    if (userId && role) {
      fetchOrders();
    }
  }, [userId, role]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/store");
        if (!response.ok) {
          throw new Error("Failed to fetch stores");
        }
        const storesData = await response.json();
        setStores(storesData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchStores();
  }, []);

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/order/${orderId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch order details");
      }
      const data = await response.json();
      setSelectedOrder({
        ...data,
        orderItems: data.orderItems || [], // Đảm bảo orderItems luôn là một mảng
      });
      setModalOpen(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchOrdersByStoreId = async (storeId, storeName) => {
    try {
      setStoreLoading(true);
      setSelectedStoreName(storeName);
      const response = await fetch(
        `http://localhost:8000/api/order/store/${storeId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch store-specific orders");
      }

      const storeOrdersData = await response.json();
      setStoreOrders(storeOrdersData);
    } catch (err) {
      setError(err.message);
    } finally {
      setStoreLoading(false);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/order/soft-delete/${orderId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete order");
      }

      const message = await response.text();
      alert(message);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.orderId !== orderId)
      );
    } catch (error) {
      alert(error.message);
    }
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStoreFilterChange = (e) => {
    setSelectedStore(e.target.value);
  };

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    if (new Date(newStartDate) > new Date(endDate)) {
      alert("Start Date cannot be after End Date.");
    } else {
      setStartDate(newStartDate);
    }
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    const today = new Date().toISOString().split("T")[0]; // Lấy ngày hôm nay
    if (new Date(newEndDate) > new Date(today)) {
      alert("End Date cannot be in the future.");
    } else if (new Date(newEndDate) < new Date(startDate)) {
      alert("End Date cannot be before Start Date.");
    } else {
      setEndDate(newEndDate);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearchTerm = order.user.displayName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStore = selectedStore
      ? order.store.storeName === selectedStore
      : true;
    const matchesStartDate = startDate
      ? new Date(order.orderDate) >= new Date(startDate)
      : true;
    const matchesEndDate = endDate
      ? new Date(order.orderDate) <= new Date(endDate)
      : true;

    return matchesSearchTerm && matchesStore && matchesStartDate && matchesEndDate;
  });

  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    orders.length > 0 ? orders.slice(indexOfFirstItem, indexOfLastItem) : [];

  const totalPages =
    orders.length > 0 ? Math.ceil(orders.length / itemsPerPage) : 0;

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
      <div className="mb-4 flex justify-center items-center">
        <h1 className="text-2xl font-bold">Order Management</h1>
      </div>

      {/* Thanh tìm kiếm và bộ lọc */}
      <div className="flex justify-between mb-6 space-x-4">
        <input
          type="text"
          placeholder="Search by user name"
          className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={handleSearchChange}
        />

{role !== 'store-owner' && (
        <select
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedStore}
          onChange={handleStoreFilterChange}
        >
          <option value="">All Stores</option>
          {stores.map((store) => (
            <option key={store.storeId} value={store.storeName}>
              {store.storeName}
            </option>
          ))}
        </select>
      )}

        <div className="relative">
          <label htmlFor="startDate" className="absolute -top-3 left-2 bg-white px-1 text-gray-700">From Date</label>
          <input
            id="startDate"
            type="date"
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </div>

        <div className="relative">
          <label htmlFor="endDate" className="absolute -top-3 left-2 bg-white px-1 text-gray-700">To Date</label>
          <input
            id="endDate"
            type="date"
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>
      </div>

      {loading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : filteredOrders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                <th className="py-3 px-6 text-left">Order ID</th>
                <th className="py-3 px-6 text-left">User Name</th>
                <th className="py-3 px-6 text-left">Store Name</th>
                <th className="py-3 px-6 text-left">Order Status</th>
                <th className="py-3 px-6 text-left">Order Date</th>
                <th className="py-3 px-6 text-left">Voucher Name</th>
                <th className="py-3 px-6 text-left">Note</th>
                <th className="py-3 px-6 text-left">Total Price</th>
                <th className="py-3 px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {filteredOrders.map((order) => (
                <tr
                  key={order.orderId}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">{order.orderId}</td>
                  <td className="py-3 px-6 text-left">{order.user.displayName}</td>
                  <td className="py-3 px-6 text-left">{order.store.storeName}</td>
                  <td className="py-3 px-6 text-left">
                    {order.orderStatus ? (
                      <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
                        Completed
                      </span>
                    ) : (
                      <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {new Date(order.orderDate).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {order.voucher?.voucherName ?? "No Voucher"}
                  </td>
                  <td className="py-3 px-6 text-left">{order.note}</td>
                  <td className="py-3 px-6 text-left">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(order.totalPrice)}
                  </td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => fetchOrderDetails(order.orderId)}
                        className="bg-blue-500 text-white px-2 py-1 rounded flex items-center hover:text-blue-700 transition duration-300"
                      >
                        <FaEye className="mr-1" /> View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No orders found.</p>
      )}

      {modalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 max-w-3xl">
            <h2 className="text-2xl font-bold mb-6">Order Details for #{selectedOrder.orderId}</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="mb-2">
                  <strong>User:</strong> {selectedOrder.user.displayName}
                </p>
                <p className="mb-2">
                  <strong>Store:</strong> {selectedOrder.store.storeName}
                </p>
                <p className="mb-2">
                  <strong>Voucher:</strong> {selectedOrder.voucher?.voucherName ?? "No Voucher"}
                </p>
              </div>
              <div>
                <p className="mb-2">
                  <strong>Note:</strong> {selectedOrder.note}
                </p>
                <p className="mb-2">
                  <strong>Total Price:</strong> {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(selectedOrder.totalPrice)}
                </p>
                <p className="mb-2">
                  <strong>Order Date:</strong> {new Date(selectedOrder.orderDate).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </p>
              </div>
            </div>
            <h3 className="text-lg font-bold mb-4">Order Items</h3>
            {selectedOrder.orderItems ? (
              <table className="min-w-full table-auto border-collapse border border-gray-200 mb-6">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 px-4 py-2">Product Name</th>
                    <th className="border border-gray-200 px-4 py-2">Quantity</th>
                    <th className="border border-gray-200 px-4 py-2">Unit Price</th>
                    <th className="border border-gray-200 px-4 py-2">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.orderItems.map((item) => (
                    <tr key={item.orderItemId} className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2">
                        {item.product.productName}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {item.quantity}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.unitPrice)}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.unitPrice * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No order items found.</p>
            )}
            <div className="flex justify-end">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodOrdersComponent;
