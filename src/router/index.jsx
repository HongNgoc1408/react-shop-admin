import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/auth/Login";
import Product from "../pages/product/ManagerProduct";
import Order from "../pages/order/ManagerOrder";
import User from "../pages/user/ManagerUsers";
import notFound from "../pages/notFound/notFound";
import ProfilePage from "../pages/admin/ProfilePage";
import EditProducts from "../pages/product/EditProducts";
import test from "../test";

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
    path: "/product/:id",
    name: "EditProduct",
    page: EditProducts,
  },
  {
    path: "/user",
    name: "user",
    page: User,
  },
  {
    path: "/order",
    name: "order",
    page: Order,
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
