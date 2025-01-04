import React, { useEffect, useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { MdError } from "react-icons/md";
import axios from "axios";
const Request = () => {
  const [banktransfer, setBankTransfers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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
    <div className="p-6 text-center">
      <table className="min-w-full table-auto bg-white border border-gray-200 shadow-md rounded-lg">
        <thead>
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
                className="border border-gray-200 px-4 py-2 text-center text-gray-600 font-semibold"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {banktransfer.length > 0 ? (
            currentItems.map((bank) => (
              <tr key={bank.id} className="hover:bg-gray-100 transition-all">
                {/* ID */}
                <td className="border border-gray-200 px-4 py-2">
                  {bank.transferId}
                </td>

                {/* Name */}
                <td className="border border-gray-200 px-4 py-2">
                  {bank.walletUserId}
                </td>

                <td className="border border-gray-200 px-4 py-2">
                  {bank.user.displayName ? (
                    bank.user.displayName
                  ) : (
                    <span className="text-red-600 font-semibold flex items-center text-center justify-center">
                      <span className="mr-1">
                        <MdError />
                      </span>{" "}
                      N/A
                    </span>
                  )}
                </td>

                <td className="border border-gray-200 px-4 py-2">
                  {bank.accountNumber ? (
                    bank.accountNumber
                  ) : (
                    <span className="text-red-600 font-semibold flex items-center text-center justify-center">
                      <span className="mr-1">
                        <MdError />
                      </span>{" "}
                      N/A
                    </span>
                  )}
                </td>

                <td className="border border-gray-200 px-4 py-2">
                  {bank.bankName ? (
                    bank.bankName
                  ) : (
                    <span className="text-red-600 font-semibold flex items-center text-center justify-center">
                      <span className="mr-1">
                        <MdError />
                      </span>{" "}
                      N/A
                    </span>
                  )}
                </td>

                <td className="border border-gray-200 px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      bank.status
                        ? "bg-green-100 text-green-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {bank.status ? "topup" : "withdraw"}
                  </span>
                </td>

                {/* Wallet Balance */}
                <td className="border border-gray-200 px-4 py-2">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(bank.transferAmount)}
                </td>

                <td className="border border-gray-200 px-4 py-2">
                  {bank.transferDescription ? (
                    bank.transferDescription
                  ) : (
                    <span className="text-red-600 font-semibold flex items-center text-center justify-center">
                      <span className="mr-1">
                        <MdError />
                      </span>{" "}
                      N/A
                    </span>
                  )}
                </td>

                <td className="border border-gray-200 px-4 py-2">
                  {new Date(bank.transferDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>

                <td className="border border-gray-200 px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      bank.status
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {bank.status ? "success" : "failed"}
                  </span>
                </td>

                {/* Actions */}
                <td className="border border-gray-200 px-4 py-2 flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-200 rounded">
                    <PencilSquareIcon className="h-5 w-5 text-gray-600" />
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
                No banktransfers found.
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
    </div>
  );
};

export default Request;
