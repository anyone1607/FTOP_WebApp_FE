import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaTrash, FaUndoAlt } from "react-icons/fa";
import Modal from "react-modal";  // Import react-modal
import './VoucherManagement.css'


const VoucherManagement = () => {
  const [vouchers, setVouchers] = useState([]);
  const [selectedVoucherId, setSelectedVoucherId] = useState(null);
  const [voucherDetails, setVoucherDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deletedVouchers, setDeletedVouchers] = useState([]);
  const [showDeletedVouchers, setShowDeletedVouchers] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchVouchersData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/voucher");
      setVouchers(response.data?.vouchers || response.data || []);
    } catch (error) {
      console.error("Error fetching vouchers:", error);
    }
  };

  const fetchDeletedVouchers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/voucher/deleted");
      setDeletedVouchers(response.data || []);
    } catch (error) {
      console.error("Error fetching deleted vouchers:", error);
    }
  };

  const fetchVoucherDetails = async (voucherId) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/voucher/${voucherId}`);
      setVoucherDetails(response.data || {});
    } catch (error) {
      console.error("Error fetching voucher details:", error);
    } finally {
      setLoading(false);
    }
  };

  // xoá mềm call api lại đến voucher data vs deletedvoucher (done)
  const softDeleteVoucher = async (voucherId) => {
    try {
      await axios.patch(`http://localhost:8000/api/voucher/${voucherId}/delete`);
      fetchVouchersData();
      fetchDeletedVouchers();
    } catch (error) {
      console.error("Error deleting voucher:", error);
    }
  }


  const restoreVoucher = async (voucherId) => {
    try {
      await axios.patch(`http://localhost:8000/api/voucher/${voucherId}/restore`);
      fetchDeletedVouchers();
      fetchVouchersData();
    } catch (error) {
      console.error("Error restoring voucher:", error);
    }
  };

  const permanentlyDeleteVoucher = async (voucherId) => {
    try {
      await axios.delete(`http://localhost:8000/api/voucher/${voucherId}`);
      fetchDeletedVouchers();
    } catch (error) {
      console.error("Error permanently deleting voucher:", error);
    }
  };

  useEffect(() => {
    fetchVouchersData();
    fetchDeletedVouchers();
  }, []);

  const toggleVoucherDetails = (voucherId) => {
    if (selectedVoucherId === voucherId) {
      setSelectedVoucherId(null);
      setVoucherDetails(null);
    } else {
      setSelectedVoucherId(voucherId);
      fetchVoucherDetails(voucherId);
    }
  };
  const openModal = () => {
    setIsModalOpen(true); // Open modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
  };

  // return (
  //   <div className="container mx-auto p-6">
  //     <div className="flex items-center mb-4 justify-between">
  //       <h1 className="text-2xl font-bold text-center flex-grow">Voucher Management</h1>
  //     </div>
  //     <button
  //       onClick={() => setShowDeletedVouchers(!showDeletedVouchers)}
  //       className="bg-red-500 text-white px-3 py-2 rounded flex items-center hover:bg-red-600 transition duration-300"
  //     >
  //       <FaTrash className="mr-2" />
  //       {deletedVouchers.length} Deleted Vouchers
  //     </button>

  //     {/* Active Vouchers Table */}
  //     <div className="overflow-x-auto">
  //       <h2 className="text-lg font-semibold mb-2">Active Vouchers</h2>
  //       <table className="min-w-full table-auto bg-white shadow-md rounded-lg mb-6">
  //         <thead>
  //           <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
  //             <th className="py-3 px-6 text-left">Voucher ID</th>
  //             <th className="py-3 px-6 text-left">Voucher Name</th>
  //             <th className="py-3 px-6 text-left">Discount (%)</th>
  //             <th className="py-3 px-6 text-left">Store</th>
  //             <th className="py-3 px-6 text-left">Expired Date</th>
  //             <th className="py-3 px-6 text-left">Actions</th>
  //           </tr>
  //         </thead>
  //         <tbody className="text-gray-600 text-sm font-light">
  //           {vouchers.length > 0 ? (
  //             vouchers.map((voucher) => (
  //               <React.Fragment key={voucher.voucherId}>
  //                 <tr className="border-b border-gray-200 hover:bg-gray-100">
  //                   <td className="py-3 px-6 text-left">{voucher.voucherId}</td>
  //                   <td className="py-3 px-6 text-left">{voucher.voucherName}</td>
  //                   <td className="py-3 px-6 text-left">{voucher.voucherDiscount}%</td>
  //                   <td className="py-3 px-6 text-left">{voucher.store?.storeName}</td>
  //                   <td className="py-3 px-6 text-left">
  //                     {new Date(voucher.expiredDate).toLocaleDateString()}
  //                   </td>
  //                   <td className="py-3 px-6 flex space-x-2">
  //                     <button
  //                       onClick={() => toggleVoucherDetails(voucher.voucherId)}
  //                       className="bg-blue-500 text-white px-2 py-1 rounded flex items-center hover:text-blue-700 transition duration-300"
  //                     >
  //                       <FaEye className="mr-1" /> View
  //                     </button>
  //                     <button
  //                       onClick={() => softDeleteVoucher(voucher.voucherId)}
  //                       className="bg-red-500 text-white px-2 py-1 rounded flex items-center hover:bg-red-600"
  //                     >
  //                       <FaTrash className="mr-1" /> Delete
  //                     </button>
  //                   </td>
  //                 </tr>
  //                 {selectedVoucherId === voucher.voucherId && (
  //                   <tr>
  //                     <td colSpan="6">
  //                       <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
  //                         {loading ? (
  //                           <div>Loading...</div>
  //                         ) : (
  //                           <div>
  //                             <h3 className="font-semibold text-lg">Voucher Details</h3>
  //                             <p><strong>Voucher ID:</strong> {voucherDetails.voucherId}</p>
  //                             <p><strong>Voucher Name:</strong> {voucherDetails.voucherName}</p>
  //                             <p><strong>Discount Percentage:</strong> {voucherDetails.voucherDiscount}%</p>
  //                             <p><strong>Store:</strong> {voucherDetails.store?.storeName}</p>
  //                             <p><strong>Expired Date:</strong> {new Date(voucherDetails.expiredDate).toLocaleDateString()}</p>
  //                             <p><strong>Orders Applied:</strong> {voucherDetails.order?.length}</p>
  //                           </div>
  //                         )}
  //                       </div>
  //                     </td>
  //                   </tr>
  //                 )}
  //               </React.Fragment>
  //             ))
  //           ) : (
  //             <tr>
  //               <td colSpan="6" className="text-center py-3 px-6">
  //                 No vouchers found.
  //               </td>
  //             </tr>
  //           )}
  //         </tbody>
  //       </table>
  //     </div>

  //     {/* Conditionally render Deleted Vouchers table */}
  //     {showDeletedVouchers && (
  //       <div className="overflow-x-auto">
  //         <h2 className="text-lg font-semibold mb-2">Deleted Vouchers</h2>
  //         <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
  //           <thead>
  //             <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
  //               <th className="py-3 px-6 text-left">Voucher ID</th>
  //               <th className="py-3 px-6 text-left">Voucher Name</th>
  //               <th className="py-3 px-6 text-left">Discount (%)</th>
  //               <th className="py-3 px-6 text-left">Store</th>
  //               <th className="py-3 px-6 text-left">Actions</th>
  //             </tr>
  //           </thead>
  //           <tbody className="text-gray-600 text-sm font-light">
  //             {deletedVouchers.length > 0 ? (
  //               deletedVouchers.map((voucher) => (
  //                 <tr key={voucher.voucherId} className="border-b border-gray-200 hover:bg-gray-100">
  //                   <td className="py-3 px-6 text-left">{voucher.voucherId}</td>
  //                   <td className="py-3 px-6 text-left">{voucher.voucherName}</td>
  //                   <td className="py-3 px-6 text-left">{voucher.voucherDiscount}%</td>
  //                   <td className="py-3 px-6 text-left">{voucher.store?.storeName}</td>
  //                   <td className="py-3 px-6 flex space-x-2">
  //                     <button
  //                       onClick={() => restoreVoucher(voucher.voucherId)}
  //                       className="bg-green-500 text-white px-2 py-1 rounded flex items-center hover:bg-green-600 transition duration-300"
  //                     >
  //                       <FaUndoAlt className="mr-1" /> Restore
  //                     </button>
  //                     <button
  //                       onClick={() => permanentlyDeleteVoucher(voucher.voucherId)}
  //                       className="bg-red-500 text-white px-2 py-1 rounded flex items-center hover:bg-red-600 transition duration-300"
  //                     >
  //                       <FaTrash className="mr-1" /> Permanently Delete
  //                     </button>
  //                   </td>
  //                 </tr>
  //               ))
  //             ) : (
  //               <tr>
  //                 <td colSpan="5" className="text-center py-3 px-6">No deleted vouchers found.</td>
  //               </tr>
  //             )}
  //           </tbody>
  //         </table>
  //       </div>
  //     )}
  //   </div>
  // );
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-4 justify-between">
        <h1 className="text-2xl font-bold text-center flex-grow">Voucher Management</h1>
      </div>
      <button
        onClick={openModal} // Open modal when clicked
        className="bg-red-500 text-white px-3 py-2 rounded flex items-center hover:bg-red-600 transition duration-300"
      >
        <FaTrash className="mr-2" />
        {deletedVouchers.length} Deleted Vouchers
      </button>

      {/* Active Vouchers Table */}
      <div className="overflow-x-auto">
        <h2 className="text-lg font-semibold mb-2">Active Vouchers</h2>
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg mb-6">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
              <th className="py-3 px-6 text-left">Voucher ID</th>
              <th className="py-3 px-6 text-left">Voucher Name</th>
              <th className="py-3 px-6 text-left">Discount (%)</th>
              <th className="py-3 px-6 text-left">Store</th>
              <th className="py-3 px-6 text-left">Expired Date</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {vouchers.length > 0 ? (
              vouchers.map((voucher) => (
                <React.Fragment key={voucher.voucherId}>
                  <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">{voucher.voucherId}</td>
                    <td className="py-3 px-6 text-left">{voucher.voucherName}</td>
                    <td className="py-3 px-6 text-left">{voucher.voucherDiscount}%</td>
                    <td className="py-3 px-6 text-left">{voucher.store?.storeName}</td>
                    <td className="py-3 px-6 text-left">
                      {new Date(voucher.expiredDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-6 flex space-x-2">
                      <button
                        onClick={() => toggleVoucherDetails(voucher.voucherId)}
                        className="bg-blue-500 text-white px-2 py-1 rounded flex items-center hover:text-blue-700 transition duration-300"
                      >
                        <FaEye className="mr-1" /> View
                      </button>
                      <button
                        onClick={() => softDeleteVoucher(voucher.voucherId)}
                        className="bg-red-500 text-white px-2 py-1 rounded flex items-center hover:bg-red-600"
                      >
                        <FaTrash className="mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                  {selectedVoucherId === voucher.voucherId && (
                    <tr>
                      <td colSpan="6">
                        <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                          {loading ? (
                            <div>Loading...</div>
                          ) : (
                            <div>
                              <h3 className="font-semibold text-lg">Voucher Details</h3>
                              <p><strong>Voucher ID:</strong> {voucherDetails.voucherId}</p>
                              <p><strong>Voucher Name:</strong> {voucherDetails.voucherName}</p>
                              <p><strong>Discount Percentage:</strong> {voucherDetails.voucherDiscount}%</p>
                              <p><strong>Store:</strong> {voucherDetails.store?.storeName}</p>
                              <p><strong>Expired Date:</strong> {new Date(voucherDetails.expiredDate).toLocaleDateString()}</p>
                              <p><strong>Orders Applied:</strong> {voucherDetails.order?.length}</p>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-3 px-6">
                  No vouchers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Deleted Vouchers */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal} // Close modal when clicked outside
        contentLabel="Deleted Vouchers"
        className="modal-content" // Custom class for styling
        overlayClassName="modal-overlay" // Custom class for overlay
        ariaHideApp={false} // Disable aria app for accessibility issues
      >
        <div className="modal-header flex justify-between items-center">
          <h2 className="text-lg font-semibold">Deleted Vouchers</h2>
          <button
            onClick={closeModal}
            className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600 transition duration-300"
          >
            X
          </button>
        </div>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                <th className="py-3 px-6 text-left">Voucher ID</th>
                <th className="py-3 px-6 text-left">Voucher Name</th>
                <th className="py-3 px-6 text-left">Store</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {deletedVouchers.length > 0 ? (
                deletedVouchers.map((voucher) => (
                  <tr key={voucher.voucherId} className="border-b border-gray-200">
                    <td className="py-3 px-6 text-left">{voucher.voucherId}</td>
                    <td className="py-3 px-6 text-left">{voucher.voucherName}</td>
                    <td className="py-3 px-6 text-left">{voucher.store?.storeName}</td>
                    <td className="py-3 px-6 flex space-x-2">
                      <button
                        onClick={() => restoreVoucher(voucher.voucherId)}
                        className="bg-green-500 text-white px-2 py-1 rounded flex items-center hover:bg-green-600 transition duration-300"
                      >
                        <FaUndoAlt className="mr-1" /> Restore
                      </button>
                      <button
                        onClick={() => permanentlyDeleteVoucher(voucher.voucherId)}
                        className="bg-red-500 text-white px-2 py-1 rounded flex items-center hover:bg-red-600 transition duration-300"
                      >
                        <FaTrash className="mr-1" /> Permanently Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-3 px-6">
                    No deleted vouchers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  );
  
};

export default VoucherManagement;

