import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  shippingDetails: null,
  orderSummary: null,
};

const currentOrderReducer = createReducer(initialState, {
  UPDATE_SHIPPING_DETAIL: (state, actions) => {
    state.shippingDetails = actions.payload;
    localStorage.setItem(
      "e-kart-shipping-details",
      JSON.stringify(actions.payload)
    );
  },

  UPDATE_ORDER_SUMMARY: (state, actions) => {
    state.orderSummary = actions.payload;
    sessionStorage.setItem(
      "e-kart-order-summary",
      JSON.stringify(actions.payload)
    );
  },
});

export default currentOrderReducer;
