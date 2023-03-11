import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticatedUSer: false,
  loading: false,
  pswdResetLoading: false,
  user: null,
  error: null,
  cart: localStorage.getItem("e-kart_cart")
    ? JSON.parse(localStorage.getItem("e-kart_cart"))
    : [],
  cartLoading: false,
};

const userReducer = createReducer(initialState, {
  UPDATE_USER_REQ: (state, actions) => {
    state.loading = true;
    state.user = null;
    state.isAuthenticatedUSer = false;
  },
  UPDATE_USER_SUCCESS: (state, actions) => {
    state.loading = false;
    state.user = actions.payload;
    state.isAuthenticatedUSer = true;
    state.error = null;
  },
  UPDATE_USER_FAIL: (state, actions) => {
    state.loading = false;
    state.error = actions.payload;
    state.user = null;
    state.isAuthenticatedUSer = false;
  },

  LOGOUT: (state, actions) => {
    state.loading = false;
    state.user = null;
    state.isAuthenticatedUSer = false;
    state.error = null;
  },
  LOGOUT_FAIL: (state, actions) => {
    state.loading = false;
    state.isAuthenticatedUSer = true;
    state.error = actions.payload;
  },

  UPDATE_USER_DATA_REQ: (state, actions) => {
    state.loading = true;
  },
  UPDATE_USER_DATA_SUCCESS: (state, actions) => {
    state.loading = false;
    state.error = null;
  },
  UPDATE_USER_DATA_FAIL: (state, actions) => {
    state.loading = false;
    state.error = actions.payload;
  },

  PSWD_RESET_MAIL_REQ: (state, actions) => {
    state.pswdResetLoading = true;
  },
  PSWD_RESET_MAIL_SUC_FAIL: (state, actions) => {
    state.pswdResetLoading = false;
  },
  PSWD_RESET_REQ: (state, actions) => {
    state.loading = true;
    state.pswdResetLoading = true;
  },
  PSWD_RESET_SUC: (state, actions) => {
    state.pswdResetLoading = false;
    state.loading = false;
    state.user = actions.payload;
    state.isAuthenticatedUSer = true;
    state.error = null;
  },
  PSWD_RESET_FAIL: (state, actions) => {
    state.loading = false;
    state.pswdResetLoading = false;
    state.error = actions.payload;
  },

  ADD_CART_REQ: (state, actions) => {
    state.cartLoading = true;
  },
  ADD_CART_SUC_FAIL: (state, actions) => {
    localStorage.setItem(
      "e-kart_cart",
      JSON.stringify([...state.cart, actions.payload])
    );
    state.cartLoading = false;
    state.cart = [...state.cart, actions.payload];
  },
  UPDATE_CART: (state, actions) => {
    localStorage.setItem("e-kart_cart", JSON.stringify(actions.payload));
    state.cartLoading = false;
    state.cart = actions.payload;
  },
});

export default userReducer;
