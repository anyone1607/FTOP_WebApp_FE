import React from "react";
import { Link } from "react-router-dom";
const Test = () => {
  const classes = [
    { id: 1, code: "SE16762", specialized: "Software Engineering" },
    { id: 2, code: "SE12422", specialized: "Software Engineering" },
  ];
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between bg-gray-100 p-4 border-b">
        <div className="flex items-center gap-2">
          <button className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9.75L12 4l9 5.75M4 10v10a1 1 0 001 1h3m9-11v10a1 1 0 001 1h3m-11 0h4"
              />
            </svg>
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition">
            Classes
          </button>
        </div>
        <h1 className="text-xl font-semibold">Home page</h1>
        <div className="flex items-center gap-4">
          <button className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .53-.21 1.04-.586 1.414L4 17h5m6 0a3 3 0 01-6 0"
              />
            </svg>
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 transition">
            Anh Hải
          </button>
        </div>
      </header>

      <div className="p-4 flex items-center gap-2 border-b bg-white">
        <input
          type="text"
          placeholder="Class's name"
          className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
        />
        <select className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500">
          <option value="">Status</option>
          <option value="on-going">On-going</option>
          <option value="finished">Finished</option>
        </select>
        <select className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500">
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
        <button className="px-4 py-2 bg-blue-500 text-white rounded font-semibold hover:bg-blue-600 transition">
          Search
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded font-semibold hover:bg-green-600 transition">
          Add New Class
        </button>
      </div>

      {/* Danh sách các lớp */}
      <main>
        {classes.map((item) => (
          <Link key={item.id} to={`/projects`}>
            <div className="bg-white border p-4 mb-4 rounded shadow-sm">
              <h2>{item.code}</h2>
              <p>Specialized: {item.specialized}</p>
              <p className="text-sm text-gray-600">
                Created at: 11/09/2024 09:30 AM
              </p>
              <span className="inline-block px-2 py-1 mt-2 text-sm bg-blue-100 text-blue-800 rounded">
                ON-GOING
              </span>
            </div>
          </Link>
        ))}
      </main>
    </div>
  );
};

export default Test;
