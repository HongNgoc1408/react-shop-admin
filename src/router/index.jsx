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
    component: Home,
    isShowFooter: true,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/category",
    component: Category,
  },
  {
    path: "/product",
    component: Product,
  },
  {
    path: "/order",
    component: Order,
  },
  {
    path: "/user",
    component: User,
  },
  {
    path: "*",
    component: notFound,
  },
];

export { routes };
