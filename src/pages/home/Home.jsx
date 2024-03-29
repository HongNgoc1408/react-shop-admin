import React from "react";
import LeftPageHome from "../../components/LeftPageHome";
import RightTopPageHome from "../../components/RightTopPageHome";
import RightBottomPageHome from "../../components/RightBottomPageHome";
// import Footer from "../../components/Footer";

const Home = () => {
  return (
    <div className="bg-gray-100 flex">
      <LeftPageHome />
      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        <RightTopPageHome />
        <RightBottomPageHome />
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Home;
