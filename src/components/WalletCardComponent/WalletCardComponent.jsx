import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaChartLine,
  FaChartBar,
  FaChartPie,
  FaUsers,
  FaCalendarAlt,
  FaCreditCard,
  FaUserTie,
  FaSearch,
} from "react-icons/fa";
import { Bar, Line } from "react-chartjs-2";
import { GiMoneyStack } from "react-icons/gi";
import { Chart, registerables } from "chart.js";
import { useLocation } from 'react-router-dom';
Chart.register(...registerables);

const WalletCardComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [recentTransactionsCount, setRecentTransactionsCount] = useState(0);
  const [bankTransferInfo, setBankTransferInfo] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState({});
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

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/user/findUser/${userId}`);
      console.log("Fetched user data:", response.data); // Log user data
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };


  const [barData, setBarData] = useState({
    labels: [],
    datasets: [],
  });

  const [lineData, setLineData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const colors = ["#3b82f6", "#60a5fa", "#93c5fd"];
    fetch("http://localhost:8000/api/store")
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);
  
        if (!data || data.length === 0) {
          console.error("API trả về dữ liệu rỗng!");
          return;
        }
  
        const labels = data[0]?.sales?.labels?.map(label => `${label.month} ${label.year}`) || [];
        if (labels.length === 0) {
          console.warn("Không có dữ liệu labels!");
        }
  
        const barDatasets = data.map((store, index) => ({
          label: `${store.storeName} - Products Sold`,
          data: store.sales.data || [],
          backgroundColor: colors[index % colors.length],
        }));
  
        const lineDatasets = data.map((store, index) => ({
          label: `${store.storeName} - Revenue`,
          data: store.sales.data1 || [],
          borderColor: colors[index % colors.length],
          backgroundColor: "transparent",
          tension: 0.4,
        }));
  
        setBarData({ labels, datasets: barDatasets });
        setLineData({ labels, datasets: lineDatasets });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  

  const fetchTotalData = async () => {
    try {
      console.log("Fetching total data for user ID:", userId); // Log user ID before
      console.log("Fetching total data for user role:", userRole);
      const [
        userResponse,
        orderResponse,
        revenueResponse,
        transactionResponse,
        bankTransferResponse,
      ] = await Promise.all([
        axios.get(`http://localhost:8000/api/user/countUser?userId=${userId}&role=${userRole}`),
        axios.get(`http://localhost:8000/api/order/countOrder?userId=${userId}&role=${userRole}`),
        axios.get(`http://localhost:8000/api/order/countPrice?userId=${userId}&role=${userRole}`),
        axios.get(`http://localhost:8000/api/transaction/countTransaction?userId=${userId}&role=${userRole}`),
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
      console.log("User ID:", userId);
      console.log("User Role:", userRole);
      fetchUserData();
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
      console.log("data: " + response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchTransactions();
    }
  }, [userId]);

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.transactionDescription &&
      transaction.transactionDescription
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className={`grid grid-cols-1 md:grid-cols-${userRole === 'owner' ? 3 : 4} gap-6 mb-6`}>
    {userRole !== 'owner' && (
      <div className="flex items-center p-4 bg-white shadow rounded-lg">
        <div className="text-blue-500 text-4xl mr-4"><FaUsers /></div>
        <div>
          <p className="text-gray-500">Total Users</p>
          <h3 className="text-2xl font-semibold">{totalUsers}</h3>
        </div>
      </div>
    )}
    <div className="flex items-center p-4 bg-white shadow rounded-lg">
      <div className="text-blue-500 text-4xl mr-4"><FaChartPie /></div>
      <div>
        <p className="text-gray-500">Total Orders</p>
        <h3 className="text-2xl font-semibold">{totalOrders}</h3>
      </div>
    </div>
    <div className="flex items-center p-4 bg-white shadow rounded-lg">
      <div className="text-blue-500 text-4xl mr-4"><FaChartBar /></div>
      <div>
        <p className="text-gray-500">Total Revenue</p>
        <h3 className="text-2xl font-semibold">{formatCurrency(totalRevenue)}</h3>
      </div>
    </div>
    <div className="flex items-center p-4 bg-white shadow rounded-lg">
      <div className="text-blue-500 text-4xl mr-4"><FaChartLine /></div>
      <div>
        <p className="text-gray-500">Recent Transactions</p>
        <h3 className="text-2xl font-semibold">{recentTransactionsCount}</h3>
      </div>
    </div>
  </div>

      <div className="grid grid-cols-2 gap-y-4 mb-6">
        {/* Số dư */}
        <div className="flex items-center space-x-4">
          <div className="text-blue-500 text-3xl">
            <GiMoneyStack />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600">Số dư</span>
            <p className="text-3xl font-bold text-blue-600">
            {formatCurrency(userData.walletBalance || 0)}
            </p>
          </div>
        </div>

        {/* Chủ Tài Khoản */}
        <div className="flex items-center space-x-4">
          <div className="text-blue-500 text-3xl">
            <FaUserTie />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600">Chủ Tài Khoản</span>
            <p className="text-lg font-bold">
              {bankTransferInfo
                ? bankTransferInfo.user.displayName
                : "Đang tải..."}
            </p>
          </div>
        </div>

        {/* Ngày mở tài khoản */}
        <div className="flex items-center space-x-4">
          <div className="text-blue-500 text-3xl">
            <FaCalendarAlt />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600">Ngày mở tài khoản</span>
            <p className="text-lg font-bold">
              {bankTransferInfo
                ? new Date(bankTransferInfo.transferDate).toLocaleDateString()
                : "Đang tải..."}
            </p>
          </div>
        </div>

        {/* Số tài khoản */}
        <div className="flex items-center space-x-4">
          <div className="text-blue-500 text-3xl">
            <FaCreditCard />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600">Số tài khoản</span>
            <p className="text-lg font-bold">
              {bankTransferInfo
                ? bankTransferInfo.accountNumber
                : "Đang tải..."}
            </p>
          </div>
        </div>
      </div>

      {/* Biểu đồ */}
      {userRole === 'admin' && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 shadow rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Product Sales</h3>
          </div>
          <Bar data={barData} />
        </div>

        <div className="bg-white p-4 shadow rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold mb-4">Sales & Revenue</h3>
          </div>
          <Line data={lineData} options={{ responsive: true }} />
        </div>
      </div>
    )}
  

      <div className="bg-white shadow-md rounded-lg p-4 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Recent Transactions</h3>
        </div>
        {/* Bảng dữ liệu */}
        <div className="overflow-x-auto">
          {/* Search form */}
          <div className="flex items-center mb-4 relative">
            <div className="absolute left-3 text-gray-400 text-lg">
              <FaSearch />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm giao dịch..."
              className="border border-blue-400 rounded-lg pl-10 pr-4 py-2 w-full text-gray-700 shadow-sm transition duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto max-h-96">
            <table className="min-w-full table-auto border-separate border-spacing-0 bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold">
                    Mã giao dịch
                  </th>
                  <th className="py-3 px-4 text-left font-semibold">
                    Người chuyển
                  </th>
                  <th className="py-3 px-4 text-left font-semibold">
                    Người nhận
                  </th>
                  <th className="py-3 px-4 text-left font-semibold">
                    Ngày giao dịch
                  </th>
                  <th className="py-3 px-4 text-left font-semibold">Số tiền</th>
                  <th className="py-3 px-4 text-left font-semibold">Mô tả</th>
                  <th className="py-3 px-4 text-left font-semibold">
                    Trạng thái
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction, index) => (
                  <tr
                    key={transaction.transactionId}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition-colors duration-200`}
                  >
                    <td className="py-3 px-4 border-b">
                      {transaction.transactionId}
                    </td>
                    <td className="py-3 px-4 border-b">
                      {transaction.transferUser
                        ? transaction.transferUser.displayName
                        : "Customer Name Not Found"}
                    </td>
                    <td className="py-3 px-4 border-b">
                      {transaction.receiveUser
                        ? transaction.receiveUser.displayName
                        : "Admin Name Not Found"}
                    </td>
                    <td className="py-3 px-4 border-b">
                      {new Date(
                        transaction.transactionDate
                      ).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 border-b">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(transaction.transactionAmount)}
                    </td>
                    <td className="py-3 px-4 border-b">
                      {transaction.transactionDescription}
                    </td>
                    <td className="py-3 px-4 border-b">
                      {transaction.status ? "Hoàn thành" : "Chưa hoàn thành"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletCardComponent;
