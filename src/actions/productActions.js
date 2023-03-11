import axios from "axios";
import { toast } from "react-toastify";

const ServerBaseURI = process.env.REACT_APP_URI_SERVER_BASE_URL;

export const getCategoryList = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${ServerBaseURI}/api/v1/products/categories`
    );

    dispatch({
      type: "GET_ALL_PROD_CATEGORIES",
      payload: data.categoryList,
    });
  } catch (err) {
    const { message } = err.response.data;
    toast.error(message, {
      toastId: message,
      position: "bottom-center",
    });
  }
};

export const getFeaturedProducts = (minRating) => async (dispatch) => {
  try {
    dispatch({
      type: "GET_FEATURED_PROD_REQ",
    });

    let URI = `${ServerBaseURI}/api/v1/products/?rating[gte]=${minRating}`;
    const { data } = await axios.get(URI);

    dispatch({
      type: "GET_FEATURED_PROD_SUC",
      payload: data.products,
    });
  } catch (err) {
    const { success, message } = err.response.data;
    dispatch({
      type: "GET_FEATURED_PROD_FAIL",
      payload: {
        success,
        message,
      },
    });

    toast.error(message, {
      toastId: message,
      position: "bottom-center",
    });
  }
};

export const getProducts =
  (
    keyword = "",
    currPage = 1,
    lowerRange = 0,
    upperRange = 200000,
    minRating = 0,
    category = null
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: "ALL_PROD_REQUEST" });

      let URI = `${ServerBaseURI}/api/v1/products/?keyword=${keyword}&page=${currPage}&price[gte]=${lowerRange}&price[lte]=${upperRange}&rating[gte]=${minRating}`;
      if (category) {
        URI = `${ServerBaseURI}/api/v1/products/?keyword=${keyword}&page=${currPage}&price[gte]=${lowerRange}&price[lte]=${upperRange}&rating[gte]=${minRating}&category=${category}`;
      }
      const { data } = await axios.get(URI);
      // console.log(data);

      const { filteredProdCount, products, resultsPerPage, totalProductCount } =
        data;

      dispatch({
        type: "ALL_PROD_SUCCESS",
        payload: {
          filteredProdCount,
          products,
          resultsPerPage,
          totalProductCount,
        },
      });
    } catch (err) {
      console.log(err.response.data);
      const { success, message } = err.response.data;
      dispatch({
        type: "PROD_FAIL",
        payload: {
          success,
          message,
        },
      });

      toast.error(message, {
        toastId: message,
        position: "bottom-center",
      });
    }
  };

export const getProductDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: "PROD_DETAILS_REQUEST" });

    const { data } = await axios.get(`${ServerBaseURI}/api/v1/product/${id}`);
    // console.log(data);

    dispatch({
      type: "PROD_DETAILS_SUCCESS",
      payload: data.product,
    });
  } catch (err) {
    // console.log(err.response.data);
    const { success, message } = err.response.data;
    dispatch({
      type: "PROD_DET_FAIL",
      payload: {
        success,
        message,
      },
    });

    toast.error(message, {
      toastId: message,
      position: "bottom-center",
    });
  }
};

export const getProdDetail_cart = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${ServerBaseURI}/api/v1/product/${id}`);
    return data;
  } catch (err) {
    toast.error("Error adding item", {
      toastId: "error-adding-cart",
      position: "bottom-center",
    });
  }
};

export const submitProdReview = (id, rating, comment) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      `${ServerBaseURI}/api/v1/product/review/${id}`,
      {
        rating,
        comment,
      },
      {
        withCredentials: true,
      }
    );

    const { message } = data;

    toast.success(message, {
      toastId: "rev-sub-suc",
      position: "bottom-center",
    });

    dispatch(getProductDetail(id));
    dispatch(getProducts());
  } catch (err) {
    const { message } = err.response.data;

    toast.error(message, {
      toastId: message,
      position: "bottom-center",
    });
  }
};
