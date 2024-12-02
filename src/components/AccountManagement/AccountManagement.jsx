import React, { useState, useEffect } from "react";
import axios from "axios";

const AccountManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [bankTransfers, setBankTransfers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
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

  const searchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/user/search", {
        params: {
          query: searchQuery,
          role: selectedRole,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error searching users:", error);
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

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.displayName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole ? user.role === selectedRole : true;

    return matchesSearch && matchesRole;
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    searchUsers();
  }, [searchQuery, selectedRole]);

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
    <h1 className="text-2xl font-bold mb-4">Account Management</h1>

    {/* Thanh tìm kiếm và bộ lọc */}
    <div className="flex justify-between mb-6 space-x-4">
        <input
          type="text"
          placeholder="Search by name or email"
          className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
          <option value="manager">Manager</option>
          <option value="store-owner">Store Owner</option>
          <option value="user">User</option>
        </select>
      </div>

      <table className="min-w-full table-auto border-collapse border border-gray-200 shadow-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2">ID</th>
            <th className="border border-gray-200 px-4 py-2">Name</th>
            <th className="border border-gray-200 px-4 py-2">Role</th>
            <th className="border border-gray-200 px-4 py-2">Wallet Balance</th>
            <th className="border border-gray-200 px-4 py-2">Status</th>
            <th className="border border-gray-200 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            currentItems.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="border border-gray-200 px-4 py-2">{user.id}</td>
                <td className="border border-gray-200 px-4 py-2 flex items-center">
                  <div className="flex-shrink-0">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt="Avatar"
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-sm text-gray-500">No Avatar</span>
                    )}
                  </div>
                  <div className="ml-4 overflow-hidden">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user.email}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {user.displayName}
                    </p>
                  </div>
                </td>
                <td className="border border-gray-200 px-4 py-2">{user.role}</td>
                <td className="border border-gray-200 px-4 py-2">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(user.walletBalance)}
                </td>
                <td
                  className={`border border-gray-200 px-4 py-2 ${
                    user.isActive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {user.isActive ? "Active" : "Inactive"}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
      {showPopup && selectedUser && (
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
      )}
    </div>
  );
};

export default AccountManagement;




