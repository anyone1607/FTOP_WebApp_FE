import React from "react";

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="flex justify-between items-center p-6 bg-white shadow-md">
        <div className="text-2xl font-bold">FTOP</div>
        <nav className="space-x-6">
          <a href="/" className="text-gray-600 hover:text-purple-500">
            Home
          </a>
          <a href="/about" className="text-gray-600 hover:text-purple-500">
            About Us
          </a>
          <a href="/work" className="text-gray-600 hover:text-purple-500">
            Work
          </a>
          <a href="/info" className="text-gray-600 hover:text-purple-500">
            Info
          </a>
        </nav>
        <button
          onClick={() => {
            window.location.href =
              "http://localhost:8000/api/auth/google/login";
          }}
          className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition"
        >
          Login/Register
        </button>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col lg:flex-row justify-between items-center px-6 lg:px-24 py-12">
        {/* Left Side - Text Section */}
        <div className="text-white max-w-lg space-y-6">
          <h1 className="text-5xl font-bold">E-Wallet</h1>
          <p className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget
            libero feugiat, faucibus libero id, scelerisque quam.
          </p>
          <a
            href="#learn-more"
            className="bg-purple-700 text-white px-6 py-3 rounded-full shadow-lg hover:bg-purple-800 transition inline-block"
          >
            Learn More
          </a>
        </div>

        {/* Right Side - Image Section */}
        <div className="mt-12 lg:mt-0">
          <img
            src="https://inizsoft.com/wp-content/uploads/2021/02/wordpress-Development-Company-in-India1.gif" // replace with the actual image URL
            alt="E-Wallet Illustration"
            className="w-full max-w-md"
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
