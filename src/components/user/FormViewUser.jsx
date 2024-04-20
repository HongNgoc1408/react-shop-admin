import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaEdit, FaTimesCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import * as UserService from "../../services/UserService";
import { useSelector } from "react-redux";

const FormViewUser = () => {
  const [successNotification, setSuccessNotification] = useState(null);
  const [errorNotification, setErrorNotification] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const res = await UserService.getUser(id, user?.access_token);

      if (res?.data) {
        setName(res?.data?.name);
        setAvatar(res?.data?.avatar);
        setEmail(res?.data?.email);
        setPhone(res?.data?.phone);
        setAddress(res?.data?.address);
        setCity(res?.data?.city);
        setIsAdmin(res?.data?.isAdmin);
      }
    };
    fetchUserDetails();
  }, [id]);

  const data = { id, name, avatar, email, phone, address, city, isAdmin };

  return (
    <>
      <div className="border-b-2 block md:flex">
        <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
          <span className="text-gray-600">
            This information is secret so be careful
          </span>
          <div className="w-full p-8 mx-2 flex justify-center">
            {avatar && (
              <img
                src={avatar}
                alt="Image User"
                className="max-w-xs w-full items-center border"
              />
            )}
          </div>
        </div>
        <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
          <div className="rounded  shadow p-6">
            <div className="pb-6">
              <label
                htmlFor="name"
                className="font-semibold text-gray-700 block pb-1"
              >
                Name
              </label>
              <div className="flex">
                <input
                  disabled
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  className="border-none rounded-r px-4 py-2 w-full"
                  type="text"
                />
              </div>
            </div>
            <div className="pb-4">
              <label
                htmlFor="email"
                className="font-semibold text-gray-700 block pb-1"
              >
                Email
              </label>
              <div className="flex">
                <input
                  disabled
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  className="border-none rounded-r px-4 py-2 w-full"
                  type="email"
                />
              </div>
            </div>
            <div className="pb-6">
              <label
                htmlFor="phone"
                className="font-semibold text-gray-700 block pb-1"
              >
                Phone
              </label>
              <div className="flex">
                <input
                  disabled
                  value={phone}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const onlyNums = inputValue.replace(/[^0-9]/g, "");
                    setPhone(onlyNums);
                  }}
                  id="phone"
                  className="border-none rounded-r px-4 py-2 w-full"
                  type="tel"
                  pattern="[0-9]*"
                  maxLength={10}
                />
              </div>
            </div>
            <div className="pb-6">
              <label
                htmlFor="address"
                className="font-semibold text-gray-700 block pb-1"
              >
                Address
              </label>
              <div className="flex">
                <input
                  disabled
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  id="address"
                  className="border-none rounded-r px-4 py-2 w-full"
                  type="text"
                />
              </div>
            </div>
            <div className="pb-6">
              <label
                htmlFor="city"
                className="font-semibold text-gray-700 block pb-1"
              >
                City
              </label>
              <div className="flex">
                <input
                  disabled
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  id="city"
                  className="border-none rounded-r px-4 py-2 w-full"
                  type="text"
                />
              </div>
            </div>
            <div className="pb-6">
              <label
                htmlFor="isAdmin"
                className="font-semibold text-gray-700 block pb-1"
              >
                IsAdmin
              </label>
              <div className="flex">
                <input
                  disabled
                  value={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.value)}
                  id="isAdmin"
                  className="border-none rounded-r px-4 py-2 w-full"
                />
              </div>
            </div>
            <span className="text-gray-600 pt-4 block opacity-70">
              Personal login information of your account
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormViewUser;
