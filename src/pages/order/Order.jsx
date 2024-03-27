import React from "react";
import RightTopPageHome from "../../components/RightTopPageHome";
import LeftPageHome from "../../components/LeftPageHome";
import Footer from "../../components/Footer";
import ManagerOrder from "./ManagerOrder";

const Order = () => {
  return (
    <div className="bg-gray-100 font-family-karla flex">
      <LeftPageHome />
      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        <RightTopPageHome />
        <ManagerOrder />
        <Footer />
      </div>
    </div>
  );
};

export default Order;
