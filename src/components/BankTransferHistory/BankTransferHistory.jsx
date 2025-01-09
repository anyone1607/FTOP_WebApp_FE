// import React, { useEffect, useState } from "react";
// import { PencilSquareIcon } from "@heroicons/react/24/outline";
// import { MdError } from "react-icons/md";
// import axios from "axios";
// const BankTransferHistory = () => {
//   const [banktransfer, setBankTransfers] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showActions, setShowActions] = useState(false);

//   const handleClick = () => {
//     setShowActions(!showActions);
//   };

//   const handleConfirm = () => {
//     console.log("Đã xác nhận!");
//     setShowActions(false);
//   };

//   const handleReject = () => {
//     console.log("Đã huỷ!");
//     setShowActions(false);
//   };

//   const fetchBanktransfer = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8000/api/payos/transactions"
//       );
//       setBankTransfers(response.data);
//     } catch (error) {
//       console.error("Error fetching banktransfer:", error);
//     }
//   };

//   useEffect(() => {
//     fetchBanktransfer();
//   }, []);

//   const itemsPerPage = 9;

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems =
//     banktransfer.length > 0
//       ? banktransfer.slice(indexOfFirstItem, indexOfLastItem)
//       : [];

//   const totalPages =
//     banktransfer.length > 0 ? Math.ceil(banktransfer.length / itemsPerPage) : 0;

//   const getPaginationGroup = () => {
//     let startPage = 1;
//     let endPage = totalPages;
//     const range = 2;
//     if (totalPages > 5) {
//       if (currentPage <= range) {
//         startPage = 1;
//         endPage = 5;
//       } else if (currentPage + range >= totalPages) {
//         startPage = totalPages - 4;
//         endPage = totalPages;
//       } else {
//         startPage = currentPage - range;
//         endPage = currentPage + range;
//       }
//     }
//     let pages = [];
//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(i);
//     }
//     if (startPage > 1) {
//       pages.unshift(1, "...");
//     }
//     if (endPage < totalPages) {
//       pages.push("...", totalPages);
//     }
//     return pages;
//   };

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="p-6 text-center">
//       <table className="min-w-full table-auto bg-white border border-gray-200 shadow-md rounded-lg">
//         <thead>
//           <tr>
//             {[
//               "TransferID",
//               "WalletID",
//               "Wallet User Name",
//               "Account Number",
//               "Bank Name",
//               "Transfer Type",
//               "Transfer Amount",
//               "Transfer Description",
//               "Transfer Date",
//               "Status",
//               "Actions",
//             ].map((heading, index) => (
//               <th
//                 key={index}
//                 className="border border-gray-200 px-4 py-2 text-center text-gray-600 font-semibold"
//               >
//                 {heading}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {banktransfer.length > 0 ? (
//             currentItems.map((bank, index) => (
//               // key = {bank.id} --> key = {index}
//               <tr key={index} className="hover:bg-gray-100 transition-all">
//                 {/* ID */}
//                 <td className="border border-gray-200 px-4 py-2">
//                   {bank.transferId}
//                 </td>

//                 {/* Name */}
//                 <td className="border border-gray-200 px-4 py-2">
//                   {bank.walletUserId}
//                 </td>

//                 <td className="border border-gray-200 px-4 py-2">
//                   {bank.user.displayName ? (
//                     bank.user.displayName
//                   ) : (
//                     <span className="text-red-600 font-semibold flex items-center text-center justify-center">
//                       <span className="mr-1">
//                         <MdError />
//                       </span>{" "}
//                       N/A
//                     </span>
//                   )}
//                 </td>

//                 <td className="border border-gray-200 px-4 py-2">
//                   {bank.accountNumber ? (
//                     bank.accountNumber
//                   ) : (
//                     <span className="text-red-600 font-semibold flex items-center text-center justify-center">
//                       <span className="mr-1">
//                         <MdError />
//                       </span>{" "}
//                       N/A
//                     </span>
//                   )}
//                 </td>

//                 <td className="border border-gray-200 px-4 py-2">
//                   {bank.bankName ? (
//                     bank.bankName
//                   ) : (
//                     <span className="text-red-600 font-semibold flex items-center text-center justify-center">
//                       <span className="mr-1">
//                         <MdError />
//                       </span>{" "}
//                       N/A
//                     </span>
//                   )}
//                 </td>

