import { combineReducers } from "@reduxjs/toolkit";
import uiReducer from "./uiReducer";
import allProducts from "./product/allProducts";
import prodDetail from "./product/prodDetail";
import userReducer from "./user/userReducer";
import currentOrderReducer from "./Order/currentOrder";
import orderReducer from "./Order/orderReducer";
import adminReducer from "./Admin/adminReducer";

export default combineReducers({
  uiReducer,
  allProducts,
  prodDetail,
  userReducer,
  currentOrderReducer,
  orderReducer,
  adminReducer,
});
