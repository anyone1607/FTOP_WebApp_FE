import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

function ProfileCard() {
  const users = [
    {
      name: "Sasha Max",
      title: "Web Developer",
      image: "https://anhdep.edu.vn/wp-content/uploads/2024/05/avatar-wibu-004.jpg",
      socials: [
        { icon: <FaFacebookF />, link: "#", color: "bg-blue-800" },
        { icon: <FaTwitter />, link: "#", color: "bg-sky-500" },
        { icon: <FaInstagram />, link: "#", color: "bg-pink-500" },
      ],
    },
    {
      name: "John Doe",
      title: "UI/UX Designer",
      image: "https://anhdep.edu.vn/wp-content/uploads/2024/05/avatar-wibu-004.jpg",
      socials: [
        { icon: <FaFacebookF />, link: "#", color: "bg-blue-800" },
        { icon: <FaTwitter />, link: "#", color: "bg-sky-500" },
      ],
    },
    {
      name: "Emily Stone",
      title: "Frontend Engineer",
      image: "https://anhdep.edu.vn/wp-content/uploads/2024/05/avatar-wibu-004.jpg",
      socials: [
        { icon: <FaInstagram />, link: "#", color: "bg-pink-500" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 text-center relative max-w-xs"
          >
            <div className="absolute top-4 right-4 text-red-500 text-xl">❤️</div>
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-gray-200">
              <img
                src={user.image}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-bold mt-4 text-gray-800">
              {user.name}
            </h3>
            <p className="text-gray-500 text-sm">{user.title}</p>
            <div className="flex justify-center mt-4 space-x-3">
              {user.socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  className={`w-10 h-10 flex items-center justify-center text-white rounded-full ${social.color}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileCard;
