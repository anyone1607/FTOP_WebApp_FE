import React, { useState, useEffect } from "react";
import {
  PencilSquareIcon,
  EyeIcon
} from "@heroicons/react/24/outline";
const Transaction = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Giả lập API call
    const fetchTransactions = async () => {
      const mockData = [
        {
          transactionId: 1,
          transferUser: { id: 35, name: "Test Owner 2" },
          receiveUser: { id: 36, name: "Manager Ftop" },
          transactionDate: "2024-06-15T10:00:00Z",
          transactionAmount: 100.0,
          transactionDescription: "Chuyển tiền mua hàng",
          status: true,
        },
      ];
      setTransactions(mockData);
    };
    fetchTransactions();
  }, []);

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
          {transactions.map((transaction) => (
            <tr key={transaction.transactionId} className="hover:bg-gray-100">
              <td className="py-2 px-4 border text-center">
                {transaction.transactionId}
              </td>
              <td className="py-2 px-4 border text-center">
                {transaction.transferUser.name}
              </td>
              <td className="py-2 px-4 border text-center">
                {transaction.receiveUser.name}
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
                <button className="p-2 hover:bg-gray-200 rounded">
                  <PencilSquareIcon className="h-5 w-5 text-gray-600" />
                </button>
                <button
                  className="p-2 hover:bg-gray-200 rounded"
                >
                  <EyeIcon className="h-5 w-5 text-gray-600" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transaction;
