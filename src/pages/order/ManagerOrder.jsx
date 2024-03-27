import React, { useState } from "react";
import ViewOrder from "./ViewOrder";
import ViewDetailOrder from "./ViewDetailOrder";
import EditOrder from "./EditOrder";

const ManagerOrder = () => {
  const [openTab, setOpenTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setOpenTab(tabNumber);
  };

  const renderTabContent = () => {
    switch (openTab) {
      case 1:
        return <ViewOrder />;
      case 2:
        return <ViewDetailOrder />;
      case 3:
        return <EditOrder />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-screen overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6">
        <h1 className="text-3xl text-black pb-6">Manager Orders</h1>

        <div className="w-full mt-6">
          <div>
            <ul className="flex border-b">
              {[1, 2, 3].map((tabNumber) => (
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
                      : tabNumber === 3
                      ? "Edit"
                      : ``}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-6">{renderTabContent()}</div>
        </div>
      </main>
    </div>
  );
};

export default ManagerOrder;