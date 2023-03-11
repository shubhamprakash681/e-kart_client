import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  productDet: null,
  error: null,
};

const prodDetail = createReducer(initialState, {
  PROD_DETAILS_REQUEST: (state, actions) => {
    state.loading = true;
    state.productDet = null;
  },

  PROD_DETAILS_SUCCESS: (state, actions) => {
    state.loading = false;
    state.productDet = actions.payload;
  },

  PROD_DET_FAIL: (state, actions) => {
    state.loading = false;
    state.error = actions.payload;
  },
});

export default prodDetail;
