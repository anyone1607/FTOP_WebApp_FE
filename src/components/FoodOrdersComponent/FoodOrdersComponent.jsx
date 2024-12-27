import React, { useState, useEffect } from "react";
import { FaTrash, FaEye } from "react-icons/fa";

const FoodOrdersComponent = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [storeOrders, setStoreOrders] = useState([]);
  const [storeLoading, setStoreLoading] = useState(false);
  const [selectedStoreName, setSelectedStoreName] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/api/order");

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const ordersData = await response.json();
        setOrders(ordersData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/order/${orderId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch order details");
      }
      const orderData = await response.json();
      setSelectedOrder(orderData);
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

  const itemsPerPage = 9;

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
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Order Management</h1>
      {loading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : orders.length > 0 ? (
        <>
          <table className="min-w-full table-auto border-collapse border border-gray-200 mb-6">
            <thead>
              <tr>
                <th className="border border-gray-200 px-4 py-2">Order ID</th>
                <th className="border border-gray-200 px-4 py-2">User Name</th>
                <th className="border border-gray-200 px-4 py-2">Store Name</th>
                <th className="border border-gray-200 px-4 py-2">
                  Order Status
                </th>
                <th className="border border-gray-200 px-4 py-2">Order Date</th>
                <th className="border border-gray-200 px-4 py-2">
                  Voucher Name
                </th>
                <th className="border border-gray-200 px-4 py-2">Note</th>
                <th className="border border-gray-200 px-4 py-2">
                  Total Price
                </th>
                <th className="border border-gray-200 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((order) => (
                <tr key={order.orderId}>
                  <td className="border border-gray-200 px-4 py-2">
                    {order.orderId}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {order.user.displayName}
                  </td>
                  <td
                    onClick={() =>
                      fetchOrdersByStoreId(
                        order.store.storeId,
                        order.store.storeName
                      )
                    }
                    className="border border-gray-200 px-4 py-2 cursor-pointer text-blue-500 hover:underline"
                  >
                    {order.store.storeName}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {order.orderStatus ? "Completed" : "Pending"}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {new Date(order.orderDate).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {order.voucher?.voucherName || "No Voucher"}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {order.note}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
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
                      <button
                        onClick={() => deleteOrder(order.orderId)}
                        className="bg-red-500 text-white px-2 py-1 rounded flex items-center hover:text-red-700 transition duration-300"
                      >
                        <FaTrash className="mr-1" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {modalOpen && selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                  <div className="bg-white p-6 rounded shadow-lg w-1/2">
                    <h2 className="text-xl font-bold mb-4">
                      Order Details for #{selectedOrder.orderId}
                    </h2>
                    <p>
                      <strong>User:</strong> {selectedOrder.user.displayName}
                    </p>
                    <p>
                      <strong>Store:</strong> {selectedOrder.store.storeName}
                    </p>
                    <p>
                      <strong>Voucher:</strong>{" "}
                      {selectedOrder.voucher.voucherName}
                    </p>
                    <p>
                      <strong>Note:</strong> {selectedOrder.note}
                    </p>
                    <p>
                      <strong>Total Price:</strong>{" "}
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(selectedOrder.totalPrice)}
                    </p>
                    <p>
                      <strong>Order Date:</strong>{" "}
                      {new Date(selectedOrder.orderDate).toLocaleDateString(
                        "en-GB",
                        {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        }
                      )}
                    </p>
                    <button
                      onClick={() => setModalOpen(false)}
                      className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
                    >
                      Close
                    </button>
                  </div>
                </div>
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

          {storeOrders.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  Orders for Store: {selectedStoreName}
                </h2>
                <button
                  onClick={() => {
                    setStoreOrders([]);
                    setSelectedStoreName(null);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
                >
                  Close
                </button>
              </div>
              {storeLoading ? (
                <p>Loading store-specific orders...</p>
              ) : (
                <table className="min-w-full table-auto border-collapse border border-gray-200">
                  <thead>
                    <tr>
                      <th className="border border-gray-200 px-4 py-2">
                        Order ID
                      </th>
                      {/* <th className="border border-gray-200 px-4 py-2">
                        User Name
                      </th> */}
                      <th className="border border-gray-200 px-4 py-2">
                        Total Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {storeOrders.map((order) => (
                      <tr key={order.orderId}>
                        <td className="border border-gray-200 px-4 py-2">
                          {order.orderId}
                        </td>
                        {/* <td className="border border-gray-200 px-4 py-2">
                          {order.user.displayName}
                        </td> */}
                        <td className="border border-gray-200 px-4 py-2">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(order.totalPrice)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default FoodOrdersComponent;
