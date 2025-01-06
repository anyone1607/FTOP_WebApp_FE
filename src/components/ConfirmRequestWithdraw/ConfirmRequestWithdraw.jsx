// import React, { useEffect, useState } from "react";

// const ConfirmRequestWithdraw = () => {
//   const [withdrawRequests, setWithdrawRequests] = useState([]);
//   const [bankLogos, setBankLogos] = useState({});

//   useEffect(() => {
//     const fetchBanks = async () => {
//       try {
//         const response = await fetch("https://api.vietqr.io/v2/banks");
//         const data = await response.json();
//         if (data.code === "00" && Array.isArray(data.data)) {
//           const logos = data.data.reduce((acc, bank) => {
//             acc[bank.name] = bank.logo;
//             return acc;
//           }, {});
//           setBankLogos(logos);
//         } else {
//           console.error("Unexpected API response:", data);
//         }
//       } catch (error) {
//         console.error("Error fetching bank logos:", error);
//       }
//     };

//     fetchBanks();
//   }, []);

//   useEffect(() => {
//     const savedRequests =
//       JSON.parse(localStorage.getItem("withdrawRequests")) || [];
//     setWithdrawRequests(savedRequests);
//   }, []);

//   return (
//     <div className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
//       <h1 className="text-2xl font-bold mb-6">Danh sách yêu cầu rút tiền</h1>
//       <table className="table-auto w-full border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border px-4 py-2">STT</th>
//             <th className="border px-4 py-2">Ngân Hàng</th>
//             <th className="border px-4 py-2">Số Tài Khoản</th>
//             <th className="border px-4 py-2">Số Tiền</th>
//             <th className="border px-4 py-2">Trạng Thái</th>
//           </tr>
//         </thead>
//         <tbody>
//           {withdrawRequests.map((request, index) => (
//             <tr key={request.stt} className="hover:bg-gray-50">
//               <td className="border px-4 py-2 text-center">{index + 1}</td>
//               <td className="border px-4 py-2 flex items-center gap-2">
//                 <img
//                   src={bankLogos[request.bankName]}
//                   alt={request.bankName}
//                   className="w-20 h-10 object-contain"
//                   onError={(e) => (e.target.style.display = "none")}
//                 />
//                 <span>{request.bankName}</span>
//               </td>
//               <td className="border px-4 py-2 text-center">
//                 {request.accountNumber}
//               </td>
//               <td className="border px-4 py-2 text-right">{request.amount}</td>
//               {/* <td className="border px-4 py-2 text-center">
//                 <span className="px-2 py-1 rounded bg-yellow-500 text-white text-sm">
//                   {request.status}
//                 </span>
//               </td> */}
//               <td className="border border-gray-300 px-4 py-2 text-center">
//                 <span
//                   className={`px-2 py-1 rounded text-white text-sm font-semibold ${
//                     request.status === "Pending"
//                       ? "bg-yellow-500"
//                       : request.status === "Process"
//                       ? "bg-blue-500"
//                       : request.status === "Failed"
//                       ? "bg-red-500"
//                       : "bg-green-500"
//                   }`}
//                 >
//                   {request.status}
//                 </span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ConfirmRequestWithdraw;

import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

const ConfirmRequestWithdraw = () => {
  const [withdrawRequests, setWithdrawRequests] = useState([]);
  const [bankLogos, setBankLogos] = useState({});
  const [userRole, setUserRole] = useState(localStorage.getItem('role'));
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const email = params.get('email');
    const role = params.get('role');
    const name = params.get('name');
  
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      localStorage.setItem('role', role);
      localStorage.setItem('name', name);
      setUserRole(role); // Set the user role state
    }
  }, [location]);

  const updateStatus = (index, newStatus) => {
    const updatedRequests = [...withdrawRequests];
    updatedRequests[index].status = newStatus;
    setWithdrawRequests(updatedRequests);
    localStorage.setItem('withdrawRequests', JSON.stringify(updatedRequests));
  };

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await fetch("https://api.vietqr.io/v2/banks");
        const data = await response.json();
        if (data.code === "00" && Array.isArray(data.data)) {
          const logos = data.data.reduce((acc, bank) => {
            acc[bank.name] = bank.logo;
            return acc;
          }, {});
          setBankLogos(logos);
        } else {
          console.error("Unexpected API response:", data);
        }
      } catch (error) {
        console.error("Error fetching bank logos:", error);
      }
    };

    fetchBanks();
  }, []);

  useEffect(() => {
    const savedRequests =
      JSON.parse(localStorage.getItem("withdrawRequests")) || [];
    setWithdrawRequests(savedRequests);
  }, []);

  return (
    <div className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Danh sách yêu cầu rút tiền
      </h1>
      {/* Wrapper for responsiveness */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">STT</th>
              <th className="border px-4 py-2">Ngân Hàng</th>
              <th className="border px-4 py-2">Số Tài Khoản</th>
              <th className="border px-4 py-2">Số Tiền</th>
              <th className="border px-4 py-2">Trạng Thái</th>
              {userRole === 'admin' && <th className="border px-4 py-2">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {withdrawRequests.map((request, index) => (
              <tr key={request.stt} className="hover:bg-gray-50">
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2 flex items-center gap-2">
                  <img
                    src={bankLogos[request.bankName]}
                    alt={request.bankName}
                    className="w-10 h-10 object-contain"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                  <span>{request.bankName}</span>
                </td>
                <td className="border px-4 py-2 text-center">
                  {request.accountNumber}
                </td>
                <td className="border px-4 py-2 text-right">
                  {request.amount}
                </td>
                <td className="border px-4 py-2 text-center">
                  <span
                    className={`px-2 py-1 rounded text-white text-sm font-semibold ${
                      request.status === "Pending"
                        ? "bg-yellow-500"
                        : request.status === "Process"
                        ? "bg-blue-500"
                        : request.status === "Failed"
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="border px-4 py-2 text-center">
                {userRole === 'admin' && request.status === 'Pending' && (
                  <>
                    <button
                      className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
                      onClick={() => updateStatus(index, 'Process')}
                    >
                      Process
                    </button>
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded"
                      onClick={() => updateStatus(index, 'Rejected')}
                    >
                      Reject
                    </button>
                  </>
                )}
                {userRole === 'staff' && request.status === 'Process' && (
                  <button
                    className="px-2 py-1 bg-green-500 text-white rounded"
                    onClick={() => updateStatus(index, 'Success')}
                  >
                    Complete
                  </button>
                )}
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConfirmRequestWithdraw;
