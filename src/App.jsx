import axios from "axios";
import React, { useEffect } from "react";
import { routes } from "./router";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function App() {
  // useEffect(() => {
  //   fetchApi();
  // }, []);

  const fetchApi = async () => {
    try {
      // console.log("process.env.REACT_BE_API_URL", import.meta.env.VITE_API_KEY);
      const res = await axios.get(
        `${import.meta.env.VITE_API_KEY}/product/getAll`
      );
      return res.data;
      // console.log("res", res);
    } catch (error) {
      console.error("Error fetching api:", error);
    }
  };

  const query = useQuery({ queryKey: ["todos"], queryFn: fetchApi });
  console.log("query", query);

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
