import axiosInstance from "../../axiosInstance";
import {
  CONTENT_LOADING,
  CONTENT_SUCCESS,
  CONTENT_ERROR,
  CLEAR_CONTENT,
} from "./contentTypes";

// Action to fetch content from API
export const fetchContent = (pageId) => async (dispatch) => {
  try {
    dispatch({ type: CONTENT_LOADING });

    // Use pageId in the API URL
    const url = pageId ? `/api/pages/${pageId}` : "/api/pages";
    const response = await axiosInstance.get(url);
    
    dispatch({
      type: CONTENT_SUCCESS,
      payload: response.data.data || response.data,
    });
  } catch (error) {
    dispatch({
      type: CONTENT_ERROR,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Action to clear content state
export const clearContent = () => ({
  type: CLEAR_CONTENT,
});

// Optional: Action to fetch specific page content if needed
export const fetchPageContent = (pageId) => async (dispatch) => {
  try {
    dispatch({ type: CONTENT_LOADING });

    const response = await axiosInstance.get(`/api/pages/${pageId}`);
    
    dispatch({
      type: CONTENT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CONTENT_ERROR,
      payload: error.response?.data?.message || error.message,
    });
  }
};