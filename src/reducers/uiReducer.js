import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  uiTheme: "light",
  windowSize: {
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
  },
  cartOpen: false,
};

const uiReducer = createReducer(initialState, {
  CHANGE_UI_THEME: (state, actions) => {
    state.uiTheme = actions.payload;
  },
  SET_WINDOW_SIZE: (state, actions) => {
    state.windowSize = actions.payload;
  },
  OPEN_CART: (state, actions) => {
    state.cartOpen = true;
  },
  CLOSE_CART: (state, actions) => {
    state.cartOpen = false;
  },
});

export default uiReducer;
