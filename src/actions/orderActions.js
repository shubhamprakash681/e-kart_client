import axios from "axios";
import { toast } from "react-toastify";

const ServerBaseURI = process.env.REACT_APP_URI_SERVER_BASE_URL;

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({
      type: "CREATE_CURR_ORDER_REQUEST",
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${ServerBaseURI}/api/v1/order/new`,
      order,
      config
    );

    dispatch({
      type: "CREATE_CURR_ORDER_SUCCESS",
      payload: data,
    });

    // deleting cart on successful order
    dispatch({
      type: "UPDATE_CART",
      payload: [],
    });
  } catch (err) {
    const { message } = err.response.data;
    toast.error(message, {
      toastId: message,
      position: "bottom-center",
    });

    dispatch({
      type: "CREATE_CURR_ORDER_FAIL",
      payload: message,
    });
  }
};

export const getMyOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: "MY_ORDERS_REQ",
    });

    const { data } = await axios.get(`${ServerBaseURI}/api/v1/orders/me`, {
      withCredentials: true,
    });

    dispatch({
      type: "MY_ORDERS_SUC",
      payload: data,
    });
  } catch (err) {
    const { message } = err.response.data;
    toast.error(message, {
      toastId: message,
      position: "bottom-center",
    });

    dispatch({
      type: "MY_ORDERS_FAIL",
      payload: message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "CREATE_CURR_ORDER_REQUEST",
    });

    const { data } = await axios.get(`${ServerBaseURI}/api/v1/order/${id}`, {
      withCredentials: true,
    });

    dispatch({
      type: "CREATE_CURR_ORDER_SUCCESS",
      payload: data,
    });
  } catch (err) {
    const { message } = err.response.data;
    toast.error(message, {
      toastId: message,
      position: "bottom-center",
    });

    dispatch({
      type: "CREATE_CURR_ORDER_FAIL",
      payload: message,
    });
  }
};
