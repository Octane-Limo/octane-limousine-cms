import * as T from "./authType";
import axiosInstance from "../../axiosInstance";
import axios from "axios";
import Cookies from "js-cookie";

const handleJson = async (res) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.message || `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data;
};

const getMsg = (err) => {
  if (axios.isAxiosError(err)) {
    const d = err.response?.data;
    return (
      d?.message ||
      d?.error ||
      err.response?.statusText ||
      `Login failed (${err.response?.status ?? "network"})`
    );
  }
  return err?.message || "Login failed";
};

export const loginUser = (credentials, navigateAfterLogin) => async (dispatch) => {
  dispatch({ type: T.AUTH_LOGIN_LOADING });

  try {
    const { data } = await axiosInstance.post("/api/auth/login", credentials);

    Cookies.set("token", data.token, {
        expires: 1,
        secure: true,
        sameSite: "strict",
      });

    dispatch({
      type: T.AUTH_LOGIN_SUCCESS,
      payload: data,
    });


    navigateAfterLogin();
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Login failed";

    dispatch({ type: T.AUTH_LOGIN_ERROR, payload: message });
  }
};

// export const loginUser =
//   (credentials, navigateAfterLogin) => async (dispatch) => {
//     try {
//       const { data } = await axiosInstance.post(
//         "/api/auth/login",
//         credentials,
//         {
//           withCredentials: true,
//         }
//       );

//       dispatch({
//         type: T.AUTH_LOGIN_SUCCESS,
//         payload: data,
//       });
      
//       navigateAfterLogin();
//     } catch (error) {
//       const message = getMsg(error);
//       dispatch({ type: T.AUTH_LOGIN_ERROR, payload: { message } });
//     }
//   };

// export const logoutUser = (afterLogout) => (dispatch) => {
//   Cookies.remove("token");
//   dispatch({ type: T.AUTH_LOGOUT });
//   afterLogout();
// };

export const logoutUser = (afterLogout) => async (dispatch) => {
  try {
    await axiosInstance.post("/api/auth/logout"); // backend clears cookie
    Cookies.remove("token");
    dispatch({ type: T.AUTH_LOGOUT });
    afterLogout();
  } catch (error) {
    console.error("Logout error:", error);
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: T.FORGOT_PASSWORD_REQUEST });
    const res = await fetch(
      `https://octane-limousine-backend.vercel.app/api/auth/forgot-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email }),
      }
    );
    const data = await handleJson(res);
    dispatch({
      type: T.FORGOT_PASSWORD_SUCCESS,
      payload: data.message,
      status: data.status,
    });
  } catch (err) {
    dispatch({ type: T.FORGOT_PASSWORD_FAIL, payload: err.message });
  }
};

export const verifyResetToken = (token) => async (dispatch) => {
  try {
    dispatch({ type: T.VERIFY_TOKEN_REQUEST });
    const res = await fetch(
      `https://octane-limousine-backend.vercel.app/api/auth/reset-password/${encodeURIComponent(
        token
      )}`,
      { method: "GET", credentials: "include" }
    );
    const data = await handleJson(res);
    dispatch({ type: T.VERIFY_TOKEN_SUCCESS, payload: data.message });
  } catch (err) {
    dispatch({ type: T.VERIFY_TOKEN_FAIL, payload: err.message });
  }
};

export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({ type: T.RESET_PASSWORD_REQUEST });
    const res = await fetch(
      `https://octane-limousine-backend.vercel.app/api/auth/reset-password/${encodeURIComponent(
        token
      )}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password }),
      }
    );
    const data = await handleJson(res);
    dispatch({ type: T.RESET_PASSWORD_SUCCESS, payload: data.message });
  } catch (err) {
    dispatch({ type: T.RESET_PASSWORD_FAIL, payload: err.message });
  }
};

export const clearAuthError = () => ({ type: T.AUTH_CLEAR_ERROR });