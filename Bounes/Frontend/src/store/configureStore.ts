import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import apiMiddleware from "./middleware/api";
import rootReducer from "./reducer";

let devtools = true;
if (
  process.env.NODE_ENV !== "production"
  // && process.browser &&
  // window.__REDUX_DEVTOOLS_EXTENSION__
) {
  devtools = true;
}

const store = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware(), logger, apiMiddleware],
    devTools: devtools,
  });
};

export default store;