//                 <td className="border border-gray-200 px-4 py-2">
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs ${
//                       bank.transferType
//                         ? "bg-green-100 text-green-600"
//                         : "bg-blue-100 text-blue-600"
//                     }`}
//                   >
//                     {bank.transferType ? "topup" : "withdraw"}
//                   </span>
//                 </td>

//                 {/* Wallet Balance */}
//                 <td className="border border-gray-200 px-4 py-2">
//                   {new Intl.NumberFormat("vi-VN", {
//                     style: "currency",
//                     currency: "VND",
//                   }).format(bank.transferAmount)}
//                 </td>

//                 <td className="border border-gray-200 px-4 py-2">
//                   {bank.transferDescription ? (
//                     bank.transferDescription
//                   ) : (
//                     <span className="text-red-600 font-semibold flex items-center text-center justify-center">
//                       <span className="mr-1">
//                         <MdError />
//                       </span>{" "}
//                       N/A
//                     </span>
//                   )}
//                 </td>

//                 <td className="border border-gray-200 px-4 py-2">
//                   {new Date(bank.transferDate).toLocaleDateString("en-GB", {
//                     day: "2-digit",
//                     month: "2-digit",
//                     year: "numeric",
//                   })}
//                 </td>

//                 <td className="border border-gray-200 px-4 py-2">
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs ${
//                       bank.status
//                         ? "bg-green-100 text-green-600"
//                         : "bg-red-100 text-red-600"
//                     }`}
//                   >
//                     {bank.status ? "success" : "failed"}
//                   </span>
//                 </td>

//                 {/* Actions */}
//                 <td className="border border-gray-200 px-4 py-2 max-w-[175px] overflow-hidden whitespace-nowrap text-ellipsis relative">
//                   <button
//                     onClick={handleClick}
//                     className="p-2 hover:bg-gray-200 rounded"
//                   >
//                     <PencilSquareIcon className="h-5 w-5 text-gray-600" />
//                   </button>

//                   {showActions && (
//                     <div className="flex space-x-2">
//                       <span
//                         onClick={handleConfirm}
//                         className="cursor-pointer bg-green-500 text-white px-2 py-1 rounded"
//                       >
//                         Confirm
//                       </span>
//                       <span
//                         onClick={handleReject}
//                         className="cursor-pointer bg-red-500 text-white px-2 py-1 rounded"
//                       >
//                         Reject
//                       </span>
//                     </div>
//                   )}
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td
//                 className="border border-gray-200 px-4 py-2 text-center"
//                 colSpan="6"
//               >
//                 No banktransfers found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//       <div className="flex justify-center mt-4">
//         <ul className="inline-flex items-center">
//           {getPaginationGroup().map((page, index) => (
//             <li key={index}>
//               {page === "..." ? (
//                 <span className="px-4 py-2 text-gray-500">...</span>
//               ) : (
//                 <button
//                   onClick={() => paginate(page)}
//                   className={`px-4 py-2 border text-gray-600 ${
//                     currentPage === page ? "bg-blue-500 text-white" : "bg-white"
//                   }`}
//                 >
//                   {page}
//                 </button>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default BankTransferHistory;

import axios from "axios";
import React, { useState, useEffect } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { MdError } from "react-icons/md";

const BankTransferHistory = () => {
  const [banktransfer, setBankTransfers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showActions, setShowActions] = useState(false);
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
      // Sau khi cập nhật, reload dữ liệu nếu cần
      fetchBanktransfer();
    } catch (error) {
      console.error("Error updating transaction status:", error);
    }
  };

  const handleConfirm = (transferId) => {
    updateTransactionStatus(transferId, true);
    setShowActions(false);
  };

  const handleReject = (transferId) => {
    updateTransactionStatus(transferId, false);
    setRejectedTransactions((prev) => {
      const updated = [...prev, transferId];
      localStorage.setItem("rejectedTransactions", JSON.stringify(updated));
      return updated;
    });
    setShowActions(false);
  };

  useEffect(() => {
    const savedRejected = localStorage.getItem("rejectedTransactions");
    if (savedRejected) {
      setRejectedTransactions(JSON.parse(savedRejected));
    }
    fetchBanktransfer();
  }, []);

  const handleClick = () => {
    setShowActions(!showActions);
  };

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
    <div className="p-6">
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
                  className="px-4 py-2 text-center text-sm font-semibold text-gray-600 border-b border-gray-200"
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
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {bank.transferId}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {bank.walletUserId}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {bank.user.displayName ? (
                      bank.user.displayName
                    ) : (
                      <span className="flex items-center justify-center text-red-600 font-semibold">
                        <MdError className="mr-1" /> N/A
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {bank.accountNumber ? (
                      bank.accountNumber
                    ) : (
                      <span className="flex items-center justify-center text-red-600 font-semibold">
                        <MdError className="mr-1" /> N/A
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {bank.bankName ? (
                      bank.bankName
                    ) : (
                      <span className="flex items-center justify-center text-red-600 font-semibold">
                        <MdError className="mr-1" /> N/A
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        bank.transferType
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {bank.transferType ? "topup" : "withdraw"}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(bank.transferAmount)}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {bank.transferDescription ? (
                      bank.transferDescription
                    ) : (
                      <span className="flex items-center justify-center text-red-600 font-semibold">
                        <MdError className="mr-1" /> N/A
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {new Date(bank.transferDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        bank.status
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {bank.status ? "success" : "failed"}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {!bank.status &&
                      !rejectedTransactions.includes(bank.transferId) && (
                        <div className="relative inline-block text-left">
                          <button
                            onClick={handleClick}
                            className="p-2 rounded hover:bg-gray-100 focus:outline-none"
                          >
                            <PencilSquareIcon className="h-5 w-5 text-gray-600" />
                          </button>
                          {showActions && (
                            <div className="absolute mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                              <div className="flex flex-col">
                                <span
                                  onClick={() => handleConfirm(bank.transferId)}
                                  className="cursor-pointer px-4 py-2 text-sm text-white bg-green-500 hover:bg-green-600"
                                >
                                  Confirm
                                </span>
                                <span
                                  onClick={() => handleReject(bank.transferId)}
                                  className="cursor-pointer px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600"
                                >
                                  Reject
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="px-4 py-2 text-center text-sm text-gray-700"
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
