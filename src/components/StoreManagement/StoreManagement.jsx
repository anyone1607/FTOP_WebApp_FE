import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTag } from "react-icons/fa";
const StoreManagement = () => {
  const [stores, setStores] = useState([]);
  const [selectedStoreId, setSelectedStoreId] = useState(null);

  const fetchStoresData = async () => {
    try {
      const storeResponse = await axios.get("http://localhost:8000/api/store");
      console.log(storeResponse.data);
      setStores(storeResponse.data?.stores || storeResponse.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchStoresData();
  }, []);

  const toggleVoucherList = (storeId) => {
    setSelectedStoreId(selectedStoreId === storeId ? null : storeId);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-4">
        <h1 className="text-2xl font-bold">Store Management</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
              <th className="py-3 px-6 text-left">Store ID</th>
              <th className="py-3 px-6 text-left">Store Name</th>
              <th className="py-3 px-6 text-left">Address</th>
              <th className="py-3 px-6 text-left">Phone</th>
              <th className="py-3 px-6 text-left">Owner ID</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Vouchers</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {stores.length > 0 ? (
              stores.map((store) => (
                <React.Fragment key={store.storeId}>
                  <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">{store.storeId}</td>
                    <td className="py-3 px-6 text-left">{store.storeName}</td>
                    <td className="py-3 px-6 text-left">
                      {store.storeAddress}
                    </td>
                    <td className="py-3 px-6 text-left">{store.storePhone}</td>
                    <td className="py-3 px-6 text-left">{store.ownerId}</td>
                    <td className="py-3 px-6 text-left">
                      {store.status ? (
                        <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
                          Active
                        </span>
                      ) : (
                        <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td
                      className="py-3 px-6 text-left cursor-pointer flex items-center"
                      onClick={() => toggleVoucherList(store.storeId)}
                    >
                      {store.vouchers.length > 0 ? (
                        <span className="flex items-center text-blue-500 font-semibold underline hover:text-blue-700">
                          <FaTag className="mr-2" />
                          {store.vouchers.length} Voucher(s)
                        </span>
                      ) : (
                        <span className="text-gray-500">
                          <FaTag className="mr-2" />
                          No vouchers
                        </span>
                      )}
                    </td>
                  </tr>
                  {selectedStoreId === store.storeId && (
                    <tr>
                      <td colSpan="7">
                        <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                          {/* <ul>
                            {store.vouchers.map((voucher) => (
                              <li key={voucher.voucherId} className="mb-2">
                                <span className="font-semibold">{voucher.voucherName}</span> - {voucher.voucherDiscount}
                              </li>
                            ))}
                          </ul> */}
                          {store.vouchers.length > 0 ? (
                            <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
                              <thead>
                                <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                                  <th className="py-3 px-6 text-left">
                                    Voucher ID
                                  </th>
                                  <th className="py-3 px-6 text-left">
                                    Voucher Name
                                  </th>
                                  <th className="py-3 px-6 text-left">
                                    Discount
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="text-gray-600 text-sm font-light">
                                {store.vouchers.map((voucher) => (
                                  <tr
                                    key={voucher.voucherId}
                                    className="border-b border-gray-200 hover:bg-gray-100"
                                  >
                                    <td className="py-3 px-6 text-left">
                                      {voucher.voucherId}
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                      {voucher.voucherName}
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                      {voucher.voucherDiscount}%
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            <p className="text-center py-3 px-6">
                              No vouchers found.
                            </p>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-3 px-6">
                  No stores found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StoreManagement;
