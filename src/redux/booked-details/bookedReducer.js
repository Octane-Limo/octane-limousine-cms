import * as actionTypes from "./bookedType";

const initialState = {
  isLoadingAllBookedDetails: false,
  isAllBookedDetails: null,
  error: false,
};

export const bookedDetailsReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case actionTypes.BOOKED_TYPE_LOADING:
      return {
        ...state,
        isLoadingAllBookedDetails: true,
      };

    case actionTypes.BOOKED_TYPE_SUCCESS:
      return {
        ...state,
        isAllBookedDetails: payload,
        isLoadingAllBookedDetails: false,
      };

    case actionTypes.BOOKED_TYPE_ERROR:
      return {
        ...state,
        isLoadingAllBookedDetails: false,
      };
    default:
      return state;
  }
};
