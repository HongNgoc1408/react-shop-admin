import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slides/useSlides";
import productReducer from "./slides/productSlide";
import orderReducer from "./slides/orderSlide";

export const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    order: orderReducer,
  },
});
