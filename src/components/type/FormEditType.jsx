import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import * as TypeService from "../../services/TypeService";
import { useSelector } from "react-redux";

const FormEditType = () => {
  const [successNotification, setSuccessNotification] = useState(null);
  const [errorNotification, setErrorNotification] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");

  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchTypeDetails = async () => {
      const res = await TypeService.getDetailsType(id);
      if (res?.data) {
        setName(res?.data?.name);
      }
    };

    fetchTypeDetails();
  }, [id]);

  const data = {
    name,
  };

  const handleUpdateType = async (e) => {
    e.preventDefault();
    if (!name) {
      setErrorNotification("Please fill in all fields.");
      setTimeout(() => {
        setErrorNotification(null);
      }, 3000);
      return;
    }
    try {
      const res = await TypeService.updateType(id, user?.access_token, data);
      console.log(res);
      if (res.status === "OK") {
        navigate("/type");
        setSuccessNotification("Update successful!");
        setTimeout(() => {
          setSuccessNotification(null);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      setErrorNotification("Update failed!" + error);
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

      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-white rounded p-5"
      >
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-1/4 px-3 mx-auto">
            <label
              className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
              id="name"
              name="name"
              type="text"
              required=""
              placeholder="Name Type"
              aria-label="Name Type"
            />
          </div>
        </div>

        <div className="flex items-center justify-center w-full">
          <button
            type="submit"
            onClick={handleUpdateType}
            className="mt-2 font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none  disabled:bg-gray-400 disabled:cursor-no-drop"
          >
            Edit
          </button>
        </div>
      </form>
    </>
  );
};

export default FormEditType;
