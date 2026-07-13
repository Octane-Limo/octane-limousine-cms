import * as T from "./authType";

const initialState = {
  user: null,
  token: null,
  message: null,
  error: null,
  tokenValid: null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case T.AUTH_LOGIN_LOADING:
  return { ...state, loading: true, error: null, message: null };

case T.AUTH_LOGIN_SUCCESS:
  return {
    ...state,
    user: action.payload?.user || state.user,
    token: action.payload?.token || state.token || true, // if token comes from cookie
    loading: false,
    error: null,
  };

case T.AUTH_LOGIN_ERROR:
  return { ...state, loading: false, error: action.payload };

case T.AUTH_LOGOUT:
  return {
    ...initialState,
  };

case T.VERIFY_TOKEN_REQUEST:
  return {
    ...state,
    loading: true,
    error: null,
    message: null,
    tokenValid: null,
  };


    case T.FORGOT_PASSWORD_REQUEST:
    case T.RESET_PASSWORD_REQUEST:
      return { ...state, loading: true, error: null, message: null };

    case T.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        status: action.status,
      };

    case T.VERIFY_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        tokenValid: true,
        message: action.payload,
        error: null,
      };

    case T.RESET_PASSWORD_SUCCESS:
      return { ...state, loading: false, message: action.payload };

    case T.VERIFY_TOKEN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        tokenValid: false,
      };

    case T.FORGOT_PASSWORD_FAIL:
    case T.RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case T.AUTH_CLEAR_ERROR:
      return { ...state, error: null };

    case T.AUTH_CLEAR_MESSAGE:
      return { ...state, message: null };

    default:
      return state;
  }
};

export default authReducer;
