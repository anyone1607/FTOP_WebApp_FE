import React from "react";

const Info = () => {
  return (
    <div className="bg-gradient-to-b from-blue-500 to-indigo-700 min-h-screen flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-5xl font-extrabold mb-6 text-center">
        Welcome to FTOP
      </h1>
      <p className="text-lg md:text-xl max-w-2xl text-center leading-relaxed">
        FTOP is your ultimate solution for managing e-wallets. Explore our features and enjoy a seamless, secure, and efficient digital wallet experience.
      </p>
      <div className="mt-8 space-y-6">
        <div className="flex items-center space-x-4">
          <span className="bg-white text-blue-700 p-2 rounded-full">
            ✅
          </span>
          <p className="text-lg">User-friendly interface for everyone.</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="bg-white text-blue-700 p-2 rounded-full">
            ✅
          </span>
          <p className="text-lg">Highly secure payments and tracking.</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="bg-white text-blue-700 p-2 rounded-full">
            ✅
          </span>
          <p className="text-lg">24/7 support to assist you anytime.</p>
        </div>
      </div>
      <a
        href="/"
        className="mt-10 bg-blue-700 text-white border border-white px-8 py-3 rounded-full shadow-lg hover:bg-indigo-600 hover:scale-105 transform transition"
      >
        Back to Home
      </a>
    </div>
  );
};

export default Info;
