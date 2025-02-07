import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cancel = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <svg
          className="w-16 h-16 text-red-500 mx-auto mb-4 animate-pulse"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <circle
            className="stroke-current text-red-500"
            cx="12"
            cy="12"
            r="10"
            strokeWidth="2"
          />
          <path
            className="stroke-current text-red-500"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M15 9l-6 6m0-6l6 6"
          />
        </svg>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Nạp tiền thất bại!
        </h1>
        <p className="text-gray-600 mb-6">
          Giao dịch của bạn đã bị hủy hoặc không thành công.
        </p>
        <button
          onClick={handleGoHome}
          className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition duration-300"
        >
          Quay về trang chủ
        </button>
      </div>
    </div>
  );
};

export default Cancel;
