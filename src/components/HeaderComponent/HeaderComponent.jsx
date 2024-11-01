import React, { useState, useEffect, useRef } from "react";
import { FaBell, FaQuestionCircle } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { IoIosMail } from "react-icons/io";

const HeaderComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-gray-900 text-white p-3 flex items-center justify-between rounded-sm sticky top-0 z-20">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">
          <span className="text-white">FTOP SYSTEM</span>
        </h1>
      </div>
      <div className="relative flex items-center space-x-4">
        <div className="relative">
          <IoIosMail className="text-white w-6 h-6 cursor-pointer" />
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            2
          </span>
        </div>
        <FaQuestionCircle className="text-white w-6 h-6 cursor-pointer" />
        <div className="relative">
          <FaBell className="text-white w-6 h-6 cursor-pointer" />
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            3
          </span>
        </div>

        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center bg-gray-600 px-4 py-1 rounded-md cursor-pointer"
            onClick={toggleDropdown}
          >
            <img
              className="w-10 h-10 rounded-full mr-2"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT35v2o-ze1u0CVpCejbwk1p54xvFhIaVElw&s"
              alt="Avatar"
            />
            <span className="ml-2">&#9662;</span>
          </div>
          {isOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg z-50">
              <li className="px-4 py-2 hover:bg-gray-800 hover:text-white cursor-pointer">
                My Profile
              </li>
              <li className="px-4 py-2 hover:bg-gray-800 hover:text-white cursor-pointer">
                Settings
              </li>
              <li className="px-4 py-2 hover:bg-gray-800 hover:text-white cursor-pointer">
                Help
              </li>
              <li className="flex justify-start items-center px-4 py-2 hover:bg-gray-800 hover:text-white cursor-pointer">
                <span>Logout</span>
                <LuLogOut className="ml-2" />
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;

