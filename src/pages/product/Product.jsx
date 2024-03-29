import React from "react";
import LeftPageHome from "../../components/LeftPageHome";
import RightTopPageHome from "../../components/RightTopPageHome";
import Footer from "../../components/Footer";
import ManagerProduct from "../../components/product/ManagerProduct";

const Product = () => {
  return (
    <div className="bg-gray-100 font-family-karla flex">
      <LeftPageHome />
      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        <RightTopPageHome />
        <ManagerProduct />
        <Footer />
      </div>
    </div>
  );
};

export default Product;
