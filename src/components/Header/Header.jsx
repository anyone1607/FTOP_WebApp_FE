import React, { useState } from "react";
import { BellIcon, UserCircleIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo và Tên trang */}
      <div className="flex items-center space-x-2 cursor-pointer">
        <img
          src="https://via.placeholder.com/40" // Thay bằng logo
          alt="Logo"
          className="w-10 h-10 rounded-full"
        />
        <a href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
          DASHMIN Admin
        </a>
      </div>

      {/* Thanh tìm kiếm */}
      <div className="relative w-1/3">
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
        />
        <svg
          className="absolute right-3 top-2.5 w-5 h-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35m2.85-6.65a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Menu điều hướng */}
      <nav className="flex space-x-6 text-gray-600">
        <a href="/" className="hover:text-blue-500 transition-colors">
          Dashboard
        </a>
        <a href="/" className="hover:text-blue-500 transition-colors">
          Reports
        </a>
        <a href="/" className="hover:text-blue-500 transition-colors">
          Settings
        </a>
      </nav>

      {/* Thông báo và User Menu */}
      <div className="flex items-center space-x-6">
        {/* Biểu tượng thông báo */}
        <button className="relative p-2 rounded-full hover:bg-gray-200 transition">
          <BellIcon className="h-6 w-6 text-gray-600" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </button>

        {/* Dropdown User */}
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center space-x-2 focus:outline-none hover:bg-gray-200 rounded-full px-2 py-1 transition"
          >
            <UserCircleIcon className="h-8 w-8 text-gray-600" />
            <span className="text-gray-700 font-medium">Jhon Doe</span>
            <ChevronDownIcon className="h-4 w-4 text-gray-600" />
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2">
              <a href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Profile
              </a>
              <a href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Settings
              </a>
              <a href="/" className="block px-4 py-2 text-red-600 hover:bg-red-100">
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
