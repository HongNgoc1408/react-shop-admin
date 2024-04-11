import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
// Import PropTypes

const InputSearchTable = () => {
  return (
    <form>
      <div className="w-1/2 justify-end">
        <div className="flex items-center max-w-md mx-auto bg-gray-200 rounded-lg ">
          <div className="w-full">
            <input
              type="text"
              className="w-full px-4 text-gray-800 rounded-full focus:outline-none bg-gray-200"
              placeholder="Search..."
            />
          </div>
          <div>
            <button
              type="submit"
              className="flex items-center bg-blue-500 justify-center w-12 h-12 text-white rounded-r-lg"
            >
              <FaSearch />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};


export default InputSearchTable;
