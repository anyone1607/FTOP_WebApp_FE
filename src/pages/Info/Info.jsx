import React from "react";

const Info = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-400 to-blue-700 min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-6">Info</h1>
      <p className="text-lg max-w-3xl text-center">
        FTOP provides comprehensive resources for managing your e-wallet experience. From FAQs to tutorials, we ensure you have all the information you need.
      </p>
      <ul className="mt-6 space-y-4 text-lg">
        <li>✅ Easy-to-use interface for beginners.</li>
        <li>✅ Secure payments and transaction tracking.</li>
        <li>✅ 24/7 customer support for all queries.</li>
      </ul>
      <a
        href="/"
        className="mt-8 bg-white text-blue-700 px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 transition"
      >
        Back to Home
      </a>
    </div>
  );
};

export default Info;
