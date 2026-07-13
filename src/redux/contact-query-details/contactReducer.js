import * as actionTypes from "./contactType";

const initialState = {
  isLoadingAllContactDetails: false,
  isAllContactDetails: null,
  error: false,
};

export const contactQueryDetailsReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case actionTypes.CONTACT_TYPE_LOADING:
      return {
        ...state,
        isLoadingAllContactDetails: true,
      };

    case actionTypes.CONTACT_TYPE_SUCCESS:
      return {
        ...state,
        isAllContactDetails: payload,
        isLoadingAllContactDetails: false,
      };

    case actionTypes.CONTACT_TYPE_ERROR:
      return {
        ...state,
        isLoadingAllContactDetails: false,
      };
    default:
      return state;
  }
};
