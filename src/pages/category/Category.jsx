import React from "react";
import LeftPageDashboard from "../../components/LeftPageDashboard";
import RightTopPageDashboard from "../../components/RightTopPageDashboard";
import ManagerCategory from "../../components/category/ManagerCategory";
import Footer from "../../components/Footer";

const Category = () => {
  return (
    <div className="bg-gray-100 flex">
      <LeftPageDashboard />
      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        <RightTopPageDashboard />
        <ManagerCategory />
        <Footer />
      </div>
    </div>
  );
};

export default Category;
