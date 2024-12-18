import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  PencilSquareIcon,
  EyeIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
const AccountManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [bankTransfers, setBankTransfers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/user/findUser"
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchBankTransfers = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/banktransfer/${userId}`
      );
      const transfers = Array.isArray(response.data)
        ? response.data
        : [response.data];
      setBankTransfers(transfers);
    } catch (error) {
      console.error("Error fetching bank transfers:", error);
    }
  };

  const toggleStatus = (id) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, status: !user.status } : user
    );
    setUsers(updatedUsers);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    fetchBankTransfers(user.id);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setBankTransfers([]);
    setSelectedUser(null);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    users.length > 0 ? users.slice(indexOfFirstItem, indexOfLastItem) : [];

  const totalPages =
    users.length > 0 ? Math.ceil(users.length / itemsPerPage) : 0;

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
      {/* <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 px-4 py-2">ID</th>
            <th className="border border-gray-200 px-4 py-2">Name</th>
            <th className="border border-gray-200 px-4 py-2">Role</th>
            <th className="border border-gray-200 px-4 py-2">Wallet Balance</th>
            <th className="border border-gray-200 px-4 py-2">Status</th>
            <th className="border border-gray-200 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            currentItems.map((user) => (
              <tr key={user.id}>
                <td className="border border-gray-200 px-4 py-2">{user.id}</td>
                <ul class="p-6 divide-y divide-slate-200">
                  <li class="flex items-center py-4 first:pt-0 last:pb-0">
                    <div class="flex-shrink-0">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt="Avatar"
                          class="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <span class="text-sm text-gray-500">No Avatar</span>
                      )}
                    </div>
                    <div class="ml-4 overflow-hidden">
                      <p class="text-sm font-medium text-gray-900 truncate">
                        {user.email}
                      </p>
                      <p class="text-sm text-gray-500 truncate">
                        {user.displayName}
                      </p>
                    </div>
                  </li>
                </ul>
                <td className="border border-gray-200 px-4 py-2">
                  {user.role}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(user.walletBalance)}
                </td>
                <td
                  className={`border border-gray-200 px-4 py-2 ${
                    user.isActive
                      ? "text-green-600 animate-blink"
                      : "text-red-600 animate-blink"
                  }`}
                >
                  {user.isActive ? "Active" : "Inactive"}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => handleUserClick(user)}
                  >
                    View Bank Transfers
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                className="border border-gray-200 px-4 py-2 text-center"
                colSpan="7"
              >
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table> */}

      <table className="min-w-full table-auto bg-white border border-gray-200 shadow-md rounded-lg">
        <thead>
          <tr>
            {[
              "ID",
              "Email",
              "Name",
              "Role",
              "Wallet Balance",
              "Status",
              "Actions",
            ].map((heading, index) => (
              <th
                key={index}
                className="border border-gray-200 px-4 py-2 text-center text-gray-600 font-semibold"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            currentItems.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100 transition-all">
                {/* ID */}
                <td className="border border-gray-200 px-4 py-2">{user.id}</td>

                {/* Email */}
                <td className="border border-gray-200 px-4 py-2">
                  <div className="flex items-center space-x-4">
                    <img
                      src={user.avatar}
                      alt="Null"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-gray-900 font-medium">{user.name}</p>
                      <p className="text-gray-500 text-sm">{user.email}</p>
                    </div>
                  </div>
                </td>
                {/* Name */}
                <td className="border border-gray-200 px-4 py-2">
                  {user.displayName}
                </td>

                {/* Role */}
                <td className="border border-gray-200 px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      user.role === "admin" ||
                      user.role === "manager" ||
                      user.role === "staff"
                        ? "bg-purple-100 text-purple-600"
                        : user.role === "owner" || user.role === "customer"
                        ? "bg-green-100 text-green-600"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                {/* Wallet Balance */}
                <td className="border border-gray-200 px-4 py-2">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(user.walletBalance)}
                </td>

                {/* Status */}
                <td
                  className={`border border-gray-200 px-4 py-2 ${
                    user.status
                      ? "text-green-600 font-medium"
                      : "text-red-600 font-medium"
                  }`}
                >
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={user.status}
                      onChange={() => toggleStatus(user.id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-500 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"></div>
                  </label>
                </td>

                {/* Actions */}
                <td className="border border-gray-200 px-4 py-2 flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-200 rounded">
                    <PencilSquareIcon className="h-5 w-5 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleUserClick(user)}
                    className="p-2 hover:bg-gray-200 rounded"
                  >
                    <EyeIcon className="h-5 w-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-red-100 rounded">
                    <TrashIcon className="h-5 w-5 text-red-600" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                className="border border-gray-200 px-4 py-2 text-center"
                colSpan="6"
              >
                No users found.
              </td>
            </tr>
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
                    currentPage === page ? "bg-blue-500 text-white" : "bg-white"
                  }`}
                >
                  {page}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Popup Modal */}
      {/* {showPopup && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">
              Bank Transfers for {selectedUser.displayName}
            </h2>
            {bankTransfers.length > 0 ? (
              <table className="min-w-full table-auto border-collapse border border-gray-200">
                <thead>
                  <tr>
                    <th className="border border-gray-200 px-4 py-2">
                      Account Number
                    </th>
                    <th className="border border-gray-200 px-4 py-2">
                      Bank Name
                    </th>
                    <th className="border border-gray-200 px-4 py-2">
                      Transfer Amount
                    </th>
                    <th className="border border-gray-200 px-4 py-2">
                      Transfer Date
                    </th>
                    <th className="border border-gray-200 px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bankTransfers.map((transfer) => (
                    <tr key={transfer.transferId}>
                      <td className="border border-gray-200 px-4 py-2">
                        {transfer.accountNumber}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {transfer.bankName}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {transfer.transferAmount
                          ? `$ ${parseFloat(transfer.transferAmount).toFixed(
                              2
                            )}`
                          : ""}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {transfer.transferDate
                          ? new Date(transfer.transferDate).toLocaleDateString()
                          : ""}
                      </td>
                      <td
                        className={`border border-gray-200 px-4 py-2 ${
                          transfer.status === true
                            ? "text-green-600"
                            : transfer.status === false
                            ? "text-red-600"
                            : ""
                        }`}
                      >
                        {transfer.status === true
                          ? "Completed"
                          : transfer.status === false
                          ? "Pending"
                          : ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No bank transfers found for this user.</p>
            )}
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
              onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </div>
      )} */}

      {showPopup && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-3xl transform scale-95 animate-fadeIn">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Bank Transfers for {selectedUser.displayName}
              </h2>
              <button
                onClick={handleClosePopup}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                ✖
              </button>
            </div>

            {/* Content */}
            {bankTransfers.length > 1 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded-lg shadow-sm">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
                      <th className="py-3 px-4 text-left">Account Number</th>
                      <th className="py-3 px-4 text-left">Bank Name</th>
                      <th className="py-3 px-4 text-left">Transfer Amount</th>
                      <th className="py-3 px-4 text-left">Transfer Date</th>
                      <th className="py-3 px-4 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                    {bankTransfers.map((transfer) => (
                      <tr
                        key={transfer.transferId}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 px-4 border-b">
                          {transfer.accountNumber}
                        </td>
                        <td className="py-3 px-4 border-b">
                          {transfer.bankName}
                        </td>
                        <td className="py-3 px-4 border-b">
                          {transfer.transferAmount
                            ? `$ ${parseFloat(transfer.transferAmount).toFixed(
                                2
                              )}`
                            : ""}
                        </td>
                        <td className="py-3 px-4 border-b">
                          {transfer.transferDate
                            ? new Date(
                                transfer.transferDate
                              ).toLocaleDateString()
                            : ""}
                        </td>
                        <td
                          className={`py-3 px-4 border-b font-medium ${
                            transfer.status === true
                              ? "text-green-600"
                              : transfer.status === false
                              ? "text-red-600"
                              : ""
                          }`}
                        >
                          {transfer.status === true
                            ? "Completed"
                            : transfer.status === false
                            ? "Pending"
                            : ""}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600 text-center">
                No bank transfers found for this user.
              </p>
            )}

            {/* Footer */}
            <div className="flex justify-end mt-6">
              <button
                onClick={handleClosePopup}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountManagement;
