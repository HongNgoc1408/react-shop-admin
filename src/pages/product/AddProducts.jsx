import React from "react";
import { FaPlus } from "react-icons/fa";
import FormAddProduct from "../../components/product/FormAddProduct";

const AddProducts = () => {
  return (
    <div className="flex flex-wrap">
      <div className="w-full lg:w-full my-6 pr-0 lg:pr-2">
        {/* <p className="text-xl pb-6 flex items-center">
          <FaPlus className="mr-3" /> Add Product
        </p> */}
        <div className="leading-loose">
          <FormAddProduct />
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
