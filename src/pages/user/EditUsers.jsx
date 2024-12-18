import React from "react";
import { FaPen } from "react-icons/fa";
import Footer from "../../components/Footer";
import RightTopPageDashboard from "../../components/RightTopPageDashboard";
import LeftPageDashboard from "../../components/LeftPageDashboard";
import FormEditUser from "../../components/user/FormEditUser";

const EditUsers = () => {
  return (
    <>
      <div className="bg-gray-100 font-family-karla flex">
        <LeftPageDashboard />
        <div className="w-full flex flex-col h-screen overflow-y-hidden">
          <RightTopPageDashboard />
          <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
            <main className="w-full flex-grow p-6">
              <h1 className="text-3xl text-black pb-2">Manager Users</h1>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-full my-6 pr-0 lg:pr-2">
                  <p className="text-xl pb-6 flex items-center">
                    <FaPen className="mr-3" /> Edit Users
                  </p>
                  <div className="leading-loose">
                    <FormEditUser />
                  </div>
                </div>
              </div>
            </main>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default EditUsers;
