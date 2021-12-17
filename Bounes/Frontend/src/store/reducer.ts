import { combineReducers } from "redux";
import contactsReducer from "./contacts";
import userReducer from "./user";
export default combineReducers({
  Contacts: contactsReducer,
  User: userReducer,
});
