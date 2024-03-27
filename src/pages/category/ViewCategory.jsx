import React from "react";
import { FaList } from "react-icons/fa";

const ViewCategory = () => {
  return (
    <div className="bg-white overflow-auto">
      <p className="text-xl pb-3 flex items-center">
        <FaList className="mr-3" /> View Category
      </p>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
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
        </tbody>
      </table>
    </div>
  );
};

export default ViewCategory;
