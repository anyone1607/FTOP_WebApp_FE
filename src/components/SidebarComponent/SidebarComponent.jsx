import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  MdSupervisorAccount,
  MdProductionQuantityLimits,
  MdBarChart,
  MdOutlineAssignment,
  MdStorefront,
  MdLogout,
} from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { GiTakeMyMoney, GiWallet } from "react-icons/gi";
import { VscTag } from "react-icons/vsc";
import { FiArrowUpCircle } from "react-icons/fi";
import { GrTransaction } from "react-icons/gr";
const SidebarComponent = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const [userInfo, setUserInfo] = useState({
    name: localStorage.getItem('name'),
    role: localStorage.getItem('role')
  });

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
      setUserInfo({ name, role });
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    window.location.href = 'http://localhost:3000/home';
  };

  const menuItems = [
    {
      path: "/auth/system/e-wallet",
      label: "E-Wallet",
      icon: <GiWallet />,
      roles: ["admin", "manager", "staff", "owner"]
    },
    {
      path: "/auth/system/account/admin",
      label: "Account Management",
      icon: <MdSupervisorAccount />,
      roles: ["admin"]
    },
    {
      path: "/auth/system/product/owner",
      label: "Product Management",
      icon: <MdProductionQuantityLimits />,
      roles: ["admin", "manager", "owner"]
    },
    {
      path: "/auth/system/voucher/admin",
      label: "Voucher Management",
      icon: <VscTag />,
      roles: ["admin", "manager", "owner"]
    },
    {
      path: "/auth/system/statistic",
      label: "Statistics",
      icon: <MdBarChart />,
      roles: ["manager", "owner"]
    },
    {
      path: "/auth/system/order",
      label: "Order Management",
      icon: <MdOutlineAssignment />,
      roles: ["admin", "manager", "owner"]
    },
    {
      path: "/auth/system/store/manage",
      label: "Store Management",
      icon: <MdStorefront />,
      roles: ["admin", "manager"]
    },
    {
      path: "/auth/system/withdraw",
      label: "Withdraw Money",
      icon: <GiTakeMyMoney />,
      roles: ["owner"]
    },
    {
      path: "/auth/system/bank-transfer", // Xem lịch sử nạp rút
      label: "BankTransfer History",
      icon: <GrTransaction />,
      roles: ["admin", "staff","owner"]
    },
    {
      path: "/auth/system/confirm",
      label: "Request",
      icon: <FiArrowUpCircle />,
      roles: ["admin", "owner","staff"]
    },
    {
      path: "/auth/system/transaction",
      label: "Transaction History",
      icon: <FaHistory />,
      roles: ["owner"]
    },
    { path: "#", label: "Logout", icon: <MdLogout />, roles: ["admin", "manager", "staff", "owner"],onClick: handleLogout }
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 shadow-lg flex flex-col">
      <div className="flex items-center p-4 border-b border-gray-200">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT35v2o-ze1u0CVpCejbwk1p54xvFhIaVElw&s"
          alt="Profile"
          className="rounded-full w-14 h-14 border-2 border-blue-500"
        />
        <div className="ml-4">
          <h3 className="text-black text-lg font-bold">{userInfo.name}</h3>
          <span className="text-green-400 text-sm">● Online</span>
        </div>
      </div>

      {/* <div className="p-4 flex-grow">
        <ul className="space-y-4">
          <li
            className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${isActive("/auth/system/e-wallet")
                ? "bg-white text-black"
                : "hover:text-black hover:bg-white hover:scale-105 transition-transform duration-200 ease-in-out"
              }`}
          >
            <FaWallet className={`text-white ${isActive("/auth/system/e-wallet") ? "text-black" : "hover:text-black"}`} />
            <Link to="/auth/system/e-wallet" className="text-sm font-medium">
              E-Wallet
            </Link>
          </li>
  
          {userInfo.role === 'admin' && (
            <>
              <li
                className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${isActive("/auth/system/account/admin")
                    ? "bg-white text-black"
                    : "hover:text-black hover:bg-white hover:scale-105 transition-transform duration-200 ease-in-out"
                  }`}
              >
                <MdManageAccounts className={`text-white ${isActive("/auth/system/account/admin") ? "text-black" : "hover:text-black"}`} />
                <Link
                  to="/auth/system/account/admin"
                  className="text-sm font-medium"
                >
                  Account Management
                </Link>
              </li>
            </>
          )}
  
          {(userInfo.role === 'admin' || userInfo.role === 'manager' || userInfo.role === 'store-owner') && (
            <>
              <li
                className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${isActive("/auth/system/voucher/admin")
                    ? "bg-white text-black"
                    : "hover:text-black hover:bg-white hover:scale-105 transition-transform duration-200 ease-in-out"
                  }`}
              >
                <GiTicket className={`text-white ${isActive("/auth/system/voucher/admin") ? "text-black" : "hover:text-black"}`} />
                <Link
                  to="/auth/system/voucher/admin"
                  className="text-sm font-medium"
                >
                  Voucher Management
                </Link>
              </li>
  
              <li
                className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${isActive("/auth/system/store/manage")
                    ? "bg-white text-black"
                    : "hover:text-black hover:bg-white hover:scale-105 transition-transform duration-200 ease-in-out"
                  }`}
              >
                <FaStore className={`text-white ${isActive("/auth/system/store/manage") ? "text-black" : "hover:text-black"}`} />
                <Link
                  to="/auth/system/store/manage"
                  className="text-sm font-medium"
                >
                  Store Management
                </Link>
              </li>
            </>
          )}
  
          {(userInfo.role === 'admin' || userInfo.role === 'manager' || userInfo.role === 'store-owner') && (
            <>
              <li
                className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${isActive("/auth/system/product/owner")
                    ? "bg-white text-black"
                    : "hover:text-black hover:bg-white hover:scale-105 transition-transform duration-200 ease-in-out"
                  }`}
              >
                <FaUtensils className={`text-white ${isActive("/auth/system/product/owner") ? "text-black" : "hover:text-black"}`} />
                <Link
                  to="/auth/system/product/owner"
                  className="text-sm font-medium"
                >
                  Product Management
                </Link>
              </li>
  
              <li
                className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${isActive("/auth/system/statistic")
                    ? "bg-white text-black"
                    : "hover:text-black hover:bg-white hover:scale-105 transition-transform duration-200 ease-in-out"
                  }`}
              >
                <FaChartBar className={`text-white ${isActive("/auth/system/statistic") ? "text-black" : "hover:text-black"}`} />
                <Link to="/auth/system/statistic" className="text-sm font-medium">
                  Statistics
                </Link>
              </li>
  
              <li
                className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${isActive("/auth/system/order")
                    ? "bg-white text-black"
                    : "hover:text-black hover:bg-white hover:scale-105 transition-transform duration-200 ease-in-out"
                  }`}
              >
                <MdOutlineFoodBank className={`text-white ${isActive("/auth/system/order") ? "text-black" : "hover:text-black"}`} />
                <Link to="/auth/system/order" className="text-sm font-medium">
                  Orders Management
                </Link>
              </li>
            </>
          )}
  
          {(userInfo.role === 'admin' || userInfo.role === 'staff' || userInfo.role === 'store-owner') && (
            <li
              className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${isActive("#")
                  ? "bg-white text-black"
                  : "hover:text-black hover:bg-white hover:scale-105 transition-transform duration-200 ease-in-out"
                }`}
            >
              <SiBitcoincash className={`text-white ${isActive("#") ? "text-black" : "hover:text-black"}`} />
              <Link to="#" className="text-sm font-medium">
                Withdraw Money
              </Link>
            </li>
          )}
  
          <li
            className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${isActive("#")
                ? "bg-white text-black"
                : "hover:text-black hover:bg-white hover:scale-105 transition-transform duration-200 ease-in-out"
              }`}
            onClick={handleLogout} // Thêm sự kiện onClick
          >
            <LuLogOut className={`text-white ${isActive("#") ? "text-black" : "hover:text-black"}`} />
            <span className="text-sm font-medium">Logout</span> {/* Thay đổi Link thành span */}
      {/* </li> */}
      <div className="flex-grow p-4">
        <ul className="space-y-2">
          {menuItems
            .filter(item => item.roles.includes(userInfo.role))
            .map((item, index) => (
              <li key={index}>
                {item.path === "#" ? (
                  <div
                    onClick={item.onClick}
                    className={`flex items-center space-x-3 p-3 rounded-lg text-gray-700 font-medium transition-all duration-300 cursor-pointer ${
                      isActive(item.path)
                        ? "bg-blue-100 text-blue-600 shadow-md"
                        : "hover:bg-gray-100 hover:text-blue-600"
                    }`}
                  >
                    <div
                      className={`text-2xl ${
                        isActive(item.path) ? "text-blue-600" : "text-gray-500"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <span>{item.label}</span>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 p-3 rounded-lg text-gray-700 font-medium transition-all duration-300 ${
                      isActive(item.path)
                        ? "bg-blue-100 text-blue-600 shadow-md"
                        : "hover:bg-gray-100 hover:text-blue-600"
                    }`}
                  >
                    <div
                      className={`text-2xl ${
                        isActive(item.path) ? "text-blue-600" : "text-gray-500"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <span>{item.label}</span>
                  </Link>
                )}
              </li>
            ))}
        </ul>
      </div>
      <div className="p-4 text-center text-gray-500 text-sm border-t border-gray-200">
        © SEP490-G90_FTOP
      </div>
    </div>
  );
};

export default SidebarComponent;
