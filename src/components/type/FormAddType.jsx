import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { createType } from "../../services/TypeService";

const FormAddType = () => {
  const [successNotification, setSuccessNotification] = useState(null);
  const [errorNotification, setErrorNotification] = useState(null);
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const data = {
    name,
  };

  const handleAddType = async (e) => {
    e.preventDefault();
    console.log("data", data);
    const res = await createType(data);
    console.log("res", res);
    if (res.status === "OK") {
      setSuccessNotification("Add type success!");
      setTimeout(() => {
        setSuccessNotification(null);
      }, 3000);
    } else {
      console.error(res.message);
      setErrorNotification("Add type failed! " + res.message);
      setTimeout(() => {
        setErrorNotification(null);
      }, 3000);
    }
  };

  return (
    <>
      {/* Thông báo thành công */}
      {successNotification && (
        <div className="absolute top-28 right-0 mt-4 mr-4 bg-green-400 text-white px-4 py-2 rounded">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <FaCheckCircle className="size-10" />
            </div>
            <div className="ml-3 pt-0.5">
              <p className="mt-1 text-md text-white">{successNotification}</p>
            </div>
          </div>
        </div>
      )}
      {/* Thông báo thất bại */}
      {errorNotification && (
        <div className="absolute top-28 right-0 mt-4 mr-4 bg-red-400 text-white px-4 py-2 rounded">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <FaTimesCircle className="size-10" />
            </div>
            <div className="ml-3 pt-0.5">
              <p className="mt-1 text-md text-white">{errorNotification}</p>
            </div>
          </div>
        </div>
      )}

      <form className="bg-white rounded">
        <div className="md:w-1/4 px-3 mb-6 md:mb-0 mx-auto">
          <label
            className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            name="name"
            className="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded"
          ></input>
        </div>

        <div className="flex items-center justify-center w-full">
          <button
            disabled={!name.length}
            onClick={handleAddType}
            className="mt-2 font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none  disabled:bg-gray-400 disabled:cursor-no-drop"
          >
            Add
          </button>
        </div>
      </form>
    </>
  );
};

export default FormAddType;
