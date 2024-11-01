import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  FaWallet,
  FaChartBar,
  FaStore,
  FaUtensils,
  // FaGem,
} from "react-icons/fa";

import { MdOutlineFoodBank, MdManageAccounts } from "react-icons/md";

import { AiOutlineSetting } from "react-icons/ai";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { GiTicket } from "react-icons/gi";
import { VscFeedback } from "react-icons/vsc";
const SidebarComponent = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  // const [isElementsOpen, setIsElementsOpen] = useState(false);
  // const toggleElementsDropdown = () => {
  //   setIsElementsOpen(!isElementsOpen);
  // };

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col">
      <div className="flex items-center p-4 bg-gray-800">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT35v2o-ze1u0CVpCejbwk1p54xvFhIaVElw&s"
          alt="Profile"
          className="rounded-full w-12 h-12"
        />
        <div className="ml-4">
          <h3 className="text-white text-lg font-bold">LAI VAN CHUNG</h3>
          <span className="text-green-400 text-sm">● Online</span>
        </div>
      </div>

      <div className="p-4 flex-grow">
        <ul className="space-y-4">
          <li
            className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${
              isActive("/auth/system/e-wallet")
                ? "bg-blue-500"
                : "hover:bg-gray-700 hover:scale-105 transition-transform duration-200 ease-in-out"
            }`}
          >
            <FaWallet color="lightgreen" />
            <Link to="/auth/system/e-wallet">E-Wallet</Link>
          </li>

          <li
            className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${
              isActive("/auth/system/account/admin")
                ? "bg-blue-500"
                : "hover:bg-gray-700 hover:scale-105 transition-transform duration-200 ease-in-out"
            }`}
          >
            <MdManageAccounts color="orange" />
            <Link to="/auth/system/account/admin">Account Management</Link>
          </li>

          {/* <li className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${isElementsOpen ? 'bg-blue-600' : 'hover:bg-gray-700 hover:scale-105 transition-transform duration-200 ease-in-out'}`}>
            <FaGem />
            <div onClick={toggleElementsDropdown} className="flex items-center space-x-2 w-full">
              <span>Elements</span>
              {isElementsOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
          </li>

          {isElementsOpen && (
            <ul
              className={`ml-6 mt-2 space-y-2 overflow-hidden transition-all duration-300 ease-in-out ${
                isElementsOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
              style={{
                transition:
                  "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out",
              }}
            >
              <li
                className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${
                  isActive("/elements/general")
                    ? "bg-blue-600"
                    : "hover:bg-gray-700 hover:scale-105 transition-transform duration-200 ease-in-out"
                }`}
              >
                <Link to="/elements/general">General Elements</Link>
              </li>
              <li
                className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${
                  isActive("/elements/media")
                    ? "bg-blue-600"
                    : "hover:bg-gray-700 hover:scale-105 transition-transform duration-200 ease-in-out "
                }`}
              >
                <Link to="/elements/media">Media Gallery</Link>
              </li>
              <li
                className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${
                  isActive("/elements/icons")
                    ? "bg-blue-600"
                    : "hover:bg-gray-700 hover:scale-105 transition-transform duration-200 ease-in-out"
                }`}
              >
                <Link to="/elements/icons">Icons</Link>
              </li>
              <li
                className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${
                  isActive("/elements/invoice")
                    ? "bg-blue-600"
                    : "hover:bg-gray-700 hover:scale-105 transition-transform duration-200 ease-in-out"
                }`}
              >
                <Link to="/elements/invoice">Invoice</Link>
              </li>
            </ul>
          )} */}

          <li
            className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${
              isActive("/auth/system/product/owner")
                ? "bg-blue-500"
                : "hover:bg-gray-700 hover:scale-105 transition-transform duration-200 ease-in-out"
            }`}
          >
            <FaUtensils color="lightcoral" />
            <Link to="/auth/system/product/owner">Product Management</Link>
          </li>

          <li
            className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${
              isActive("/auth/system/voucher/admin")
                ? "bg-blue-500"
                : "hover:bg-gray-700 hover:scale-105 transition-transform duration-200 ease-in-out"
            }`}
          >
            <GiTicket color="gold" />
            <Link to="/auth/system/voucher/admin">Voucher Management</Link>
          </li>

          <li
            className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${
              isActive("/auth/system/statistic")
                ? "bg-blue-500"
                : "hover:bg-gray-700 hover:scale-105 transition-transform duration-200 ease-in-out"
            }`}
          >
            <FaChartBar color="lightblue" />
            <Link to="/auth/system/statistic">Statistics</Link>
          </li>

          <li
            className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${
              isActive("/auth/system/order")
                ? "bg-blue-500"
                : "hover:bg-gray-700 hover:scale-105 transition-transform duration-200 ease-in-out"
            }`}
          >
            <MdOutlineFoodBank color="darkorange" />
            <Link to="/auth/system/order">Orders Management</Link>
          </li>

          <li
            className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${
              isActive("/auth/system/store/manage")
                ? "bg-blue-500"
                : "hover:bg-gray-700 hover:scale-105 transition-transform duration-200 ease-in-out"
            }`}
          >
            <FaStore color="deepskyblue" />
            <Link to="/auth/system/store/manage">Store Management</Link>
          </li>

          <li
            className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${
              isActive("/auth/system/feedback/manage")
                ? "bg-blue-500"
                : "hover:bg-gray-700 hover:scale-105 transition-transform duration-200 ease-in-out"
            }`}
          >
            <VscFeedback color="plum" />
            <Link to="/auth/system/feedback/manage">Feedback</Link>
          </li>

          {/* <li
            className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${
              isActive("/charts") ? "bg-blue-600" : "hover:bg-gray-700 hover:scale-105 transition-transform duration-200 ease-in-out"
            }`}
          >
            <FaChartBar />
            <Link to="/charts">Charts</Link>
          </li> */}

          <li
            className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${
              isActive("/settings")
                ? "bg-blue-500"
                : "hover:bg-gray-700 hover:scale-105 transition-transform duration-200 ease-in-out"
            }`}
          >
            <AiOutlineSetting color="lightgray" />
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarComponent;
