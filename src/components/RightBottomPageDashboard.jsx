import React from "react";
import { FaDotCircle, FaFill, FaList } from "react-icons/fa";

const RightBottomPageDashboard = () => {
  return (
    <div className="w-full overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6">
        <h1 className="text-3xl text-black pb-6">Dashboard</h1>
        <div className="w-full ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
              <div className="flex justify-between mb-6">
                <div>
                  <div className="flex items-center mb-1">
                    <div className="text-2xl font-semibold">2</div>
                  </div>
                  <div className="text-sm font-medium text-gray-400">Users</div>
                </div>
              </div>
              <a
                href="#"
                className="text-[#f84525] font-medium text-sm hover:text-red-800"
                target="_blank"
              >
                View
              </a>
            </div>
            <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
              <div className="flex justify-between mb-6">
                <div>
                  <div className="text-2xl font-semibold mb-1">100</div>
                  <div className="text-sm font-medium text-gray-400">Product</div>
                </div>
              </div>
              <a
                href="#"
                className="text-[#f84525] font-medium text-sm hover:text-red-800"
                target="_blank"
              >
                View
              </a>
            </div>
            <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
              <div className="flex justify-between mb-4">
                <div>
                  <div className="flex items-center mb-1">
                    <div className="text-2xl font-semibold">100</div>
                    <div className="p-1 rounded bg-emerald-500/10 text-emerald-500 text-[12px] font-semibold leading-none ml-2">
                      +30%
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    Orders
                  </div>
                </div>
              </div>
              <a
                href="#"
                className="text-[#f84525] font-medium text-sm hover:text-red-800"
                target="_blank"
              >
                View
              </a>
            </div>
          </div>
          {/* <p className="text-xl pb-3 flex items-center">
            <FaList /> Latest Reports
          </p> */}
          <div className="bg-white overflow-auto">
            <table className="min-w-full bg-white">
              {/* <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                      Name
                    </th>
                    <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                      Last name
                    </th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Phone
                    </th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr>
                    <td className="w-1/3 text-left py-3 px-4">Lian</td>
                    <td className="w-1/3 text-left py-3 px-4">Smith</td>
                    <td className="text-left py-3 px-4">
                      <a className="hover:text-blue-500" href="tel:622322662">
                        622322662
                      </a>
                    </td>
                    <td className="text-left py-3 px-4">
                      <a
                        className="hover:text-blue-500"
                        href="mailto:jonsmith@mail.com"
                      >
                        jonsmith@mail.com
                      </a>
                    </td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="w-1/3 text-left py-3 px-4">Emma</td>
                    <td className="w-1/3 text-left py-3 px-4">Johnson</td>
                    <td className="text-left py-3 px-4">
                      <a className="hover:text-blue-500" href="tel:622322662">
                        622322662
                      </a>
                    </td>
                    <td className="text-left py-3 px-4">
                      <a
                        className="hover:text-blue-500"
                        href="mailto:jonsmith@mail.com"
                      >
                        jonsmith@mail.com
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="w-1/3 text-left py-3 px-4">Oliver</td>
                    <td className="w-1/3 text-left py-3 px-4">Williams</td>
                    <td className="text-left py-3 px-4">
                      <a className="hover:text-blue-500" href="tel:622322662">
                        622322662
                      </a>
                    </td>
                    <td className="text-left py-3 px-4">
                      <a
                        className="hover:text-blue-500"
                        href="mailto:jonsmith@mail.com"
                      >
                        jonsmith@mail.com
                      </a>
                    </td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="w-1/3 text-left py-3 px-4">Isabella</td>
                    <td className="w-1/3 text-left py-3 px-4">Brown</td>
                    <td className="text-left py-3 px-4">
                      <a className="hover:text-blue-500" href="tel:622322662">
                        622322662
                      </a>
                    </td>
                    <td className="text-left py-3 px-4">
                      <a
                        className="hover:text-blue-500"
                        href="mailto:jonsmith@mail.com"
                      >
                        jonsmith@mail.com
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="w-1/3 text-left py-3 px-4">Lian</td>
                    <td className="w-1/3 text-left py-3 px-4">Smith</td>
                    <td className="text-left py-3 px-4">
                      <a className="hover:text-blue-500" href="tel:622322662">
                        622322662
                      </a>
                    </td>
                    <td className="text-left py-3 px-4">
                      <a
                        className="hover:text-blue-500"
                        href="mailto:jonsmith@mail.com"
                      >
                        jonsmith@mail.com
                      </a>
                    </td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="w-1/3 text-left py-3 px-4">Emma</td>
                    <td className="w-1/3 text-left py-3 px-4">Johnson</td>
                    <td className="text-left py-3 px-4">
                      <a className="hover:text-blue-500" href="tel:622322662">
                        622322662
                      </a>
                    </td>
                    <td className="text-left py-3 px-4">
                      <a
                        className="hover:text-blue-500"
                        href="mailto:jonsmith@mail.com"
                      >
                        jonsmith@mail.com
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="w-1/3 text-left py-3 px-4">Oliver</td>
                    <td className="w-1/3 text-left py-3 px-4">Williams</td>
                    <td className="text-left py-3 px-4">
                      <a className="hover:text-blue-500" href="tel:622322662">
                        622322662
                      </a>
                    </td>
                    <td className="text-left py-3 px-4">
                      <a
                        className="hover:text-blue-500"
                        href="mailto:jonsmith@mail.com"
                      >
                        jonsmith@mail.com
                      </a>
                    </td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="w-1/3 text-left py-3 px-4">Isabella</td>
                    <td className="w-1/3 text-left py-3 px-4">Brown</td>
                    <td className="text-left py-3 px-4">
                      <a className="hover:text-blue-500" href="tel:622322662">
                        622322662
                      </a>
                    </td>
                    <td className="text-left py-3 px-4">
                      <a
                        className="hover:text-blue-500"
                        href="mailto:jonsmith@mail.com"
                      >
                        jonsmith@mail.com
                      </a>
                    </td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="w-1/3 text-left py-3 px-4">Isabella</td>
                    <td className="w-1/3 text-left py-3 px-4">Brown</td>
                    <td className="text-left py-3 px-4">
                      <a className="hover:text-blue-500" href="tel:622322662">
                        622322662
                      </a>
                    </td>
                    <td className="text-left py-3 px-4">
                      <a
                        className="hover:text-blue-500"
                        href="mailto:jonsmith@mail.com"
                      >
                        jonsmith@mail.com
                      </a>
                    </td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="w-1/3 text-left py-3 px-4">Isabella</td>
                    <td className="w-1/3 text-left py-3 px-4">Brown</td>
                    <td className="text-left py-3 px-4">
                      <a className="hover:text-blue-500" href="tel:622322662">
                        622322662
                      </a>
                    </td>
                    <td className="text-left py-3 px-4">
                      <a
                        className="hover:text-blue-500"
                        href="mailto:jonsmith@mail.com"
                      >
                        jonsmith@mail.com
                      </a>
                    </td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="w-1/3 text-left py-3 px-4">Isabella</td>
                    <td className="w-1/3 text-left py-3 px-4">Brown</td>
                    <td className="text-left py-3 px-4">
                      <a className="hover:text-blue-500" href="tel:622322662">
                        622322662
                      </a>
                    </td>
                    <td className="text-left py-3 px-4">
                      <a
                        className="hover:text-blue-500"
                        href="mailto:jonsmith@mail.com"
                      >
                        jonsmith@mail.com
                      </a>
                    </td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="w-1/3 text-left py-3 px-4">Isabella</td>
                    <td className="w-1/3 text-left py-3 px-4">Brown</td>
                    <td className="text-left py-3 px-4">
                      <a className="hover:text-blue-500" href="tel:622322662">
                        622322662
                      </a>
                    </td>
                    <td className="text-left py-3 px-4">
                      <a
                        className="hover:text-blue-500"
                        href="mailto:jonsmith@mail.com"
                      >
                        jonsmith@mail.com
                      </a>
                    </td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="w-1/3 text-left py-3 px-4">Isabella</td>
                    <td className="w-1/3 text-left py-3 px-4">Brown</td>
                    <td className="text-left py-3 px-4">
                      <a className="hover:text-blue-500" href="tel:622322662">
                        622322662
                      </a>
                    </td>
                    <td className="text-left py-3 px-4">
                      <a
                        className="hover:text-blue-500"
                        href="mailto:jonsmith@mail.com"
                      >
                        jonsmith@mail.com
                      </a>
                    </td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="w-1/3 text-left py-3 px-4">Isabella</td>
                    <td className="w-1/3 text-left py-3 px-4">Brown</td>
                    <td className="text-left py-3 px-4">
                      <a className="hover:text-blue-500" href="tel:622322662">
                        622322662
                      </a>
                    </td>
                    <td className="text-left py-3 px-4">
                      <a
                        className="hover:text-blue-500"
                        href="mailto:jonsmith@mail.com"
                      >
                        jonsmith@mail.com
                      </a>
                    </td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="w-1/3 text-left py-3 px-4">Isabella</td>
                    <td className="w-1/3 text-left py-3 px-4">Brown</td>
                    <td className="text-left py-3 px-4">
                      <a className="hover:text-blue-500" href="tel:622322662">
                        622322662
                      </a>
                    </td>
                    <td className="text-left py-3 px-4">
                      <a
                        className="hover:text-blue-500"
                        href="mailto:jonsmith@mail.com"
                      >
                        jonsmith@mail.com
                      </a>
                    </td>
                  </tr>
                </tbody> */}
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RightBottomPageDashboard;
