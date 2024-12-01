// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AccountManagement = () => {
//   const [users, setUsers] = useState([]);
//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/user/findUser');
//       setUsers(response.data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   return (
//     <div className="p-6 text-center">
//       <h1 className="text-2xl font-bold mb-4">Account Management</h1>
//       <table className="min-w-full table-auto border-collapse border border-gray-200">
//         <thead>
//           <tr>
//             <th className="border border-gray-200 px-4 py-2">ID</th>
//             <th className="border border-gray-200 px-4 py-2">Email</th>
//             <th className="border border-gray-200 px-4 py-2">Display Name</th>
//             <th className="border border-gray-200 px-4 py-2">Role</th>
//             <th className="border border-gray-200 px-4 py-2">Wallet Balance</th>
//             <th className="border border-gray-200 px-4 py-2">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.length > 0 ? (
//             users.map((user) => (
//               <tr key={user.id}>
//                 <td className="border border-gray-200 px-4 py-2">{user.id}</td>
//                 <td className="border border-gray-200 px-4 py-2">{user.email}</td>
//                 <td className="border border-gray-200 px-4 py-2">{user.displayName}</td>
//                 <td className="border border-gray-200 px-4 py-2">{user.role}</td>
//                 <td className="border border-gray-200 px-4 py-2">$ {user.walletBalance.toFixed(2)}</td>
//                 <td className={`border border-gray-200 px-4 py-2 ${user.isActive ? 'text-green-600' : 'text-red-600'}`}>
//                   {user.isActive ? 'Active' : 'Inactive'}
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td className="border border-gray-200 px-4 py-2 text-center" colSpan="6">
//                 No users found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AccountManagement;

import React, { useState, useEffect } from "react";
import axios from "axios";

const AccountManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [bankTransfers, setBankTransfers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

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

  return (
    <div className="p-6 text-center">
    <h1 className="text-2xl font-bold mb-4">Account Management</h1>

    {/* Thanh tìm kiếm và bộ lọc */}
    <div className="flex justify-between mb-4">
      <input
        type="text"
        placeholder="Search by name or email"
        className="border border-gray-300 p-2 rounded w-1/2"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <select
        className="border border-gray-300 p-2 rounded"
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value)}
      >
        <option value="">All Roles</option>
        <option value="admin">Admin</option>
        <option value="staff">Staff</option>
        <option value="manager">Manager</option>
        <option value="store-owner">Store Owner</option>
      </select>
    </div>
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 px-4 py-2">ID</th>
            <th className="border border-gray-200 px-4 py-2">Email</th>
            <th className="border border-gray-200 px-4 py-2">Display Name</th>
            <th className="border border-gray-200 px-4 py-2">Role</th>
            <th className="border border-gray-200 px-4 py-2">Wallet Balance</th>
            <th className="border border-gray-200 px-4 py-2">Status</th>
            <th className="border border-gray-200 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td className="border border-gray-200 px-4 py-2">{user.id}</td>
                <td className="border border-gray-200 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {user.displayName}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {user.role}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  $ {user.walletBalance.toFixed(2)}
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
      </table>

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
