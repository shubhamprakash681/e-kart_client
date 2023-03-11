import axios from "axios";
import { toast } from "react-toastify";
import { getCloudImgURI } from "../utils/cloudinary";

const ServerBaseURI = process.env.REACT_APP_URI_SERVER_BASE_URL;

const config = {
  headers: {
    "Content-Type": "application/json",
  },

  withCredentials: true,
};

export const login =
  ({ email, pswd }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "UPDATE_USER_REQ",
      });

      const { data } = await axios.post(
        `${ServerBaseURI}/api/v1/login`,
        {
          email,
          pswd,
        },
        config
      );
      // console.log("here", data);

      dispatch({
        type: "UPDATE_USER_SUCCESS",
        payload: data,
      });

      dispatch(loadUserData());
    } catch (err) {
      const { success, message } = err.response.data;
      dispatch({
        type: "UPDATE_USER_FAIL",
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

export const register =
  ({ name, email, pswd, avatar }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "UPDATE_USER_REQ",
      });

      const temp_cloudImg = await getCloudImgURI(avatar, 200);
      // console.log(temp_cloudImg);

      const { data } = await axios.post(
        `${ServerBaseURI}/api/v1/register`,
        {
          name,
          email,
          pswd,
          avatar: temp_cloudImg.data.secure_url,
        },
        { withCredentials: true }
      );

      dispatch({
        type: "UPDATE_USER_SUCCESS",
        payload: data,
      });

      toast.success("Registration Successful", {
        toastId: "regis-successful",
        position: "bottom-center",
      });

      dispatch(loadUserData());

      // delete temp_cloudImg -> TODO
    } catch (err) {
      const { success, message } = err.response.data;
      dispatch({
        type: "UPDATE_USER_FAIL",
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

export const loadUserData = () => async (dispatch) => {
  try {
    dispatch({
      type: "UPDATE_USER_REQ",
    });

    const { data } = await axios.get(`${ServerBaseURI}/api/v1/me`, {
      withCredentials: true,
    });

    dispatch({
      type: "UPDATE_USER_SUCCESS",
      payload: data,
    });

    toast.success(`Welcome ${data.user.name}`, {
      toastId: "load-user-successful",
      position: "bottom-center",
    });
  } catch (err) {
    const { success, message } = err.response.data;
    dispatch({
      type: "UPDATE_USER_FAIL",
      payload: {
        success,
        message,
      },
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.get(`${ServerBaseURI}/api/v1/logout`, {
      withCredentials: true,
    });

    dispatch({
      type: "LOGOUT",
    });

    toast.success("Logged Out Successfuly", {
      toastId: "logout",
      position: "bottom-center",
    });
  } catch (err) {
    const { success, message } = err.response.data;
    dispatch({
      type: "LOGOUT_FAIL",
      payload: { success, message },
    });

    toast.error(message, {
      toastId: "logout-fail",
      position: "bottom-center",
    });
  }
};

export const updateProfile =
  ({ name, email, avatar }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "UPDATE_USER_DATA_REQ",
      });

      // console.log(`${name} ${email} ${avatar}`);

      if (avatar) {
        // avatar image is updated
        const temp_cloudImg = await getCloudImgURI(avatar, 200);
        //   console.log(temp_cloudImg);

        avatar = temp_cloudImg.data.secure_url;
      }

      await axios.put(
        `${ServerBaseURI}/api/v1/me/update`,
        {
          name,
          email,
          avatar,
        },
        { withCredentials: true }
      );

      dispatch({
        type: "UPDATE_USER_DATA_SUCCESS",
      });

      // loading new data after update
      dispatch(loadUserData());

      toast.success("Profile Updated Successfully", {
        toastId: "prof-update-suc",
        position: "bottom-center",
      });
    } catch (err) {
      const { success, message } = err.response.data;
      dispatch({
        type: "UPDATE_USER_DATA_FAIL",
        payload: { success, message },
      });

      toast.error(message, {
        toastId: "update-prof-fail",
        position: "bottom-center",
      });
    }
  };

export const updatePassword =
  (oldPswd, newPswd, cnfPswd) => async (dispatch) => {
    try {
      dispatch({
        type: "PSWD_RESET_MAIL_REQ",
      });

      await axios.put(
        `${ServerBaseURI}/api/v1/password/update`,
        {
          oldPswd,
          newPswd,
          cnfPswd,
        },
        { withCredentials: true }
      );

      dispatch({
        type: "PSWD_RESET_MAIL_SUC_FAIL",
      });

      toast.success("Password Updated Successfully", {
        toastId: "pswd-up-suc",
        position: "bottom-center",
      });

      // logging out
      dispatch(logout());
    } catch (err) {
      const { message } = err.response.data;

      dispatch({
        type: "PSWD_RESET_MAIL_SUC_FAIL",
      });

      toast.error(message, {
        toastId: "update-prof-fail",
        position: "bottom-center",
      });
    }
  };

export const getPasswordResetToken = (email) => async (dispatch) => {
  try {
    dispatch({
      type: "PSWD_RESET_MAIL_REQ",
    });

    const { data } = await axios.post(
      `${ServerBaseURI}/api/v1/password/forgot`,
      {
        email,
      }
    );

    dispatch({
      type: "PSWD_RESET_MAIL_SUC_FAIL",
    });

    toast.success(data.message, {
      toastId: "reset-tok-email-sent",
      position: "bottom-center",
    });
  } catch (err) {
    // console.log(err);
    dispatch({
      type: "PSWD_RESET_MAIL_SUC_FAIL",
    });

    const { message } = err.response.data;
    toast.error(message, {
      toastId: "send-reset-token-fail",
      position: "bottom-center",
    });
  }
};

export const resetPasswordThroughToken =
  ({ password, confirmPassword }, token) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "PSWD_RESET_REQ",
      });

      const { data } = await axios.put(
        `${ServerBaseURI}/api/v1/password/reset/${token}`,
        {
          password,
          confirmPassword,
        },
        { withCredentials: true }
      );

      console.log(data);
      const { success, user } = data;

      toast.success("Password reset seccessful", {
        toastId: "reset-pswd-by-token-suc",
        position: "bottom-center",
      });

      dispatch({
        type: "PSWD_RESET_SUC",
        payload: { success, user },
      });
    } catch (err) {
      const { success, message } = err.response.data;

      dispatch({
        type: "PSWD_RESET_FAIL",
        payload: { success, message },
      });

      toast.error(message, {
        toastId: "reset-pswd-by-token-fail",
        position: "bottom-center",
      });
    }
  };
