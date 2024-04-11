import React, { useState } from "react";
import ViewUsers from "./ViewUsers";
import AddUsers from "./AddUsers";
import Footer from "../../components/Footer";
import RightTopPageDashboard from "../../components/RightTopPageDashboard";
import LeftPageDashboard from "../../components/LeftPageDashboard";

const ManagerUsers = () => {
  const [openTab, setOpenTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setOpenTab(tabNumber);
  };

  const renderTabContent = () => {
    switch (openTab) {
      case 1:
        return <ViewUsers />;
      case 2:
        return <AddUsers />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="bg-gray-100 font-family-karla flex">
        <LeftPageDashboard />
        <div className="w-full flex flex-col h-screen overflow-y-hidden">
          <RightTopPageDashboard />
          <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
            <main className="w-full flex-grow p-6">
              <h1 className="text-3xl text-black pb-6">Manager Users</h1>

              <div className="w-full">
                <div>
                  <ul className="flex border-b">
                    {[1, 2].map((tabNumber) => (
                      <li key={tabNumber} className="-mb-px mr-1">
                        <a
                          onClick={() => handleTabClick(tabNumber)}
                          className={`${
                            openTab === tabNumber
                              ? "border-l border-t border-r rounded-t text-blue-700 font-semibold"
                              : "text-blue-500 hover:text-blue-800"
                          } bg-white inline-block py-2 px-4 font-semibold`}
                          href="#"
                        >
                          {tabNumber === 1
                            ? "View"
                            : tabNumber === 2
                            ? "Add"
                            : ``}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white p-3">{renderTabContent()}</div>
              </div>
            </main>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ManagerUsers;
