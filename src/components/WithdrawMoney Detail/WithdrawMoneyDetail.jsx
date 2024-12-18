import React, { useState } from "react";

const WithdrawMoneyDetail = () => {
  const [selectedAmount, setSelectedAmount] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const predefinedAmounts = [
    { label: "+100.000 VND", value: 100000 },
    { label: "+500.000 VND", value: 500000 },
    { label: "+1.000.000 VND", value: 1000000 },
    { label: "+5.000.000 VND", value: 5000000 },
    { label: "+10.000.000 VND", value: 10000000 },
    { label: "+50.000.000 VND", value: 50000000 },
  ];

  const numberToWords = (num) => {
    const units = [
      "",
      "Một",
      "Hai",
      "Ba",
      "Bốn",
      "Năm",
      "Sáu",
      "Bảy",
      "Tám",
      "Chín",
    ];
    const tens = [
      "",
      "Mười",
      "Hai mươi",
      "Ba mươi",
      "Bốn mươi",
      "Năm mươi",
      "Sáu mươi",
      "Bảy mươi",
      "Tám mươi",
      "Chín mươi",
    ];
    const scales = ["", "nghìn", "triệu", "tỷ"];

    if (!num || num === "0") return "Không đồng";

    const toChunks = (n) => {
      const chunks = [];
      while (n > 0) {
        chunks.push(n % 1000);
        n = Math.floor(n / 1000);
      }
      return chunks.reverse();
    };

    const convertChunk = (chunk) => {
      const hundreds = Math.floor(chunk / 100);
      const remainder = chunk % 100;
      const tensDigit = Math.floor(remainder / 10);
      const unitsDigit = remainder % 10;

      let result = "";
      if (hundreds) result += `${units[hundreds]} trăm `;
      if (tensDigit > 1) {
        result += `${tens[tensDigit]} `;
        if (unitsDigit) result += units[unitsDigit];
      } else if (tensDigit === 1) {
        result += "Mười ";
        if (unitsDigit) result += unitsDigit === 5 ? "lăm" : units[unitsDigit];
      } else if (unitsDigit) {
        result += `${units[unitsDigit]}`;
      }
      return result.trim();
    };

    const chunks = toChunks(parseInt(num));
    let words = "";
    for (let i = 0; i < chunks.length; i++) {
      if (chunks[i]) {
        words += `${convertChunk(chunks[i])} ${scales[chunks.length - 1 - i]} `;
      }
    }

    return words.trim() + " đồng";
  };

  // Hàm click chọn số tiền
  const handleAmountClick = (amount) => {
    setInputAmount((prevAmount) => {
      const newAmount = (parseInt(prevAmount) || 0) + amount;
      return newAmount;
    });
  };

  // Hàm thay đổi input
  const handleInputChange = (e) => {
    const value = e.target.value;
    const sanitizedValue = value.replace(/[^0-9]/g, "");
    setInputAmount(sanitizedValue);
    setSelectedAmount("");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">
          Chọn kênh thanh toán
        </label>
        <select
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          defaultValue="BANKQR1"
        >
          <option value="BANKQR1">ZALOPAY - Tên cửa hàng</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">VND</label>
        <input
          type="text"
          placeholder="Số Tiền Rút"
          value={inputAmount}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <p className="text-sm text-gray-500 mt-2">
          {inputAmount ? numberToWords(inputAmount) : ""}
        </p>

      </div>

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

      <div className="text-gray-600 text-sm mb-4">
        <p>• Số tiền nạp tối thiểu là 50,000, tối đa là 300,000,000</p>
      </div>

      <button
        disabled={
          !(
            selectedAmount ||
            (inputAmount >= 50000 && inputAmount <= 300000000)
          )
        }
        className={`w-full p-3 text-white font-semibold rounded-lg ${
          !(
            selectedAmount ||
            (inputAmount >= 50000 && inputAmount <= 300000000)
          )
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        Xác Nhận Rút Tiền
      </button>
    </div>
  );
};

export default WithdrawMoneyDetail;
