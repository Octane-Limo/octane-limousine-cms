import axiosInstance from "../../axiosInstance";
import * as T from "./bookedType";

export const GetBookingDetailAction = () => {
  return (dispatch) => {
    dispatch({
      type: T.BOOKED_TYPE_LOADING,
    });
    axiosInstance
      .get("/api/appointment/booked-appointments")
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: T.BOOKED_TYPE_SUCCESS,
            payload: res.data.data,
          });
        } else {
          dispatch({
            type: T.BOOKED_TYPE_ERROR,
            payload: res.data.message,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: T.BOOKED_TYPE_ERROR,
          payload:
            error.response?.data?.message || "Failed to fetch Leads data.",
        });
      });
  };
};