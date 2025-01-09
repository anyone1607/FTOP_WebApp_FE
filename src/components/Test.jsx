import React from "react";

function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white py-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Liên Hệ Với Chúng Tôi</h1>
          <p className="mt-2 text-lg">Giới thiệu về ví điện tử FTOP</p>
        </div>
      </header>

      {/* Nội dung chính */}
      <main className="flex-grow container mx-auto px-4 py-12">
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Giới Thiệu Về FTOP
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            FTOP là ví điện tử tiên tiến, an toàn và tiện lợi giúp bạn quản lý tài chính một cách hiệu quả. 
            Với FTOP, bạn có thể thực hiện chuyển tiền, thanh toán trực tuyến, theo dõi giao dịch và nhiều 
            tính năng thông minh khác chỉ trong vài cú nhấp chuột. Sứ mệnh của chúng tôi là mang đến 
            trải nghiệm tài chính tốt nhất cho người dùng.
          </p>
        </section>

        <section className="max-w-xl mx-auto bg-white p-8 shadow-lg rounded">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Gửi Yêu Cầu Liên Hệ
          </h3>
          <form className="space-y-4">
            <div>
              <label className="block text-left text-gray-700 mb-1" htmlFor="name">
                Họ và tên
              </label>
              <input
                type="text"
                id="name"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Nhập họ và tên của bạn"
              />
            </div>
            <div>
              <label className="block text-left text-gray-700 mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Nhập email của bạn"
              />
            </div>
            <div>
              <label className="block text-left text-gray-700 mb-1" htmlFor="message">
                Tin nhắn
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Nhập tin nhắn của bạn"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Gửi
            </button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>© {new Date().getFullYear()} FTOP. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default ContactPage;

