import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/about");
  };
  const featuresLeft = [
    {
      icon: "📊",
      title: "Quản lý chi tiêu dễ dàng và rõ ràng",
    },
    {
      icon: "💰",
      title: "Tiết kiệm và chi tiêu hợp lý hơn",
    },
    {
      icon: "💳",
      title: "Hỗ trợ thanh toán nhanh gọn",
    },
    {
      icon: "📈",
      title: "Đầu tư ít, lợi nhuận vẫn có thể tăng",
    },
  ];

  const features = [
    {
      title: "Chuyển Tiền",
      description: "Chuyển tiền miễn phí và an toàn tuyệt đối.",
      image: "https://jnt.asia/wp-content/uploads/2024/08/gioi-thieu-e-wallet-la-gi.jpg",
    },
    {
      title: "Thanh Toán Trước",
      description: "Thanh toán trước, nhận hàng sau chỉ với một cú nhấp chuột.",
      image: "https://img.freepik.com/free-photo/3d-payment-terminal-bank-card-blue-checkmark_107791-17014.jpg?semt=ais_hybrid",
    },
    {
      title: "Theo dõi tài chính",
      description: "Cập nhật lịch sử giao dịch theo thời gian thực.",
      image: "https://www.pymnts.com/wp-content/uploads/2022/11/digital-wallets-consumer-finance-bill-pay.jpg",
    },
  ];

  const featuresRight = [
    {
      icon: "⚙️",
      title: "Hỗ trợ kinh doanh nhỏ, gọn, tiện lợi",
    },
    {
      icon: "👤",
      title: "Đề xuất dịch vụ phù hợp cho bạn",
    },
    {
      icon: "🧩",
      title: "Giúp bạn tạo thói quen chi tiêu hợp lý",
    },
    {
      icon: "🔒",
      title: "Bảo mật thông tin an toàn tuyệt đối",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Tải ứng dụng FTOP",
    },
    { number: "2", title: "Nhập số điện thoại" },
    { number: "3", title: "Nhập mã xác thực" },
    { number: "4", title: "Tạo mật khẩu đăng nhập" },
    { number: "5", title: "Nhập thông tin" },
  ];
  const [latestStores, setLatestStores] = useState([]);
  const sectionRef = useRef(null);
  const scrollToSection = () => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchLatestStores = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/store/new");
        setLatestStores(response.data);
      } catch (error) {
        console.error("Error fetching latest stores:", error);
      }
    };

    fetchLatestStores();
  }, []);

  return (
    <div className="font-sans text-gray-700 bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md w-full">
        <div className="container mx-auto flex justify-between items-center py-3 px-4">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/9181/9181081.png"
              alt="Logo"
              className="w-10 h-10 mr-2"
            />
          </div>

          {/* Menu */}
          <nav className="hidden md:flex space-x-6 text-gray-800 font-medium">
            {/* Về FTOP */}
            <button className="group relative cursor-pointer hover:text-blue-500 transition duration-300">
              Contact
            </button>

            {/* Đối tác */}
            <button
              onClick={handleNavigate}
              className="group relative cursor-pointer hover:text-blue-500 transition duration-300"
            >
              About
            </button>

            {/* Đăng nhập/Đăng ký */}
            <button
              className="group relative px-4 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-300"
              onClick={() =>
                (window.location.href =
                  "http://localhost:8000/api/auth/google/login")
              }
            >
              Sign In / Sign Up
            </button>
          </nav>
        </div>
      </header>

      <section className="relative w-full h-[600px] bg-gradient-to-b from-blue-100 to-white">
        {/* Background */}
        <div className="absolute inset-0 bg-cover bg-center">
          <img
            src="https://storage.unitedwebnetwork.com/files/744/67343dcbf64352214817a0d13cd676c4.png" // Thay bằng ảnh nền phù hợp
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Nội dung chính */}
        <div className="container mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between h-full px-6 md:px-12">
          {/* Phần trái: Nội dung văn bản */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-5xl font-bold text-gray-800 leading-tight">
              FTOP nay là <br />
              <span className="text-blue-500">Trợ thủ tài chính</span>
              <br /> với <span className="text-blue-500">cho sinh viên✨</span>
            </h1>
            <div className="relative group inline-block">
              <button
                onClick={scrollToSection}
                className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transition duration-300"
              >
                KHÁM PHÁ NGAY
              </button>
              <div className="absolute bottom-full left-1/2 mb-3 w-64 p-4 bg-gray-800 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition duration-300 z-10">
                FTOP - Người bạn đồng hành thông minh trong thế giới tài chính
                số. Không chỉ là một ví điện tử, FTOP mở ra cánh cửa tới sự tiện
                nghi và an toàn tuyệt đối.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          {/* Phần Nội Dung Bên Trái */}
          <div className="md:w-1/2 text-center md:text-left px-4">
            <div className="flex items-center mb-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/9181/9181081.png"
                alt="VNPay Logo"
                className="w-10 h-10 mr-2"
              />
              <h2 className="text-2xl font-bold text-blue-600">FTOP</h2>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Ví điện tử thiết kế dành riêng cho sinh viên Đại học FPT
            </h1>
            <p className="text-gray-600 mb-6">
              Đáp ứng đa dạng nhu cầu thanh toán các dịch vụ hàng ngày của sinh
              viên một cách nhanh chóng, tiện lợi, an toàn.
            </p>
          </div>

          {/* Phần Hình Ảnh Bên Phải */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src={`${process.env.PUBLIC_URL}/assets/homepage.gif`}
              alt="Family Illustration"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      <section ref={sectionRef} className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-blue-500 text-center mb-8">
          Có gì trên FTOP?
        </h2>
        <div className="flex justify-center space-x-8 mb-8">
          <button className="text-blue-500 font-semibold border-b-2 border-blue-500">
            Cửa hàng
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestStores.map((store) => (
            <div
              key={store.storeId}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={store.storeImage[0]}
                alt={store.storeName}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">
                  {store.storeName}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {store.storeAddress}
                </p>
                <span className="text-gray-600 font-semibold text-sm">
                  Điện thoại: {store.storePhone}
                </span>
                <p className="text-gray-600 text-sm mb-4 hover:text-blue-600 hover:underline flex items-center">
                  <Link to={`/store/${store.storeId}`}>
                    <span>Xem chi tiết </span>
                    <FaArrowRight className="inline-block" />
                  </Link>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 text-gray-800">
        {/* Tiêu đề */}
        <h2 className="text-4xl font-bold text-blue-500 text-center mb-6">
          FTOP nay là Trợ Thủ Tài Chính với sinh viên Đại học FPT
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Giúp bạn làm được nhiều thứ hơn với tiền với vô vàn tiện ích tài chính
          và sự trợ giúp của công nghệ
        </p>

        {/* Nội dung */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Cột trái */}
          <div className="space-y-8 md:w-1/3">
            {featuresLeft.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 text-blue-500 flex items-center justify-center rounded-full text-2xl mr-4">
                  {item.icon}
                </div>
                <p className="text-lg font-medium">{item.title}</p>
              </div>
            ))}
          </div>

          {/* Hình ảnh ở giữa */}
          <div className="md:w-1/3 flex justify-center mb-8 md:mb-0">
            <img
              src={`${process.env.PUBLIC_URL}/assets/homeApp.png`}
              alt="AI Feature"
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Cột phải */}
          <div className="space-y-8 md:w-1/3">
            {featuresRight.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-12 h-12 bg-green-100 text-green-500 flex items-center justify-center rounded-full text-2xl mr-4">
                  {item.icon}
                </div>
                <p className="text-lg font-medium">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          {/* Left: Image */}
          <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
            <img
              src={`${process.env.PUBLIC_URL}/assets/homeftop.png`}
              alt="MoMo App Download"
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Right: Steps */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold text-blue-500 mb-6">
              Ba bước trở thành khách hàng FTOP
            </h2>

            {/* Tabs */}
            <div className="flex space-x-4 mb-8">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg">
                Tải Và Đăng Ký
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full">
                Liên Kết ZaloPay
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full">
                Nạp Tiền Vào Ví
              </button>
            </div>

            {/* Step List */}
            <ul>
              {steps.map((step, index) => (
                <li key={index} className="flex items-start mb-4">
                  <span
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold mr-4 ${
                      step.highlight ? "bg-blue-300" : "bg-blue-500"
                    }`}
                  >
                    {step.number}
                  </span>
                  <div>
                    <h4
                      className={`font-bold ${
                        step.highlight ? "text-blue-500" : "text-gray-800"
                      }`}
                    >
                      {step.title}
                    </h4>
                    {step.description && (
                      <p className="text-gray-600 text-sm">
                        {step.description}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-blue-500">
            Tính Năng Nổi Bật
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-white shadow-lg rounded">
                {/* Hình ảnh minh họa */}
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 text-gray-700 text-sm">
        <div className="text-center mt-8 border-t pt-6 text-gray-500">
          <p>SEP490-G90_FTOP</p>
          <p>
            Địa chỉ: Khu Giáo dục và Đào tạo – Khu Công nghệ cao Hòa Lạc – Km29
            Đại lộ Thăng Long, H. Thạch Thất, TP. Hà Nội.
          </p>
          <p>© Copyright SEP490-G90_FTOP</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
