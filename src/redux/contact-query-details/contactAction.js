import axiosInstance from "../../axiosInstance";
import * as T from "./contactType";

export const GetContactQueryDetailAction = () => {
  return (dispatch) => {
    dispatch({
      type: T.CONTACT_TYPE_LOADING,
    });
    axiosInstance
      .get("/api/contact")
      .then((res) => {
        if (res.status === 200) {
          console.log("Response: ", res.data.data);
          
          dispatch({
            type: T.CONTACT_TYPE_SUCCESS,
            payload: res.data.data,
          });
        } else {
          dispatch({
            type: T.CONTACT_TYPE_ERROR,
            payload: res.data.message,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: T.CONTACT_TYPE_ERROR,
          payload:
            error.response?.data?.message || "Failed to fetch Leads data.",
        });
      });
  };
};