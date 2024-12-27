import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function StoreDetail() {
  const { storeId } = useParams();
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchStoreDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/store/${storeId}`
        );
        setStore(response.data.store);
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching store details:", error);
      }
    };

    fetchStoreDetail();
  }, [storeId]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Store Header */}
      {store ? (
        <div>
          <div className="relative w-full h-60 bg-cover bg-center" style={{ backgroundImage: `url(${store.storeImage[0]})` }}>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                {store.storeName}
              </h1>
            </div>
          </div>

          {/* Store Info */}
          <div className="bg-white shadow-md rounded-lg p-6 mx-auto my-6 max-w-4xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Thông Tin Cửa Hàng</h2>
            <p className="text-gray-600">
              <strong>Địa chỉ:</strong> {store.storeAddress}
            </p>
            <p className="text-gray-600">
              <strong>Điện thoại:</strong> {store.storePhone}
            </p>
          </div>

          {/* Product List */}
          <div className="max-w-6xl mx-auto p-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Danh Sách Sản Phẩm
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.productId}
                  className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300"
                >
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {product.productName}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Giá: <span className="text-green-600 font-bold">${product.productPrice}</span>
                    </p>
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition duration-300">
                      Xem Chi Tiết
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <p className="text-xl text-gray-600 animate-pulse">
            Đang tải thông tin cửa hàng...
          </p>
        </div>
      )}
    </div>
  );
}

export default StoreDetail;
