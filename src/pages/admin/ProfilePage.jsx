import React from "react";
import ProfileCard from "../../components/admin/ProfileCard";
import LeftPageDashboard from "../../components/LeftPageDashboard";
import RightTopPageDashboard from "../../components/RightTopPageDashboard";
import RightBottomPageDashboard from "../../components/RightBottomPageDashboard";
import Footer from "../../components/Footer";

const ProfilePage = () => {
  return (
    <div className="bg-gray-100 flex">
      <LeftPageDashboard />
      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        <RightTopPageDashboard />
        {/* <RightBottomPageDashboard /> */}
        <div className="bg-primaryBG py-12 px-4">
          <div className="h-full">
            <ProfileCard />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ProfilePage;
