import React from "react";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  // Dữ liệu giả lập cho ví dụ
  const user = {
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0123456789",
    walletBalance: 1250.50,
    birthDate: "1990-01-15",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    avatar: "https://via.placeholder.com/150", // Thay bằng đường dẫn thật
  };
  const navigate = useNavigate(); // Khai báo useNavigate hook

  // Hàm quay lại trang trước
  const handleBackClick = () => {
    navigate(-1); // Quay lại trang trước đó
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6 sm:px-8">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        {/* Nút Back */}
        <button
          onClick={handleBackClick}
          className="text-blue-600 mb-6 hover:text-blue-800"
        >
          &#8592; Back
        </button>

        <h2 className="text-3xl font-bold text-gray-900 mb-6">My Profile</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Avatar & Info */}
          <div className="flex flex-col items-center space-y-4">
            <img
              className="w-32 h-32 rounded-full object-cover shadow-md"
              src={user.avatar}
              alt="User Avatar"
            />
            <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
            <p className="text-gray-600 text-sm">{user.email}</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition">
              Edit Profile
            </button>
          </div>

          {/* Info Section */}
          <div className="col-span-2 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Birth Date */}
              <div>
                <span className="text-lg font-medium text-gray-700">Date of Birth</span>
                <p className="text-gray-600">{user.birthDate}</p>
              </div>
              {/* Phone */}
              <div>
                <span className="text-lg font-medium text-gray-700">Phone</span>
                <p className="text-gray-600">{user.phone}</p>
              </div>
            </div>

            <div>
              <span className="text-lg font-medium text-gray-700">Address</span>
              <p className="text-gray-600">{user.address}</p>
            </div>

            <div>
              <span className="text-lg font-medium text-gray-700">Wallet Balance</span>
              <p className="text-gray-900">${user.walletBalance.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-8">
          <div className="flex space-x-6 border-b pb-2">
            <button className="text-lg font-medium text-gray-700 border-b-2 border-blue-600 hover:text-blue-600">
              Transaction History
            </button>
            <button className="text-lg font-medium text-gray-600 hover:text-blue-600">
              Settings
            </button>
          </div>

          <div className="mt-6">
            {/* Transaction History Tab */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Transaction History</h3>
              <ul className="space-y-4">
                <li className="flex justify-between">
                  <span className="text-gray-700">Deposit</span>
                  <span className="text-green-600">+500.00</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-700">Purchase</span>
                  <span className="text-red-600">-100.00</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-700">Withdraw</span>
                  <span className="text-red-600">-50.00</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
