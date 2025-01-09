import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaMoneyBillWave } from "react-icons/fa";
import { toast } from "react-toastify";
const StoreManagement = () => {
  const [stores, setStores] = useState([]);
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const [newStore, setNewStore] = useState({
    storeName: "",
    storeAddress: "",
    storePhone: "",
    ownerId: "",
    status: false,
  });
  const [isAdding, setIsAdding] = useState(false);

  // ===== (A) Popup Stats =====
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [storeStats, setStoreStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalDiscount: 0,
  });

  // ===== (B) Popup Vouchers =====
  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);
  // Nếu bạn cần ID store để lấy voucher, có thể thêm state hoặc truyền param:
  const [voucherStoreId, setVoucherStoreId] = useState(null);

  // 1) Lấy danh sách Store
  const fetchStoresData = async () => {
    try {
      const storeResponse = await axios.get("http://localhost:8000/api/store");
      setStores(storeResponse.data?.stores || storeResponse.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchStoresData();
  }, []);

  const handleAddStore = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/store",
        newStore
      );
      setStores([...stores, response.data]);
      setNewStore({
        storeName: "",
        storeAddress: "",
        storePhone: "",
        ownerId: "",
        status: false,
      });
      setIsAdding(false);
    } catch (error) {
      console.error("Error adding store:", error);
    }
  };

  // ===== (A) Hàm mở popup Stats =====
  const handleShowStoreStats = async (storeId) => {
    setSelectedStoreId(storeId);
    setIsModalOpen(true);
    const stats = await fetchStoreStats(storeId, selectedMonth, selectedYear);
    setStoreStats(stats);
  };

  const fetchStoreStats = async (storeId, month, year) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/order/stats/${storeId}`,
        {
          params: {
            month: month === "All" ? null : month,
            year,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching store stats:", error);
      return { totalOrders: 0, totalRevenue: 0, totalDiscount: 0 };
    }
  };

  // Mỗi khi tháng/năm hoặc store thay đổi (và popup Stats đang mở), refetch
  useEffect(() => {
    if (!isModalOpen || !selectedStoreId) return;

    const refetchStats = async () => {
      const stats = await fetchStoreStats(
        selectedStoreId,
        selectedMonth,
        selectedYear
      );
      setStoreStats(stats);
    };
    refetchStats();
  }, [selectedMonth, selectedYear, selectedStoreId, isModalOpen]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setStoreStats({
      totalOrders: 0,
      totalRevenue: 0,
      totalDiscount: 0,
    });
    setSelectedMonth(new Date().getMonth() + 1);
    setSelectedYear(new Date().getFullYear());
  };

  // ===== (B) Popup Vouchers =====
  const handleOpenVouchers = (storeId) => {
    setVoucherStoreId(storeId);
    setIsVoucherModalOpen(true);
  };
  const handleCloseVouchers = () => {
    setIsVoucherModalOpen(false);
    setVoucherStoreId(null);
  };

  const handleCashOut = async () => {
    if (storeStats.totalDiscount <= 0) {
      toast.error("Discount bằng 0, không thể rút tiền!");
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/order/cashout-month", {
        storeId: selectedStoreId,
        month: selectedMonth,
        year: selectedYear,
      });
      const updatedStats = await fetchStoreStats(
        selectedStoreId,
        selectedMonth,
        selectedYear
      );
      setStoreStats(updatedStats);

      toast.success("Rút tiền thành công!");
    } catch (error) {
      console.error("Cash out error:", error);
      toast.error("Có lỗi xảy ra khi rút tiền!");
    }
  };

  // PAGINATION
  const itemsPerPage = 9;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    stores?.length > 0 ? stores.slice(indexOfFirstItem, indexOfLastItem) : [];
  const totalPages =
    stores?.length > 0 ? Math.ceil(stores?.length / itemsPerPage) : 0;

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
    <div className="container mx-auto p-6">
      {/* (A) Popup Stats */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={handleCloseModal}
          />
          <div
            className="relative bg-white rounded-lg shadow-lg p-6 z-10 w-1/3"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">Store Statistics</h2>
            {/* Chọn tháng */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="month"
              >
                Month
              </label>
              <select
                id="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              >
                {[...Array(12).keys()].map((m) => (
                  <option key={m + 1} value={m + 1}>
                    Tháng {m + 1}
                  </option>
                ))}
              </select>
            </div>
            {/* Chọn năm */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="year"
              >
                Year
              </label>
              <select
                id="year"
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              >
                {[...Array(6).keys()].map((y) => {
                  const year = 2020 + y;
                  return (
                    <option key={year} value={year}>
                      Năm {year}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* Thông tin stats */}
            <p>
              <strong>Total Orders:</strong> {storeStats.totalOrders}
            </p>
            <p>
              <strong>Total Revenue:</strong>{" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(storeStats.totalRevenue)}
            </p>
            <p>
              <strong>Total Discount (10%):</strong>{" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(storeStats.totalRevenue * 0.1)}
            </p>

            {/* Nút Cash Out + Close */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={handleCashOut}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 flex items-center"
              >
                <FaMoneyBillWave className="mr-2" />
                Cash Out
              </button>

              <button
                onClick={handleCloseModal}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* (B) Popup Vouchers */}
      {isVoucherModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={handleCloseVouchers}
          />
          <div
            className="relative bg-white rounded-lg shadow-lg p-6 z-10 w-1/3"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">All Vouchers</h2>
            {/* Ví dụ: hiển thị voucherStoreId */}
            <p>Đang xem voucher của storeId = {voucherStoreId}</p>
            {/* Hoặc tuỳ bạn gọi API khác để lấy dữ liệu voucher */}
            <button
              onClick={handleCloseVouchers}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Button thêm store */}
      <div className="flex items-center mb-4">
        <button
          onClick={() => setIsAdding(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add New Store
        </button>
        {isAdding && (
          <div className="bg-white p-6 mb-6 rounded-lg shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Add Store</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Form thêm Store (Store Name, Address, etc.) */}
            </div>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={() => setIsAdding(false)}
                className="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg shadow hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddStore}
                className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-600 transition"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Table hiển thị Store */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
              <th className="py-3 px-6 text-left">Store ID</th>
              <th className="py-3 px-6 text-left">Store Name</th>
              <th className="py-3 px-6 text-left">Address</th>
              <th className="py-3 px-6 text-left">Phone</th>
              <th className="py-3 px-6 text-left">Owner</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Vouchers</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {stores?.length > 0 ? (
              currentItems.map((store) => (
                <React.Fragment key={store.storeId}>
                  <tr
                    className="border-b border-gray-200 hover:bg-gray-100"
                    // Click vào row => mở popup stats
                    onClick={() => handleShowStoreStats(store.storeId)}
                    style={{ cursor: "pointer" }}
                  >
                    <td className="py-3 px-6 text-left">{store.storeId}</td>
                    <td className="py-3 px-6 text-left">{store.storeName}</td>
                    <td className="py-3 px-6 text-left">
                      {store.storeAddress}
                    </td>
                    <td className="py-3 px-6 text-left">{store.storePhone}</td>
                    <td className="py-3 px-6 text-left">
                      {store.user?.displayName || "No Owner"}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {store.status ? (
                        <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
                          Active
                        </span>
                      ) : (
                        <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">
                          Inactive
                        </span>
                      )}
                    </td>
                    {/* (B) Cột Voucher: CLICK => mở popup vouchers, dừng bubble => không mở stats */}
                    <td
                      className="py-3 px-6 text-left text-blue-600 underline cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenVouchers(store.storeId);
                      }}
                    >
                      {store?.vouchers?.length
                        ? `${store.vouchers.length} Voucher(s)`
                        : "No vouchers"}
                    </td>
                  </tr>
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-3 px-6">
                  No stores found.
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
                      currentPage === page
                        ? "bg-blue-500 text-white"
                        : "bg-white"
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
    </div>
  );
};

export default StoreManagement;
