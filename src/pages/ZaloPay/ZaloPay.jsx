import React, { useState } from "react";
import axios from "axios";

const ZaloPay = () => {
  const [formData, setFormData] = useState({
    amount: "",
    bankCode: "",
    accountName: "",
    accountNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/zalopay/withdraw",
        formData
      );
      alert(`Withdrawal Request Success: ${response.data.message}`);
    } catch (error) {
      alert(
        `Withdrawal Request Failed: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Bank Code:</label>
        <input
          type="text"
          name="bankCode"
          value={formData.bankCode}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Account Name:</label>
        <input
          type="text"
          name="accountName"
          value={formData.accountName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Account Number:</label>
        <input
          type="text"
          name="accountNumber"
          value={formData.accountNumber}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Withdraw</button>
    </form>
  );
};

export default ZaloPay;
