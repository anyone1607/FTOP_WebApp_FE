import React from "react";
import { useNavigate } from "react-router-dom";
const paymentMethods = [
  {
    name: "Quét Mã QR Thanh Toán",
    icon: "https://media.istockphoto.com/id/1095468748/vi/vec-to/m%C3%A3-qr-m%E1%BA%ABu-m%C3%A3-v%E1%BA%A1ch-hi%E1%BB%87n-%C4%91%E1%BA%A1i-vector-tr%E1%BB%ABu-t%C6%B0%E1%BB%A3ng-%C4%91%E1%BB%83-qu%C3%A9t-%C4%91i%E1%BB%87n-tho%E1%BA%A1i-th%C3%B4ng-minh-b%E1%BB%8B-c%C3%B4-l%E1%BA%ADp-tr%C3%AAn.jpg?s=612x612&w=0&k=20&c=nCjpoa8qW4lREJGqVCQZsWcrKGOcKKuy5RSsSVzqlL8=",
  },
  {
    name: "Chuyển Khoản",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR06mEeOPVMD8-o8uzcfLq3xJQGSYEcEfeA1Q&s",
  },
  {
    name: "PayPal",
    icon: "https://cdn.pixabay.com/photo/2018/05/08/21/29/paypal-3384015_640.png",
  },
  {
    name: "Chuyển Khoản Ngân Hàng",
    icon: "https://media.istockphoto.com/id/1465234647/vi/vec-to/ng%C3%A2n-h%C3%A0ng-c%C3%B3-k%C3%BD-hi%E1%BB%87u-%C4%91%C3%B4-la-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-c%C3%B3-h%C3%ACnh-%E1%BA%A3nh-ph%E1%BA%A3n-chi%E1%BA%BFu-tr%C3%AAn-n%E1%BB%81n-tr%E1%BA%AFng.jpg?s=612x612&w=0&k=20&c=ZzY8MClKFUIxdN9DtXN1pEKTCBVMgmEcgnVzBplYpX4=",
    link: "/auth/system/withdraw/detail",
  },
  {
    name: "Momopay-Qrcode",
    icon: "https://homepage.momocdn.net/img/logo-momo.png",
  },
  {
    name: "Zalopay-Qrcode",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe6SEQ293X0nfFojf6nsCWKA8dNGOrqn21jg&s",
  },
  {
    name: "ViettelPay",
    icon: "https://mangviettel.com.vn/wp-content/uploads/2021/06/viettelpay.jpg",
  },
];

const Card = ({ icon, name, onClick }) => (
  <div
    onClick={onClick}
    className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
  >
    <img src={icon} alt={name} className="w-12 h-12 mb-2" />
    <span className="text-gray-700 text-sm font-semibold">{name}</span>
  </div>
);

const WithdrawMoney = () => {
  const navigate = useNavigate();

  const handleClick = (method) => {
    if (method.link) {
      navigate(method.link);
    }
  };
  
  return (
      <div className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Phương thức thanh toán
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {paymentMethods.map((method, index) => (
              <Card
                key={index}
                icon={method.icon}
                name={method.name}
                onClick={() => handleClick(method)}
              />
            ))}
          </div>
        </section>
      </div>
  );
};

export default WithdrawMoney;
