import axios from "axios";
import { toast } from "react-toastify";

const ServerBaseURI = process.env.REACT_APP_URI_SERVER_BASE_URL;

export const getAllUsersAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: "ADMIN_GET_ALL_USERS_REQ",
    });

    const { data } = await axios.get(`${ServerBaseURI}/api/v1/admin/users`, {
      withCredentials: true,
    });

    dispatch({
      type: "ADMIN_GET_ALL_USERS_SUC",
      payload: data.users,
    });
  } catch (err) {
    const { success, message } = err.response.data;
    toast.error(message, {
      toastId: message,
      position: "bottom-center",
    });

    dispatch({
      type: "ADMIN_GET_ALL_USERS_FAIL",
      payload: {
        success,
        message,
      },
    });
  }
};

export const getUserDetailsAdmin = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "ADMIN_GET_USER_DETAILS_REQ",
    });

    const { data } = await axios.get(
      `${ServerBaseURI}/api/v1/admin/user/${id}`,
      { withCredentials: true }
    );

    dispatch({
      type: "ADMIN_GET_USER_DETAILS_SUC",
      payload: data.user,
    });
  } catch (err) {
    const { success, message } = err.response.data;
    toast.error(message, {
      toastId: message,
      position: "bottom-center",
    });

    dispatch({
      type: "ADMIN_GET_USER_DETAILS_FAIL",
      payload: {
        success,
        message,
      },
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(
      `${ServerBaseURI}/api/v1/admin/user/${id}`,
      {
        withCredentials: true,
      }
    );

    toast.success(data.message, {
      toastId: data.message,
      position: "bottom-center",
    });

    dispatch(getAllUsersAdmin());
  } catch (err) {
    const { message } = err.response.data;

    toast.error(message, {
      toastId: message,
      position: "bottom-center",
    });
  }
};

export const updateUserRole = (user, role) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      `${ServerBaseURI}/api/v1/admin/user/${user._id}`,
      {
        user,
        role,
      },
      {
        withCredentials: true,
      }
    );

    toast.success(data.message, {
      toastId: data.message,
      position: "bottom-center",
    });

    dispatch(getAllUsersAdmin());
  } catch (err) {
    const { message } = err.response.data;

    toast.error(message, {
      toastId: message,
      position: "bottom-center",
    });
  }
};
