import React, { useState, useEffect } from "react";
import { PencilSquareIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useLocation } from 'react-router-dom';
import axios from "axios";
const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [userId, setUserId] = useState(null);
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

  const itemsPerPage = 9;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    transactions.length > 0
      ? transactions.slice(indexOfFirstItem, indexOfLastItem)
      : [];

  const totalPages =
    transactions.length > 0 ? Math.ceil(transactions.length / itemsPerPage) : 0;

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
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Transaction ID</th>
            <th className="py-2 px-4 border">Transfer User</th>
            <th className="py-2 px-4 border">Receive User</th>
            <th className="py-2 px-4 border">Date</th>
            <th className="py-2 px-4 border">Amount</th>
            <th className="py-2 px-4 border">Description</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((transaction) => (
            <tr key={transaction.transactionId} className="hover:bg-gray-100">
              <td className="py-2 px-4 border text-center">
                {transaction.transactionId}
              </td>
              <td className="py-2 px-4 border text-center">
                {transaction.transferUser.displayName}
              </td>
              <td className="py-2 px-4 border text-center">
                {transaction.receiveUser.displayName}
              </td>
              <td className="py-2 px-4 border text-center">
                {new Date(transaction.transactionDate).toLocaleString()}
              </td>
              <td className="py-2 px-4 border text-center">
                {transaction.transactionAmount.toLocaleString()} đ
              </td>
              <td className="py-2 px-4 border text-center">
                {transaction.transactionDescription}
              </td>
              <td className="py-2 px-4 border text-center">
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    transaction.status
                      ? "bg-green-200 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {transaction.status ? "Success" : "Pending"}
                </span>
              </td>
              <td className="border border-gray-200 px-4 py-2 flex items-center space-x-2">
               
              </td>
            </tr>
          ))}
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
    </div>
  );
};

export default Transaction;
