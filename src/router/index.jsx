import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Category from "../pages/category/Category";
import Product from "../pages/product/Product";
import Order from "../pages/order/Order";
import User from "../pages/user/User";
import notFound from "../pages/notFound/notFound";

const routes = [
  {
    path: "/",
    name: "login",
    page: Login,
  },
  {
    path: "/home",
    name: "home",
    page: Home,
    isShowFooter: true,
  },
  {
    path: "/category",
    name: "category",
    page: Category,
  },
  {
    path: "/product",
    name: "product",
    page: Product,
  },
  {
    path: "/order",
    name: "order",
    page: Order,
  },
  {
    path: "/user",
    name: "user",
    page: User,
  },
  {
    path: "*",
    page: notFound,
  },
];

export { routes };
