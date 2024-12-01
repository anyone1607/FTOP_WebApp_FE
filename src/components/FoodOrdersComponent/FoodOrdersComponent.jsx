import React, { useState, useEffect } from "react";
import { FaTrash, FaEye } from "react-icons/fa";
const FoodOrdersComponent = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/api/order");

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const ordersData = await response.json();
        // console.log('Fetched Orders:', ordersData);
        setOrders(ordersData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Order Management</h1>
      {loading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : orders.length > 0 ? (
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-200 px-4 py-2">Order ID</th>
              <th className="border border-gray-200 px-4 py-2">User Name</th>
              <th className="border border-gray-200 px-4 py-2">Store Name</th>
              <th className="border border-gray-200 px-4 py-2">Order Status</th>
              <th className="border border-gray-200 px-4 py-2">Order Date</th>
              <th className="border border-gray-200 px-4 py-2">Voucher Name</th>
              <th className="border border-gray-200 px-4 py-2">Note</th>
              <th className="border border-gray-200 px-4 py-2">Total Price</th>
              <th className="border border-gray-200 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td className="border border-gray-200 px-4 py-2">
                  {order.orderId}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {order.user.displayName || "Unknown User"}
                </td>
                <td className="border border-gray-200 px-4 py-2">
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
                  {order.voucher ? order.voucher.voucherName : "No Voucher"}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {order.note}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  ${parseFloat(order.totalPrice).toFixed(2)}
                </td>
                <td className="py-3 px-6 text-left">
                  <div className="flex items-center space-x-2">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded flex items-center hover:text-blue-700 transition duration-300">
                      <FaEye className="mr-1" /> View
                    </button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded flex items-center hover:text-red-700 transition duration-300">
                      <FaTrash className="mr-1" /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default FoodOrdersComponent;
