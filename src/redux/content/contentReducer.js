import {
  CONTENT_LOADING,
  CONTENT_SUCCESS,
  CONTENT_ERROR,
  CLEAR_CONTENT,
} from "./contentTypes";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const contentReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONTENT_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CONTENT_SUCCESS:
      // console.log("Action payload:", action.payload); // Debug log
      
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };

    case CONTENT_ERROR:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };

    case CLEAR_CONTENT:
      return initialState;

    default:
      return state;
  }
};

export default contentReducer;