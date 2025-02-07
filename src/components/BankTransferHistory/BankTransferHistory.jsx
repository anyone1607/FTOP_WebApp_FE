import axios from "axios";
import React, { useState, useEffect } from "react";
import { MdError } from "react-icons/md";

const BankTransferHistory = () => {
  const [banktransfer, setBankTransfers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rejectedTransactions, setRejectedTransactions] = useState([]);

  const fetchBanktransfer = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/payos/transactions"
      );
      setBankTransfers(response.data);
    } catch (error) {
      console.error("Error fetching banktransfer:", error);
    }
  };

  useEffect(() => {
    fetchBanktransfer();
  }, []);

  const updateTransactionStatus = async (transferId, status) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/payos/update-transaction-status",
        {
          transferId,
          status,
        }
      );

      console.log("Update status response:", response.data);
      fetchBanktransfer();
    } catch (error) {
      console.error("Error updating transaction status:", error);
    }
  };

  const handleConfirm = (transferId) => {
    updateTransactionStatus(transferId, true);
  };

  const handleReject = (transferId) => {
    updateTransactionStatus(transferId, false);
    setRejectedTransactions((prev) => {
      const updated = [...prev, transferId];
      localStorage.setItem("rejectedTransactions", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    const savedRejected = localStorage.getItem("rejectedTransactions");
    if (savedRejected) {
      setRejectedTransactions(JSON.parse(savedRejected));
    }
    fetchBanktransfer();
  }, []);

  const itemsPerPage = 9;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    banktransfer.length > 0
      ? banktransfer.slice(indexOfFirstItem, indexOfLastItem)
      : [];
  const totalPages =
    banktransfer.length > 0 ? Math.ceil(banktransfer.length / itemsPerPage) : 0;

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
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              {[
                "TransferID",
                "WalletID",
                "Wallet User Name",
                "Account Number",
                "Bank Name",
                "Transfer Type",
                "Transfer Amount",
                "Transfer Description",
                "Transfer Date",
                "Status",
                "Actions",
              ].map((heading, index) => (
                <th
                  key={index}
                  className="px-4 py-4 text-center text-sm font-semibold text-gray-600 border-b border-gray-200"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {banktransfer.length > 0 ? (
              currentItems.map((bank, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm text-gray-700">
                    {bank.transferId}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    {bank.walletUserId}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    {bank.user.displayName ? (
                      bank.user.displayName
                    ) : (
                      <span className="flex items-center justify-center text-red-600 font-semibold">
                        <MdError className="mr-1" /> N/A
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    {bank.accountNumber ? (
                      bank.accountNumber
                    ) : (
                      <span className="flex items-center justify-center text-red-600 font-semibold">
                        <MdError className="mr-1" /> N/A
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    {bank.bankName ? (
                      bank.bankName
                    ) : (
                      <span className="flex items-center justify-center text-red-600 font-semibold">
                        <MdError className="mr-1" /> N/A
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    <span
                      className={`px-2 py-2 text-xs rounded-full ${
                        bank.transferType
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {bank.transferType ? "topup" : "withdraw"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(bank.transferAmount)}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    {bank.transferDescription ? (
                      bank.transferDescription
                    ) : (
                      <span className="flex items-center justify-center text-red-600 font-semibold">
                        <MdError className="mr-1" /> N/A
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    {new Date(bank.transferDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    <span
                      className={`px-2 py-2 text-xs rounded-full ${
                        bank.status
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {bank.status ? "success" : "failed"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    {!bank.status &&
                      !rejectedTransactions.includes(bank.transferId) && (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleConfirm(bank.transferId)}
                            className="px-2 py-2 text-sm text-white bg-green-500 hover:bg-green-600 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                            aria-label="Confirm Transfer"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => handleReject(bank.transferId)}
                            className="px-2 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
                            aria-label="Reject Transfer"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="px-4 py-4 text-center text-sm text-gray-700"
                  colSpan="11"
                >
                  No banktransfers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Phân trang */}
      <div className="flex justify-center mt-4">
        <ul className="inline-flex items-center space-x-2">
          {getPaginationGroup().map((page, index) => (
            <li key={index}>
              {page === "..." ? (
                <span className="px-4 py-2 text-gray-500">...</span>
              ) : (
                <button
                  onClick={() => paginate(page)}
                  className={`px-4 py-2 border rounded text-sm ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-600 hover:bg-blue-100"
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

export default BankTransferHistory;
