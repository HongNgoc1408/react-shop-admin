import React from "react";
import LeftPageHome from "../../components/LeftPageHome";
import RightTopPageHome from "../../components/RightTopPageHome";
import ManagerCategory from "./ManagerCategory";
import Footer from "../../components/Footer";

const Category = () => {
  return (
    <div className="bg-gray-100 font-family-karla flex">
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
