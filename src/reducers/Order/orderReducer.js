import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  currentOrders: null,
  myOrders: null,
};

const orderReducer = createReducer(initialState, {
  CREATE_CURR_ORDER_REQUEST: (state, actions) => {
    state.loading = true;
  },
  CREATE_CURR_ORDER_FAIL: (state, actions) => {
    state.loading = false;
    state.error = actions.payload;
  },
  CREATE_CURR_ORDER_SUCCESS: (state, actions) => {
    state.loading = false;
    state.currentOrders = actions.payload;
    state.error = null;
  },

  MY_ORDERS_REQ: (state, actions) => {
    state.loading = true;
  },
  MY_ORDERS_SUC: (state, actions) => {
    state.loading = false;
    state.myOrders = actions.payload;
    state.error = null;
  },
  MY_ORDERS_FAIL: (state, actions) => {
    state.loading = false;
    state.error = actions.payload;
  },
});

export default orderReducer;
