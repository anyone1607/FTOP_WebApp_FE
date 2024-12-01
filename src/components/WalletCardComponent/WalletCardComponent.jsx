import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  FaUser,
  FaShoppingCart,
  FaMoneyBillWave,
  FaExchangeAlt,
} from "react-icons/fa";
import Chart from "chart.js/auto";
import { useLocation } from 'react-router-dom';

const WalletCardComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [recentTransactionsCount, setRecentTransactionsCount] = useState(0);
  const [bankTransferInfo, setBankTransferInfo] = useState(null);

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

  const fetchTotalData = async () => {
    try {
      const [userResponse, orderResponse, revenueResponse, transactionResponse, bankTransferResponse] = await Promise.all([
        axios.get('http://localhost:8000/api/user/countUser'),
        axios.get('http://localhost:8000/api/order/countOrder'),
        axios.get('http://localhost:8000/api/order/countPrice'),
        axios.get('http://localhost:8000/api/transaction/countTransaction'),
        axios.get('http://localhost:8000/api/banktransfer/19')
      ]);
  
      setTotalUsers(userResponse.data.totalUsers);
      setTotalOrders(orderResponse.data.totalOrders);
      setTotalRevenue(revenueResponse.data.totalPrice);
      setRecentTransactionsCount(transactionResponse.data.totalTransactions);
      setBankTransferInfo(bankTransferResponse.data);
      // console.log(revenueResponse);
      // console.log(transactionResponse);
      // console.log(bankTransferInfo);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    fetchTotalData();
  }, []);

  const transactions = [
    { id: 1, description: "Food Order", amount: -20.0 },
    { id: 2, description: "Wallet Top-Up", amount: 100.0 },
  ];

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const chartRef = useRef(null);
  const myChartRef = useRef(null);

  useEffect(() => {
    const xValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
    myChartRef.current = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels: xValues,
        datasets: [
          {
            data: [860, 1140, 1060, 1060, 1070, 1110, 1330, 2210, 7830, 2478],
            borderColor: "red",
            fill: false,
          },
          {
            data: [1600, 1700, 1700, 1900, 2000, 2700, 4000, 5000, 6000, 7000],
            borderColor: "green",
            fill: false,
          },
          {
            data: [300, 700, 2000, 5000, 6000, 4000, 2000, 1000, 200, 100],
            borderColor: "blue",
            fill: false,
          },
        ],
      },
      options: {
        legend: { display: false },
      },
    });
    return () => {
      myChartRef.current.destroy();
    };
  }, []);

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
            <p className="text-2xl font-bold text-green-600">{+totalRevenue}</p>
          </div>
        </div>
        <div className="bg-red-100 p-4 rounded-lg shadow flex items-center">
          <FaExchangeAlt className="text-red-600 text-3xl mr-2" />
          <div>
            <h4 className="font-semibold">Giao dịch trong ngày</h4>
            <p className="text-2xl font-bold text-red-600">{recentTransactionsCount}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-4 mb-6">
        {/* Thông tin tài khoản */}
        <div className="flex flex-col">
          <span className="text-gray-600">Số dư</span>
          <p className="text-3xl font-bold text-blue-600">
            {bankTransferInfo
              ? bankTransferInfo.transferAmount + " VND"
              : "Đang tải..."}
          </p>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-600">Chủ Tài Khoản</span>
          <p className="text-lg font-bold">
            {bankTransferInfo ? bankTransferInfo.user.displayName : "Đang tải..."}
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

      <div className="bg-gray-100 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        {/* Thanh tìm kiếm */}
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm giao dịch..."
            className="border border-gray-300 rounded-l-lg p-2 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ul>
          {filteredTransactions.map((transaction) => (
            <li
              key={transaction.id}
              className="flex justify-between py-2 border-b"
            >
              <span>{transaction.description}</span>
              <span
                className={`font-bold ${
                  transaction.amount < 0 ? "text-red-600" : "text-green-600"
                }`}
              >
                {transaction.amount < 0
                  ? `- $${Math.abs(transaction.amount).toFixed(2)}`
                  : `+ $${transaction.amount.toFixed(2)}`}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <canvas
        ref={chartRef}
        style={{ width: "100%", maxWidth: "600px" }}
      ></canvas>
    </div>
  );
};

export default WalletCardComponent;
