import axios from "axios";
import React, { useEffect } from "react";
import { routes } from "./router";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { updateUser } from "./redux/slides/useSlides";
import { jwtDecode } from "jwt-decode";
import { isJsonString } from "./utils";
import { useDispatch } from "react-redux";
import * as UserService from "./services/UserService";
import LeftPageDashboard from "./components/LeftPageDashboard";
import RightTopPageDashboard from "./components/RightTopPageDashboard";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    let storageData = localStorage.getItem("access_token");

    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      const decoded = jwtDecode(storageData);
      // console.log("decodedApp", decoded);
      if (decoded?.id) {
        handleGetUser(decoded?.id, storageData);
      }
    }
  });

  const handleGetUser = async (id, token) => {
    const res = await UserService.getUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
    // console.log("res", res);
  };

  axios.interceptors.request.use(
    async (config) => {
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.page />}
            />
          ))}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
