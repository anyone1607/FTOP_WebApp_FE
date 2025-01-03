import React, { useState } from "react";

const Test = () => {
  const [selectedAmount, setSelectedAmount] = useState("");
  const [inputAmount, setInputAmount] = useState("");

  const predefinedAmounts = [
    { label: "+100k", value: 100000 },
    { label: "+500k", value: 500000 },
    { label: "+1,000k", value: 1000000 },
    { label: "+5,000k", value: 5000000 },
    { label: "+10,000k", value: 10000000 },
    { label: "+50,000k", value: 50000000 },
  ];

  const handleAmountClick = (amount) => {
    setSelectedAmount(amount);
    setInputAmount("");
  };

  const handleInputChange = (e) => {
    setInputAmount(e.target.value);
    setSelectedAmount("");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      {/* Payment Channel */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">
          Chọn kênh thanh toán
        </label>
        <select
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          defaultValue="BANKQR1"
        >
          <option value="BANKQR1">BANKQR1</option>
        </select>
      </div>

      {/* Input Section */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">VND</label>
        <input
          type="number"
          placeholder="Số Tiền Nạp"
          value={inputAmount}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Predefined Amount Buttons */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {predefinedAmounts.map((item) => (
          <button
            key={item.value}
            onClick={() => handleAmountClick(item.value)}
            className={`p-3 text-center border rounded-lg ${
              selectedAmount === item.value
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Note */}
      <div className="text-gray-600 text-sm mb-4">
        <p>• Số tiền nạp tối thiểu là 50,000, tối đa là 300,000,000</p>
      </div>

      {/* Confirm Button */}
      <button
        disabled={
          !(selectedAmount || (inputAmount >= 50000 && inputAmount <= 300000000))
        }
        className={`w-full p-3 text-white font-semibold rounded-lg ${
          !(selectedAmount || (inputAmount >= 50000 && inputAmount <= 300000000))
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        Xác Nhận Nạp Tiền
      </button>
    </div>
  );
};

export default Test;
