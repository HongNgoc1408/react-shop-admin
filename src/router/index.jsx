import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/auth/Login";
import Product from "../pages/product/ManagerProduct";
import Order from "../pages/order/ManagerOrder";
import User from "../pages/user/ManagerUsers";
import notFound from "../pages/notFound/notFound";
import ProfilePage from "../pages/admin/ProfilePage";
import EditProducts from "../pages/product/EditProducts";
import test from "../test";
import EditUsers from "../pages/user/EditUsers";
import EditOrder from "../pages/order/EditOrder";
import ViewProduct from "../pages/product/ViewProduct";
import ViewDetailOrder from "../pages/order/ViewDetailOrder";

const routes = [
  {
    path: "/",
    name: "login",
    page: Login,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    page: Dashboard,
    isShowFooter: true,
  },
  {
    path: "/profile",
    name: "profile",
    page: ProfilePage,
  },
  {
    path: "/product",
    name: "Product",
    page: Product,
  },
  {
    path: "/product/edit/:id",
    name: "EditProduct",
    page: EditProducts,
  },
  {
    path: "/product/view/:id",
    name: "ViewProduct",
    page: ViewProduct,
  },
  {
    path: "/user",
    name: "user",
    page: User,
  },
  {
    path: "/user/:id",
    name: "EditUser",
    page: EditUsers,
  },
  {
    path: "/order",
    name: "order",
    page: Order,
  },
  {
    path: "/order/:id",
    name: "EditOrder",
    page: EditOrder,
  },
  {
    path: "/order/view/:id",
    name: "ViewOrder",
    page: ViewDetailOrder,
  },
  {
    path: "/test",
    name: "test",
    page: test,
  },
  {
    path: "*",
    page: notFound,
  },
];

export { routes };
