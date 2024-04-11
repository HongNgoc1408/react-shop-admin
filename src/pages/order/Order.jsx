import React from "react";
import RightTopPageDashboard from "../../components/RightTopPageDashboard";
import LeftPageDashboard from "../../components/LeftPageDashboard";
import Footer from "../../components/Footer";
import ManagerOrder from "../../components/order/ManagerOrder";

const Order = () => {
  return (
    <div className="bg-gray-100 font-family-karla flex">
      <LeftPageDashboard />
      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        <RightTopPageDashboard />
        <ManagerOrder />
        <Footer />
      </div>
    </div>
  );
};

export default Order;
