import React, { useState } from "react";
import { FaList } from "react-icons/fa";
import InputSearchTable from "../../components/InputSearchTable";
import TableViewProduct from "../../components/product/TableViewProduct";

const ViewProducts = () => {

  return (
    <div className="bg-white overflow-auto cursor-pointer">
      {/* <div className="w-full items-centerpy-2 px-6 hidden sm:flex">
        <div className="relative w-1/2 flex justify-start">
          <p className="text-xl pb-3 flex items-center">
            <FaList className="mr-3" /> View Products
          </p>
        </div>
        <InputSearchTable />
      </div> */}
      <TableViewProduct />
    </div>
  );
};



export default ViewProducts;
