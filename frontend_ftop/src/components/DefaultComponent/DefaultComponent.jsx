import React from "react";
import SidebarComponent from "../SidebarComponent/SidebarComponent";
const DefaultComponent = ({ children }) => {
  return (
    <div>
      <SidebarComponent />
      {children}
    </div>
  );
};

export default DefaultComponent;
