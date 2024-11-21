import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/user/findUser/22"
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleBackClick = () => {
    navigate("/auth/system/e-wallet");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 sm:px-8">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-lg shadow-lg">
        <button
          onClick={handleBackClick}
          className="text-blue-600 mb-6 hover:text-blue-800 font-medium"
        >
          &#8592; Back
        </button>

        <h2 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Picture and Basic Info */}
          <div className="flex flex-col items-center space-y-4">
            <img
              className="w-36 h-36 rounded-full object-cover shadow-lg"
              src={user.avatar || "default-avatar.png"}
              alt="User Avatar"
            />
            <h3 className="text-2xl font-semibold text-gray-800">
              {user.displayName}
            </h3>
            <p className="text-gray-600 text-base">{user.email}</p>
            <button className="px-5 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-all">
              Edit Profile
            </button>
          </div>

          {/* Detailed Info */}
          <div className="col-span-2 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-gray-700 text-center">Role</span>
                <button className="bg-cyan-500 hover:bg-cyan-600 text-white py-1 px-2 rounded-full">
                  {user.role || "N/A"}
                </button>
              </div>

              <div>
                <span className="text-lg font-semibold text-gray-700">Status</span>
                <p
                  className={`text-lg font-semibold ${
                    user.isActive === true ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {user.isActive === true ? "Active" : "InActive"}
                </p>
              </div>
            </div>

            <div>
              <span className="text-lg font-semibold text-gray-700">
                Wallet Balance
              </span>
              <p className="text-xl font-bold text-gray-900">
                ${user.walletBalance ? user.walletBalance.toFixed(2) : "0.00"}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12">
          <div className="flex space-x-10 border-b pb-3">
            <button className="text-lg font-medium text-gray-700 border-b-2 border-blue-600 hover:text-blue-600">
              Transaction History
            </button>
            <button className="text-lg font-medium text-gray-600 hover:text-blue-600">
              Settings
            </button>
          </div>

          {/* Transaction History */}
          <div className="mt-6 bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Transaction History
            </h3>
            <ul className="space-y-4">
              <li className="flex justify-between">
                <span className="text-gray-700">Deposit</span>
                <span className="text-green-600 font-medium">+500.00</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-700">Purchase</span>
                <span className="text-red-600 font-medium">-100.00</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-700">Withdraw</span>
                <span className="text-red-600 font-medium">-50.00</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;


