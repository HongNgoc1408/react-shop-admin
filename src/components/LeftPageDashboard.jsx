import React, { useState } from "react";
import {
  FaArrowCircleLeft,
  FaFilter,
  FaPhoneAlt,
  FaPlus,
  FaShoppingBag,
  FaTachometerAlt,
  FaTshirt,
  FaUser,
} from "react-icons/fa";
import logo from "/images/zara-logo.png";

const LeftPageDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <div className="relative bg-sidebar h-screen w-56 hidden sm:block shadow-xl">
          <div className="p-6">
            <a href="/dashboard">
              <img src={logo} alt="logo" />
            </a>
            <button className="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
              <FaPlus className="mr-3 size-5" /> New Report
            </button>
          </div>
          <nav className="text-white text-base font-semibold pt-3">
            <a href="/dashboard" className="title_cols">
              <FaTachometerAlt className="mr-3 size-5" />
              Dashboard
            </a>
            {/* <a href="/category" className="title_cols">
              <FaFilter className="mr-3 size-5" />
              Manager Category
            </a> */}
            <a href="/product" className="title_cols">
              <FaTshirt className="mr-3 size-5" />
              Manager Products
            </a>
            <a href="/order" className="title_cols">
              <FaShoppingBag className="mr-3 size-5" />
              Manager Order
            </a>
            <a href="/user" className="title_cols">
              <FaUser className="mr-3 size-5" />
              Manager Users
            </a>
            {/* <a href="#" className="title_cols">
              <FaPhoneAlt className="mr-3 size-5" />
              Manager Contact
            </a> */}
          </nav>

          <span
            onClick={() => setIsOpen(true)}
            className="absolute w-full bottom-0 active-nav-link text-white flex items-center justify-center py-4"
          >
            <FaArrowCircleLeft className="m-auto size-5" />
          </span>
        </div>
      )}
      {isOpen && (
        <div className="relative bg-sidebar h-screen w-20 sm:block shadow-xl">
          <div className="p-6">
            <a href="/dashboard">
              <img src={logo} alt="logo" />
            </a>
            <button className="px-1 bg-white cta-btn font-semibold py-1 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
              <FaPlus />
            </button>
          </div>
          <nav className="text-white text-base font-semibold pt-3">
            <a href="/dashboard" className="title_cols">
              <FaTachometerAlt className="ml-1 size-5" />
            </a>
            {/* <a href="/category" className="title_cols">
              <FaFilter className="ml-1 size-5" />
            </a> */}
            <a href="/product" className="title_cols">
              <FaTshirt className="ml-1 size-5" />
            </a>
            <a href="/order" className="title_cols">
              <FaShoppingBag className="ml-1 size-5" />
            </a>
            <a href="/user" className="title_cols">
              <FaUser className="ml-1 size-5" />
            </a>
            {/* <a href="#" className="title_cols">
              <FaPhoneAlt className="ml-1 size-5" />
            </a> */}
          </nav>

          <span
            onClick={() => setIsOpen(false)}
            className="absolute w-full bottom-0 active-nav-link text-white flex items-center justify-center py-4"
          >
            <FaArrowCircleLeft className="m-auto size-5" />
          </span>
        </div>
      )}
    </>
  );
};

export default LeftPageDashboard;
