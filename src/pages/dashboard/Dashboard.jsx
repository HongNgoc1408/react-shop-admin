import React from "react";
import LeftPageDashboard from "../../components/LeftPageDashboard";
import RightTopPageDashboard from "../../components/RightTopPageDashboard";
import RightBottomPageDashboard from "../../components/RightBottomPageDashboard";
// import Footer from "../../components/Footer";

const Dashboard = () => {
  return (
    <div className="bg-gray-100 flex">
      <LeftPageDashboard />
      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        <RightTopPageDashboard />
        <RightBottomPageDashboard />
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Dashboard;
