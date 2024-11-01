import React from "react";
import { Link } from "react-router-dom";
const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-center">
      <div className="flex items-center justify-center mb-6">
        <span className="text-6xl font-bold text-gray-600">4</span>
        <span className="text-6xl font-bold text-gray-600">0</span>
        <span className="text-6xl font-bold text-gray-600">4</span>
      </div>
      <h1 className="text-2xl font-semibold text-gray-700 mb-4">
        Boo! Page missing!
      </h1>
      <p className="text-gray-500 mb-8">
        Whoops! This page must be a not found – it's not here!
      </p>
      <Link
        to="/"
        className="bg-black text-white px-6 py-3 rounded-full shadow-lg hover:bg-cyan-500 transition"
      >
        Go to back Home
      </Link>
      <p className="mt-6">
        <Link
          to="/what-is-404"
          className="text-gray-500 underline hover:text-gray-700"
        >
          What means 404?
        </Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
