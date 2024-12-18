import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaTrash, FaUndoAlt, FaSearch } from "react-icons/fa";
import { AiOutlineUpload } from "react-icons/ai";
import Modal from "react-modal";  // Import react-modal
import './VoucherManagement.css'


const VoucherManagement = () => {
  const [vouchers, setVouchers] = useState([]);
  const [selectedVoucherId, setSelectedVoucherId] = useState(null);
  const [voucherDetails, setVoucherDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deletedVouchers, setDeletedVouchers] = useState([]);
  const [showDeletedVouchers, setShowDeletedVouchers] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [minDiscount, setMinDiscount] = useState("");
  const [maxDiscount, setMaxDiscount] = useState("");
  const [userId, setUserId] = useState(null);
  const [restoreExpiredDate, setRestoreExpiredDate] = useState('');
  const [restoreCreateDate, setRestoreCreateDate] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]);



  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const email = params.get('email');
    const role = params.get('role');
    const name = params.get('name');

    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      localStorage.setItem('role', role);
      localStorage.setItem('name', name);
    }
  }, []);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const email = localStorage.getItem('email');
        const response = await axios.get(`http://localhost:8000/api/user/email/${email}`);
        console.log("Fetched user ID:", response.data.id);
        setUserId(response.data.id);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  // const fetchVouchersData = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8000/api/voucher");
  //     setVouchers(response.data || []);
  //   } catch (error) {
  //     console.error("Error fetching vouchers:", error);
  //   }
  // };

  const handleRestoreExpiredDateChange = (e) => {
    const newEndDate = e.target.value;
    const today = new Date().toISOString().split("T")[0]; // Lấy ngày hôm nay
    if (new Date(newEndDate) < new Date(today)) {
      alert("End Date cannot be in the past.");
    } else {
      setEndDate(newEndDate);
    }
  };
  
  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    const today = new Date().toISOString().split("T")[0]; // Lấy ngày hôm nay
    if (new Date(newStartDate) < new Date(today)) {
      alert("Start Date cannot be in the past.");
    } else if (new Date(newStartDate) > new Date(endDate)) {
      alert("Start Date cannot be after End Date.");
    } else {
      setStartDate(newStartDate);
    }
  };

  const fetchVouchersData = async () => {
    try {
      const role = localStorage.getItem('role');
      const response = await axios.get("http://localhost:8000/api/voucher", {
        params: {
          userId: userId,
          role: role
        }
      });
      setVouchers(response.data || []);
    } catch (error) {
      console.error("Error fetching vouchers:", error);
    }
  };

  const fetchDeletedVouchers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/voucher/deleted"
      );
      setDeletedVouchers(response.data || []);
    } catch (error) {
      console.error("Error fetching deleted vouchers:", error);
    }
  };

  const fetchVoucherDetails = async (voucherId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/voucher/${voucherId}`
      );
      setVoucherDetails(response.data || {});
    } catch (error) {
      console.error("Error fetching voucher details:", error);
    } finally {
      setLoading(false);
    }
  };

  // call api xoa mem tu be

  const softDeleteVoucher = async (voucherId) => {
    try {
      await axios.patch(
        `http://localhost:8000/api/voucher/${voucherId}/delete`
      );
      fetchVouchersData();
      fetchDeletedVouchers();
    } catch (error) {
      console.error("Error deleting voucher:", error);
    }
  };

  // call api khoi phuc tu be

  const restoreVoucher = async (voucherId) => {
    if (!endDate || !startDate) {
      alert("Please select both start date and expired date.");
      return;
    }
  
    try {
      const response = await axios.patch(`http://localhost:8000/api/voucher/${voucherId}/restore`, {
        expiredDate: endDate,
        createDate: startDate,
      });
      if (response.status === 200) {
        alert("Voucher restored successfully!");
       // Cập nhật lại danh sách voucher đã xóa
       fetchDeletedVouchers();
       // Thêm voucher đã khôi phục vào danh sách voucher
       const restoredVoucher = response.data;
       setVouchers((prevVouchers) => [...prevVouchers, restoredVoucher]);
      }
    } catch (error) {
      console.error("Error restoring voucher:", error);
      alert("Failed to restore voucher.");
    }
  };


  // call api xoa that
  const permanentlyDeleteVoucher = async (voucherId) => {
    try {
      await axios.delete(`http://localhost:8000/api/voucher/${voucherId}`);
      fetchDeletedVouchers();
    } catch (error) {
      console.error("Error permanently deleting voucher:", error);
    }
  };

  // useEffect(() => {
  //   fetchVouchersData();
  //   fetchDeletedVouchers();
  // }, []);
  useEffect(() => {
    if (userId) {
      fetchVouchersData();
      fetchDeletedVouchers();
    }
  }, [userId]);

  const toggleVoucherDetails = (voucherId) => {
    if (selectedVoucherId === voucherId) {
      setSelectedVoucherId(null);
      setVoucherDetails(null);
    } else {
      setSelectedVoucherId(voucherId);
      fetchVoucherDetails(voucherId);
    }
  };
  const openModal = () => {
    setIsModalOpen(true); // Open modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    fetchFilteredVouchers(e.target.value, minDiscount, maxDiscount);
  };

  const handleFilterChange = (e) => {
    const [min, max] = e.target.value.split('-');
    setMinDiscount(min);
    setMaxDiscount(max);
    fetchFilteredVouchers(searchTerm || '', min, max);
  };

  const fetchFilteredVouchers = async (filter, minDiscount, maxDiscount) => {
    try {
      const response = await axios.get("http://localhost:8000/api/voucher/filter", {
        params: {
          filter,
          minDiscount,
          maxDiscount,
          userId: userId,
          role: localStorage.getItem('role')
        },
      });
      setVouchers(response.data || []);
    } catch (error) {
      console.error("Error filtering vouchers:", error);
    }
  };
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Voucher Management</h1>

      <div className="flex items-center justify-between mb-4">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
          <AiOutlineUpload size={20} />
          Thêm bằng Excel
        </button>
        <button
          onClick={openModal}
          className="bg-red-500 text-white px-3 py-2 rounded flex items-center hover:bg-red-600 transition duration-300"
        >
          <FaTrash className="mr-2" />
          {deletedVouchers.length} Deleted Vouchers
        </button>
      </div>

      <div className="flex justify-between mb-6 space-x-4">
        <input
          type="text"
          placeholder="Search by voucher code or name"
          className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <select
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={`${minDiscount}-${maxDiscount}`}
          onChange={handleFilterChange}
        >
          <option value="">All Discounts</option>
          <option value="0-10">0-10%</option>
          <option value="10-20">10-20%</option>
          <option value="20-30">20-30%</option>
          <option value="30-40">30-40%</option>
          <option value="40-50">40-50%</option>
        </select>
      </div>
      {/* Active Vouchers Table */}
      <div className="overflow-x-auto">
        <h2 className="text-lg font-semibold mb-2">Active Vouchers</h2>
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg mb-6">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
              <th className="py-3 px-6 text-left">Voucher ID</th>
              <th className="py-3 px-6 text-left">Voucher Name</th>
              <th className="py-3 px-6 text-left">Discount (%)</th>
              <th className="py-3 px-6 text-left">Store</th>
              <th className="py-3 px-6 text-left">Expired Date</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {vouchers.length > 0 ? (
              vouchers.map((voucher) => (
                <React.Fragment key={voucher.voucherId}>
                  <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">{voucher.voucherId}</td>
                    <td className="py-3 px-6 text-left">
                      {voucher.voucherName}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {voucher.voucherDiscount}%
                    </td>
                    <td className="py-3 px-6 text-left">
                      {voucher.store?.storeName}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {new Date(voucher.expiredDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-6 flex space-x-2">
                      <button
                        onClick={() => toggleVoucherDetails(voucher.voucherId)}
                        className="bg-blue-500 text-white px-2 py-1 rounded flex items-center hover:text-blue-700 transition duration-300"
                      >
                        <FaEye className="mr-1" /> View
                      </button>
                      <button
                        onClick={() => softDeleteVoucher(voucher.voucherId)}
                        className="bg-red-500 text-white px-2 py-1 rounded flex items-center hover:bg-red-600"
                      >
                        <FaTrash className="mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                  {selectedVoucherId === voucher.voucherId && (
                    <tr>
                      <td colSpan="6">
                        <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                          {loading ? (
                            <div>Loading...</div>
                          ) : (
                            <div>
                              <h3 className="font-semibold text-lg">
                                Voucher Details
                              </h3>
                              <p>
                                <strong>Voucher ID:</strong>{" "}
                                {voucherDetails.voucherId}
                              </p>
                              <p>
                                <strong>Voucher Name:</strong>{" "}
                                {voucherDetails.voucherName}
                              </p>
                              <p>
                                <strong>Discount Percentage:</strong>{" "}
                                {voucherDetails.voucherDiscount}%
                              </p>
                              <p>
                                <strong>Store:</strong>{" "}
                                {voucherDetails.store?.storeName}
                              </p>
                              <p>
                                <strong>Expired Date:</strong>{" "}
                                {new Date(
                                  voucherDetails.expiredDate
                                ).toLocaleDateString()}
                              </p>
                              <p>
                                <strong>Orders Applied:</strong>{" "}
                                {voucherDetails.order?.length}
                              </p>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-3 px-6">
                  No vouchers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Deleted Vouchers */}
      <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Deleted Vouchers"
      className="modal-content"
      overlayClassName="modal-overlay"
      ariaHideApp={false}
    >
      <div className="modal-header flex justify-between items-center">
        <h2 className="text-lg font-semibold">Deleted Vouchers</h2>
        <button
          onClick={closeModal}
          className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600 transition duration-300"
        >
          X
        </button>
      </div>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
              <th className="py-3 px-6 text-left">Voucher ID</th>
              <th className="py-3 px-6 text-left">Voucher Name</th>
              <th className="py-3 px-6 text-left">Store</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {deletedVouchers.length > 0 ? (
              deletedVouchers.map((voucher) => (
                <tr key={voucher.voucherId} className="border-b border-gray-200">
                  <td className="py-3 px-6 text-left">{voucher.voucherId}</td>
                  <td className="py-3 px-6 text-left">{voucher.voucherName}</td>
                  <td className="py-3 px-6 text-left">{voucher.store?.storeName}</td>
                  <td className="py-3 px-6 flex space-x-2">
                    <input
                      type="date"
                      value={startDate}
                      onChange={handleStartDateChange}
                      placeholder="Start Date"
                      className="border border-gray-300 p-2 rounded"
                    />
                    <input
                      type="date"
                      value={endDate}
                      onChange={handleRestoreExpiredDateChange}
                      placeholder="Expired Date"
                      className="border border-gray-300 p-2 rounded"
                    />
                    <button
                      onClick={() => restoreVoucher(voucher.voucherId)}
                      className="bg-green-500 text-white px-2 py-1 rounded flex items-center hover:bg-green-600 transition duration-300"
                    >
                      <FaUndoAlt className="mr-1" /> Restore
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-3 px-6">
                  No deleted vouchers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Modal>
    </div>
  );

};

export default VoucherManagement;
