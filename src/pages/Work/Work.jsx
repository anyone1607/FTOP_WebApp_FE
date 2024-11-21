import React from "react";

const Work = () => {
  return (
    <div className="bg-gradient-to-r from-purple-400 to-pink-500 min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-6">Our Work</h1>
      <p className="text-lg max-w-3xl text-center">
        At FTOP, we specialize in delivering cutting-edge solutions for e-wallet applications. Our team focuses on creating user-friendly interfaces and robust backend systems to support secure and efficient transactions.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        <div className="bg-white text-purple-600 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Project 1</h2>
          <p>Seamless payment system for students.</p>
        </div>
        <div className="bg-white text-purple-600 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Project 2</h2>
          <p>Discount voucher collection and redemption.</p>
        </div>
        <div className="bg-white text-purple-600 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Project 3</h2>
          <p>Real-time analytics and insights for businesses.</p>
        </div>
      </div>
      <a
        href="/"
        className="mt-8 bg-white text-pink-600 px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 transition"
      >
        Back to Home
      </a>
    </div>
  );
};

export default Work;
