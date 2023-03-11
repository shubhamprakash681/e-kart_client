import axios from "axios";
import { toast } from "react-toastify";
import { getCloudImgURI } from "../../utils/cloudinary";
import { getCategoryList } from "../productActions";

const ServerBaseURI = process.env.REACT_APP_URI_SERVER_BASE_URL;

export const getAllProductsAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: "ADMIN_GET_ALL_PRODUCTS_REQ",
    });

    const { data } = await axios.get(`${ServerBaseURI}/api/v1/admin/products`, {
      withCredentials: true,
    });

    dispatch({
      type: "ADMIN_GET_ALL_PRODUCTS_SUC",
      payload: data,
    });
  } catch (err) {
    const { success, message } = err.response.data;
    toast.error(message, {
      toastId: message,
      position: "bottom-center",
    });

    dispatch({
      type: "ADMIN_GET_ALL_PRODUCTS_FAIL",
      payload: {
        success,
        message,
      },
    });
  }
};

export const getProdDetailsAdmin = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "ADMIN_UPDATE_PROD_DATA_FETCH",
    });
    const { data } = await axios.get(`${ServerBaseURI}/api/v1/product/${id}`);

    dispatch({
      type: "ADMIN_UPDATE_PROD_DATA_SUC",
      payload: data,
    });
  } catch (err) {
    const { success, message } = err.response.data;
    toast.error(message, {
      toastId: message,
      position: "bottom-center",
    });

    dispatch({
      type: "ADMIN_UPDATE_PROD_DATA_FAIL",
      payload: {
        success,
        message,
      },
    });
  }
};

export const createProduct =
  (name, price, category, productDescription, stock, images = []) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "ADMIN_CREATE_PRODUCT_REQ",
      });

      let imageLinks = [];
      let count = images.length;

      images.forEach(async (img) => {
        const temp_cloudImg = await getCloudImgURI(img, 720);
        imageLinks = [...imageLinks, temp_cloudImg.data.secure_url];

        count -= 1;
        if (count === 0) {
          await axios.post(
            `${ServerBaseURI}/api/v1/product/new`,
            {
              name,
              price,
              category,
              productDescription,
              stock,
              images: imageLinks,
            },
            { withCredentials: true }
          );

          dispatch({
            type: "ADMIN_CREATE_PRODUCT_SUC",
          });

          toast.success("Product Created Successfully", {
            toastId: "prod-cr-suc",
            position: "bottom-center",
          });

          dispatch(getCategoryList());
        }
      });
    } catch (err) {
      const { message } = err.response.data;

      toast.error(message, {
        toastId: message,
        position: "bottom-center",
      });

      dispatch({
        type: "ADMIN_CREATE_PRODUCT_FAIL",
        payload: message,
      });
    }
  };

export const updateProduct =
  (name, price, category, productDescription, stock, images = [], id) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "ADMIN_UPDATE_PRODUCT_REQ",
      });

      let imageLinks = [];
      let count = images.length;

      images.forEach(async (img) => {
        const temp_cloudImg = await getCloudImgURI(img, 720);
        imageLinks = [...imageLinks, temp_cloudImg.data.secure_url];

        count -= 1;
        if (count === 0) {
          const { data } = await axios.put(
            `${ServerBaseURI}/api/v1/product/${id}`,
            {
              name,
              price,
              category,
              productDescription,
              stock,
              images: imageLinks,
            },
            { withCredentials: true }
          );

          dispatch({
            type: "ADMIN_UPDATE_PRODUCT_SUC",
            payload: data,
          });

          toast.success(data.message, {
            toastId: "prod-cr-suc",
            position: "bottom-center",
          });

          dispatch(getCategoryList());
        }
      });
    } catch (err) {
      const { message } = err.response.data;

      toast.error(message, {
        toastId: message,
        position: "bottom-center",
      });
      console.log("here");

      dispatch({
        type: "ADMIN_UPDATE_PRODUCT_FAIL",
        payload: message,
      });
    }
  };

export const deleteProduct = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(
      `${ServerBaseURI}/api/v1/product/${id}`,
      {
        withCredentials: true,
      }
    );

    toast.success(data.message, {
      toastId: data.message,
      position: "bottom-center",
    });

    dispatch(getAllProductsAdmin());
  } catch (err) {
    const { message } = err.response.data;

    toast.error(message, {
      toastId: message,
      position: "bottom-center",
    });
  }
};

export const getProductReviewsAdmin = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "ADMIN_GET_PROD_REVIEWS_REQ",
    });

    const { data } = await axios.get(
      `${ServerBaseURI}/api/v1/product/review/${id}`,
      { withCredentials: true }
    );

    dispatch({
      type: "ADMIN_GET_PROD_REVIEWS_SUC",
      payload: data,
    });
  } catch (err) {
    const { success, message } = err.response.data;
    toast.error(message, {
      toastId: message,
      position: "bottom-center",
    });

    dispatch({
      type: "ADMIN_GET_PROD_REVIEWS_FAIL",
      payload: {
        success,
        message,
      },
    });
  }
};

export const deleteProductReview = (id, productId) => async (dispatch) => {
  try {
    const { data } = await axios.delete(
      `${ServerBaseURI}/api/v1/product/review/${productId}/?id=${id}`,
      {
        withCredentials: true,
      }
    );

    toast.success(data.message, {
      toastId: data.message,
      position: "bottom-center",
    });

    dispatch(getProductReviewsAdmin(productId));
  } catch (err) {
    const { message } = err.response.data;
    toast.error(message, {
      toastId: message,
      position: "bottom-center",
    });
  }
};
