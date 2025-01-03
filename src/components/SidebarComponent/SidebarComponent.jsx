import React from "react";
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

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 shadow-lg flex flex-col">
      <div className="flex items-center p-4 border-b border-gray-200">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT35v2o-ze1u0CVpCejbwk1p54xvFhIaVElw&s"
          alt="Profile"
          className="rounded-full w-14 h-14 border-2 border-blue-500"
        />
        <div className="ml-4">
          <h3 className="text-gray-800 text-lg font-bold">Jhon Doe</h3>
          <span className="text-green-500 text-sm">● Admin</span>
        </div>
      </div>
      <div className="flex-grow p-4">
        <ul className="space-y-2">
          {[
            {
              path: "/auth/system/e-wallet",
              label: "E-Wallet",
              icon: <GiWallet />,
            },
            {
              path: "/auth/system/account/admin",
              label: "Account Management",
              icon: <MdSupervisorAccount />,
            },
            {
              path: "/auth/system/product/owner",
              label: "Product Management",
              icon: <MdProductionQuantityLimits />,
            },
            {
              path: "/auth/system/voucher/admin",
              label: "Voucher Management",
              icon: <VscTag />,
            },
            {
              path: "/auth/system/statistic",
              label: "Statistics",
              icon: <MdBarChart />,
            },
            {
              path: "/auth/system/order",
              label: "Order Management",
              icon: <MdOutlineAssignment />,
            },
            {
              path: "/auth/system/store/manage",
              label: "Store Management",
              icon: <MdStorefront />,
            },
            {
              path: "/auth/system/withdraw",
              label: "Withdraw Money",
              icon: <GiTakeMyMoney />,
            },
            {
              path: "/auth/system/bank-transfer", // Xem lịch sử nạp rút
              label: "BankTransfer History",
              icon: <GrTransaction />,
            },
            {
              path: "/auth/system/confirm", // Yêu cầu rút tiền giữa cửa hàng với admin (transaction)
              label: "Request Withdraw",
              icon: <FiArrowUpCircle />,
            },
            {
              path: "/auth/system/transaction", // Xem lịch sử giao dịch cửa hàng với người mua hàng (order)
              label: "Transaction History",
              icon: <FaHistory />,
            },
            { path: "#", label: "Logout", icon: <MdLogout /> },
          ].map((item, index) => (
            <li key={index}>
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
