import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import { bookedDetailsReducer } from "./booked-details/bookedReducer";
import contentReducer from "./content/contentReducer";
import { contactQueryDetailsReducer } from "./contact-query-details/contactReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  bookedDetailsReducer: bookedDetailsReducer,
  content: contentReducer,
  contact: contactQueryDetailsReducer
});

export default rootReducer;
