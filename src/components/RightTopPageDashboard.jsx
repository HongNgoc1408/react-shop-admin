import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as UserService from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { FaExpand, FaFacebookMessenger, FaListAlt } from "react-icons/fa";
import InputSearchTable from "./InputSearchTable";

const RightTopPageDashboard = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleLogout = async () => {
    const res = await UserService.logoutUser();
    if (res.status === "OK") {
      localStorage.removeItem(
        "access_token",
        JSON.stringify(res?.access_token)
      );
      navigate("/");
    } else {
      alert("Error: " + res.message);
    }
  };

  useEffect(() => {
    setUserName(user?.name);
    setAvatar(user?.avatar);
  }, [user?.name, user?.avatar]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };



  return (
    <header className="w-full items-center bg-white py-2 px-6 hidden sm:flex">
      <div className="w-1/2">
        <InputSearchTable />
      </div>
      {user?.access_token ? (
        <div className="relative w-1/2 flex justify-end">
          <button className="realtive z-10 w-12 h-12 rounded-full overflow-hidden focus:outline-none">
            <FaFacebookMessenger size={30} className="text-blue-500" />
          </button>
          <button
            id="fullscreen-button"
            className="relative z-10 w-12 h-12 rounded-full overflow-hidden focus:outline-none"
            onClick={toggleFullscreen}
          >
            <FaExpand size={30} className="text-blue-500" />
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none"
          >
            <img src={avatar} alt="Avatar" />
          </button>
          <div className="p-2 md:block text-left">
            <h2 className="text-base font-semibold text-gray-800 hover:border-b-2 hover:border-b-orange-500">
              {userName || user?.email || "User"}
            </h2>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
          {isOpen && (
            <>
              <button
                onClick={() => setIsOpen(false)}
                className="h-full w-full fixed inset-0 cursor-default"
              ></button>
              <div className="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16">
                <a
                  href="/profile"
                  className="block px-4 py-2 account-link hover:text-white"
                >
                  Account
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 account-link hover:text-white"
                >
                  Support
                </a>
                <a
                  onClick={handleLogout}
                  href="#"
                  className="block px-4 py-2 account-link hover:text-white"
                >
                  Logout
                </a>
              </div>
            </>
          )}
        </div>
      ) : (
        ""
      )}
    </header>
  );
};

export default RightTopPageDashboard;
