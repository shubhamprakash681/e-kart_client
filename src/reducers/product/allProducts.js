import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  searchKeyword: "",
  loading: false,
  products: [],
  filteredProdCount: null,
  resultsPerPage: null,
  totalProductCount: null,
  error: null,
  categoryList: null,

  featuredProducts: {
    loading: false,
    error: null,
    products: null,
  },
};

const allProducts = createReducer(initialState, {
  SET_SEARCH_KEYWORD: (state, actions) => {
    state.searchKeyword = actions.payload;
  },
  GET_ALL_PROD_CATEGORIES: (state, actions) => {
    state.categoryList = actions.payload;
  },

  GET_FEATURED_PROD_REQ: (state, actions) => {
    state.featuredProducts.loading = true;
  },
  GET_FEATURED_PROD_SUC: (state, actions) => {
    state.featuredProducts.loading = false;
    state.featuredProducts.error = null;
    state.featuredProducts.products = actions.payload;
  },
  GET_FEATURED_PROD_FAIL: (state, actions) => {
    state.featuredProducts.loading = false;
    state.featuredProducts.error = actions.payload;
  },

  ALL_PROD_REQUEST: (state, actions) => {
    state.loading = true;
    state.products = [];
  },
  ALL_PROD_SUCCESS: (state, actions) => {
    state.loading = false;
    state.products = actions.payload.products;
    state.filteredProdCount = actions.payload.filteredProdCount;
    state.resultsPerPage = actions.payload.resultsPerPage;
    state.totalProductCount = actions.payload.totalProductCount;
  },

  PROD_FAIL: (state, actions) => {
    state.loading = false;
    state.error = actions.payload;
  },
});

export default allProducts;
