import React from "react";
import { Outlet } from "react-router-dom";
import SidebarComponent from "../../components/SidebarComponent/SidebarComponent";

const AdminPage = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarComponent />
      <div className="flex-1 p-0 bg-gray-100 relative overflow-auto ">
        <div className="mt-6 p-4 relative z-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
