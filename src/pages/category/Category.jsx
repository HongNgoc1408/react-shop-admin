import React from "react";
import LeftPageHome from "../../components/LeftPageHome";
import RightTopPageHome from "../../components/RightTopPageHome";
import ManagerCategory from "../../components/category/ManagerCategory";
import Footer from "../../components/Footer";

const Category = () => {
  return (
    <div className="bg-gray-100 flex">
      <LeftPageHome />
      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        <RightTopPageHome />
        <ManagerCategory />
        <Footer />
      </div>
    </div>
  );
};

export default Category;
