import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  allProducts: {
    loading: false,
    error: null,
    products: null,
  },
  createProd: {
    loading: false,
    error: false,
  },
  updateProd: {
    error: null,
    product: null,
  },
  productReviews: {
    loading: false,
    error: null,
    reviews: null,
  },

  allOrders: {
    loading: false,
    error: null,
    orders: null,
  },
  currentOrderDetails: {
    loading: false,
    error: null,
    order: null,
  },

  allUsers: {
    loading: false,
    error: null,
    users: null,
  },
  userDetail: {
    loading: false,
    error: null,
    user: null,
  },
};

const adminReducer = createReducer(initialState, {
  ADMIN_GET_ALL_PRODUCTS_REQ: (state, actions) => {
    state.allProducts.loading = true;
  },
  ADMIN_GET_ALL_PRODUCTS_SUC: (state, actions) => {
    state.allProducts.products = actions.payload;
    state.allProducts.loading = false;
    state.allProducts.error = null;
  },
  ADMIN_GET_ALL_PRODUCTS_FAIL: (state, actions) => {
    state.allProducts.loading = false;
    state.allProducts.error = actions.payload;
  },

  ADMIN_CREATE_PRODUCT_REQ: (state, actions) => {
    state.createProd.loading = true;
  },
  ADMIN_CREATE_PRODUCT_SUC: (state, actions) => {
    state.createProd.loading = false;
    state.createProd.error = null;
  },
  ADMIN_CREATE_PRODUCT_FAIL: (state, actions) => {
    state.createProd.loading = false;
    state.createProd.error = actions.payload;
  },

  ADMIN_UPDATE_PROD_DATA_FETCH: (state, actions) => {
    state.createProd.loading = true;
  },
  ADMIN_UPDATE_PROD_DATA_SUC: (state, actions) => {
    state.createProd.loading = false;
    state.updateProd.error = null;
    state.updateProd.product = actions.payload;
  },
  ADMIN_UPDATE_PROD_DATA_FAIL: (state, actions) => {
    state.createProd.loading = false;
    state.updateProd.error = actions.payload;
  },

  ADMIN_UPDATE_PRODUCT_REQ: (state, actions) => {
    state.createProd.loading = true;
  },
  ADMIN_UPDATE_PRODUCT_SUC: (state, actions) => {
    state.createProd.loading = false;
    state.updateProd.error = null;
    state.updateProd.product = actions.payload;
  },
  ADMIN_UPDATE_PRODUCT_FAIL: (state, actions) => {
    state.createProd.loading = false;
    state.updateProd.error = actions.payload;
  },

  ADMIN_GET_PROD_REVIEWS_REQ: (state, actions) => {
    state.productReviews.loading = true;
  },
  ADMIN_GET_PROD_REVIEWS_SUC: (state, actions) => {
    state.productReviews.loading = false;
    state.productReviews.error = null;
    state.productReviews.reviews = actions.payload;
  },
  ADMIN_GET_PROD_REVIEWS_FAIL: (state, actions) => {
    state.productReviews.loading = false;
    state.productReviews.error = actions.payload;
  },

  ADMIN_GET_ALL_ORDERS_REQ: (state, actions) => {
    state.allOrders.loading = true;
  },
  ADMIN_GET_ALL_ORDERS_SUC: (state, actions) => {
    state.allOrders.error = null;
    state.allOrders.loading = false;
    state.allOrders.orders = actions.payload;
  },
  ADMIN_GET_ALL_ORDERS_FAIL: (state, actions) => {
    state.allOrders.loading = false;
    state.allOrders.error = actions.payload;
  },

  ADMIN_GET_ORDER_DET_REQ: (state, actions) => {
    state.currentOrderDetails.loading = true;
  },
  ADMIN_GET_ORDER_DET_SUC: (state, actions) => {
    state.currentOrderDetails.loading = false;
    state.currentOrderDetails.error = null;
    state.currentOrderDetails.order = actions.payload;
  },
  ADMIN_GET_ORDER_DET_FAIL: (state, actions) => {
    state.currentOrderDetails.loading = false;
    state.currentOrderDetails.error = actions.payload;
  },

  ADMIN_PROCESS_ORDER_REQ: (state, actions) => {
    state.currentOrderDetails.loading = true;
  },
  ADMIN_PROCESS_ORDER_SUC: (state, actions) => {
    state.currentOrderDetails.loading = false;
    state.currentOrderDetails.error = null;
    state.currentOrderDetails.order = actions.payload;
  },
  ADMIN_PROCESS_ORDER_FAIL: (state, actions) => {
    state.currentOrderDetails.loading = false;
    state.currentOrderDetails.error = actions.payload;
  },

  ADMIN_GET_ALL_USERS_REQ: (state, action) => {
    state.allUsers.loading = true;
  },
  ADMIN_GET_ALL_USERS_SUC: (state, actions) => {
    state.allUsers.loading = false;
    state.allUsers.error = null;
    state.allUsers.users = actions.payload;
  },
  ADMIN_GET_ALL_USERS_FAIL: (state, actions) => {
    state.allUsers.loading = false;
    state.allUsers.error = actions.payload;
  },

  ADMIN_GET_USER_DETAILS_REQ: (state, action) => {
    state.userDetail.loading = true;
  },
  ADMIN_GET_USER_DETAILS_SUC: (state, actions) => {
    state.userDetail.loading = false;
    state.userDetail.error = null;
    state.userDetail.user = actions.payload;
  },
  ADMIN_GET_USER_DETAILS_FAIL: (state, actions) => {
    state.userDetail.loading = false;
    state.userDetail.error = actions.payload;
  },
});

export default adminReducer;
