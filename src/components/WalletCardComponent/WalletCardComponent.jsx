import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaUser,
  FaShoppingCart,
  FaMoneyBillWave,
  FaExchangeAlt,
} from "react-icons/fa";
// import Chart from "chart.js/auto";
import { useLocation } from 'react-router-dom';

const WalletCardComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [recentTransactionsCount, setRecentTransactionsCount] = useState(0);
  const [bankTransferInfo, setBankTransferInfo] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [userId, setUserId] = useState(null);
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
    }
  }, [location]);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const email = localStorage.getItem('email');
        const response = await axios.get(`http://localhost:8000/api/user/email/${email}`);
        console.log("Fetched user ID:", response.data.id); // Log user ID
        setUserId(response.data.id); // Assuming the response contains the user object with an id field
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);


  const fetchTotalData = async () => {
    try {
      console.log("Fetching total data for user ID:", userId); // Log user ID before
      const [
        userResponse,
        orderResponse,
        revenueResponse,
        transactionResponse,
        bankTransferResponse,
      ] = await Promise.all([
        axios.get("http://localhost:8000/api/user/countUser"),
        axios.get("http://localhost:8000/api/order/countOrder"),
        axios.get("http://localhost:8000/api/order/countPrice"),
        axios.get("http://localhost:8000/api/transaction/countTransaction"),
        axios.get(`http://localhost:8000/api/banktransfer/${userId}`),
      ]);

      setTotalUsers(userResponse.data.totalUsers);
      setTotalOrders(orderResponse.data.totalOrders);
      setTotalRevenue(revenueResponse.data.totalPrice);
      setRecentTransactionsCount(transactionResponse.data.totalTransactions);
      setBankTransferInfo(bankTransferResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchTotalData();
      fetchTransactions();
    }
  }, [userId]);

  

  const fetchTransactions = async () => {
    try {
      console.log("Fetching transactions for user ID:", userId); // Log user ID 
      const response = await axios.get(
        `http://localhost:8000/api/transaction/searchAll/${userId}`  
      );
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.transactionDescription &&
      transaction.transactionDescription
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 my-6">
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded-lg shadow flex items-center">
          <FaUser className="text-blue-600 text-3xl mr-2" />
          <div>
            <h4 className="font-semibold">Số lượng người dùng</h4>
            <p className="text-2xl font-bold text-blue-600">{totalUsers}</p>
          </div>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow flex items-center">
          <FaShoppingCart className="text-yellow-600 text-3xl mr-2" />
          <div>
            <h4 className="font-semibold">Tổng số đơn hàng</h4>
            <p className="text-2xl font-bold text-yellow-600">{totalOrders}</p>
          </div>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow flex items-center">
          <FaMoneyBillWave className="text-green-600 text-3xl mr-2" />
          <div>
            <h4 className="font-semibold">Tổng doanh thu</h4>
            <p className="text-2xl font-bold text-green-600">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(totalRevenue)}
            </p>
          </div>
        </div>
        <div className="bg-red-100 p-4 rounded-lg shadow flex items-center">
          <FaExchangeAlt className="text-red-600 text-3xl mr-2" />
          <div>
            <h4 className="font-semibold">Giao dịch trong ngày</h4>
            <p className="text-2xl font-bold text-red-600">
              {recentTransactionsCount}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-4 mb-6">
        {/* Thông tin tài khoản */}
        <div className="flex flex-col">
          <span className="text-gray-600">Số dư</span>
          <p className="text-3xl font-bold text-blue-600">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(
              bankTransferInfo ? bankTransferInfo.transferAmount : "Đang tải..."
            )}
          </p>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-600">Chủ Tài Khoản</span>
          <p className="text-lg font-bold">
            {bankTransferInfo
              ? bankTransferInfo.user.displayName
              : "Đang tải..."}
          </p>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-600">Ngày mở tài khoản</span>
          <p className="text-lg font-bold">
            {bankTransferInfo
              ? new Date(bankTransferInfo.transferDate).toLocaleDateString()
              : "Đang tải..."}
          </p>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-600">Số tài khoản</span>
          <p className="text-lg font-bold">
            {bankTransferInfo ? bankTransferInfo.accountNumber : "Đang tải..."}
          </p>
        </div>
      </div>

      {/* form recent transaction */}
      <div className="bg-gray-100 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>

        {/* Search form */}
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm giao dịch..."
            className="border border-gray-300 rounded-l-lg p-2 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table container with fixed height and scrolling */}
        <div className="overflow-x-auto max-h-96">
          <table className="min-w-full table-auto border-separate border-spacing-0">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="py-3 px-6 text-left font-semibold">
                  Mã giao dịch
                </th>
                <th className="py-3 px-6 text-left font-semibold">
                  Người chuyển
                </th>
                <th className="py-3 px-6 text-left font-semibold">
                  Người nhận
                </th>
                <th className="py-3 px-6 text-left font-semibold">
                  Ngày giao dịch
                </th>
                <th className="py-3 px-6 text-left font-semibold">Số tiền</th>
                <th className="py-3 px-6 text-left font-semibold">Mô tả</th>
                <th className="py-3 px-6 text-left font-semibold">
                  Trạng thái
                </th>
                <th className="py-3 px-6 text-left font-semibold">Đơn hàng</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction, index) => (
                <tr
                  key={transaction.transactionId}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition-colors`}
                >
                  <td className="py-3 px-6 border-b">
                    {transaction.transactionId}
                  </td>
                  <td className="py-3 px-6 border-b">
                    {transaction.transferUser
                      ? transaction.transferUser.displayName
                      : "Customer Name Not Found"}
                  </td>
                  <td className="py-3 px-6 border-b">
                    {transaction.receiveUser
                      ? transaction.receiveUser.displayName
                      : "Admin Name Not Found"}
                  </td>

                  <td className="py-3 px-6 border-b">
                    {new Date(transaction.transactionDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 border-b">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(transaction.transactionAmount)}
                  </td>
                  <td className="py-3 px-6 border-b">
                    {transaction.transactionDescription}
                  </td>
                  <td className="py-3 px-6 border-b">
                    {transaction.status ? "Hoàn thành" : "Chưa hoàn thành"}
                  </td>
                  <td className="py-3 px-6 border-b">
                    {transaction.order ? transaction.order.orderId : "Không có"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WalletCardComponent;
