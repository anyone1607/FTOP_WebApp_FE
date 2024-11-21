import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-r from-green-400 to-blue-500 min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>
      <p className="text-lg max-w-3xl text-center">
        Welcome to FTOP! We are dedicated to providing a seamless e-wallet experience for students and businesses. Our mission is to make transactions simpler and more secure, all while delivering the best value to our users.
      </p>
      <a
        href="/"
        className="mt-8 bg-white text-blue-600 px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 transition"
      >
        Back to Home
      </a>
    </div>
  );
};

export default AboutUs;
