import axios from "axios";
import { toast } from "react-toastify";

const ServerBaseURI = process.env.REACT_APP_URI_SERVER_BASE_URL;

export const getAllOrdersAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: "ADMIN_GET_ALL_ORDERS_REQ",
    });

    const { data } = await axios.get(`${ServerBaseURI}/api/v1/admin/orders`, {
      withCredentials: true,
    });

    dispatch({
      type: "ADMIN_GET_ALL_ORDERS_SUC",
      payload: data.orders,
    });
  } catch (err) {
    const { success, message } = err.response.data;
    toast.error(message, {
      toastId: message,
      position: "bottom-center",
    });

    dispatch({
      type: "ADMIN_GET_ALL_ORDERS_FAIL",
      payload: {
        success,
        message,
      },
    });
  }
};

export const getOrderDetailsAdmin = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "ADMIN_GET_ORDER_DET_REQ",
    });

    const { data } = await axios.get(`${ServerBaseURI}/api/v1/order/${id}`, {
      withCredentials: true,
    });

    dispatch({
      type: "ADMIN_GET_ORDER_DET_SUC",
      payload: data.order,
    });
  } catch (err) {
    const { success, message } = err.response.data;
    toast.error(message, {
      toastId: message,
      position: "bottom-center",
    });

    dispatch({
      type: "ADMIN_GET_ORDER_DET_FAIL",
      payload: {
        success,
        message,
      },
    });
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(
      `${ServerBaseURI}/api/v1/admin/order/${id}`,
      {
        withCredentials: true,
      }
    );

    toast.success(data.message, {
      toastId: data.message,
      position: "bottom-center",
    });

    dispatch(getAllOrdersAdmin());
  } catch (err) {
    const { message } = err.response.data;

    toast.error(message, {
      toastId: message,
      position: "bottom-center",
    });
  }
};

export const processOrder = (id, status) => async (dispatch) => {
  try {
    dispatch({
      type: "ADMIN_PROCESS_ORDER_REQ",
    });

    const { data } = await axios.put(
      `${ServerBaseURI}/api/v1/admin/order/${id}`,
      { status },
      { withCredentials: true }
    );

    dispatch({
      type: "ADMIN_PROCESS_ORDER_SUC",
      payload: data.order,
    });

    toast.success(data.message, {
      toastId: data.message,
      position: "bottom-center",
    });
  } catch (err) {
    const { success, message } = err.response.data;
    dispatch({
      type: "ADMIN_PROCESS_ORDER_FAIL",
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
