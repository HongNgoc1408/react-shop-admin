import React from "react";
import LeftPageDashboard from "../../components/LeftPageDashboard";
import RightTopPageDashboard from "../../components/RightTopPageDashboard";
import { FaEye } from "react-icons/fa";
import FormViewUser from "../../components/user/FormViewUser";
import { Footer } from "flowbite-react";

const ViewDetailsUsers = () => {
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
                    <FaEye className="mr-3" /> View User
                  </p>
                  <div className="leading-loose">
                    <FormViewUser />
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

export default ViewDetailsUsers;
