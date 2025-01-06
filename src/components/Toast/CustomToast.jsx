import React, { useEffect } from "react";

const CustomToast = ({ message, subMessage, type = "success", onClose, duration = 3000 }) => {
  const getIconAndColor = () => {
    if (type === "success") {
      return {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        ),
        bgColor: "bg-green-100",
      };
    } else if (type === "error") {
      return {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ),
        bgColor: "bg-red-100",
      };
    }
    return {};
  };

  const { icon, bgColor } = getIconAndColor();

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg p-4 w-80 z-50">
      <div className="flex items-center">
        <div className={`w-12 h-12 ${bgColor} rounded-full flex items-center justify-center`}>
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-gray-700 font-semibold">{message}</p>
          {subMessage && <p className="text-gray-500 text-sm">{subMessage}</p>}
        </div>
      </div>
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
      >
        &times;
      </button>
    </div>
  );
};

export default CustomToast;
