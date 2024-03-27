import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login_register/Login.jsx";
import Category from "./pages/category/Category.jsx";
import Product from "./pages/product/Product.jsx";
import Order from "./pages/order/Order.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/home",
        element: <Home />,
        isShowFooter: true,
      },
      {
        path: "/category",
        element: <Category />,
        isShowFooter: true,
      },
      {
        path: "/product",
        element: <Product />,
        isShowFooter: true,
      },
      {
        path: "/order",
        element: <Order />,
        isShowFooter: true,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
