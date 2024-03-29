import React from "react";
import {
  FaAlignLeft,
  FaArrowCircleUp,
  FaCalendar,
  FaPlus,
  FaStickyNote,
  FaTable,
  FaTablet,
  FaTabletAlt,
  FaTachometerAlt,
} from "react-icons/fa";
import logo from "/images/zara-logo.png";

const LeftPageHome = () => {
  return (
    <div className="relative bg-sidebar h-screen w-64 hidden sm:block shadow-xl">
      <div className="p-6">
        <a href="/">
          <img src={logo} alt="logo" />
        </a>
        <button className="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
          <FaPlus className="mr-3" /> New Report
        </button>
      </div>
      <nav className="text-white text-base font-semibold pt-3">
        <a href="/" className="title_cols">
          <FaTachometerAlt className="mr-3" />
          Dashboard
        </a>
        <a href="/category" className="title_cols">
          <FaStickyNote className="mr-3" />
          Manager Category
        </a>
        <a href="/product" className="title_cols">
          <FaTable className="mr-3" />
          Manager Products
        </a>
        <a href="/order" className="title_cols">
          <FaAlignLeft className="mr-3" />
          Manager Order
        </a>
        <a href="/user" className="title_cols">
          <FaTabletAlt className="mr-3" />
          Manager Users
        </a>
        <a href="#" className="title_cols">
          <FaCalendar className="mr-3" />
          Manager Contact
        </a>
      </nav>

      {/* <a
        href="/home"
        className="absolute w-full upgrade-btn bottom-0 active-nav-link text-white flex items-center justify-center py-4"
      >
        <FaArrowCircleUp className="mr-3" />
        Upgrade to Pro!
      </a> */}
    </div>
  );
};

export default LeftPageHome;
