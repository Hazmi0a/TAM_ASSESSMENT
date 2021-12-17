import { AnyAction, createAction } from "@reduxjs/toolkit";
import axios from "axios";

type request = {
  url?: string;
  method: string;
  data?: any;
  token?: string;
  onStart: string;
  onSuccess: string;
  onError: string;
  onRefresh?: AnyAction;
  onRedirect?: string;
};

// API_ENDPOINT
export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
});

//Action types
export const apiCallBegan = createAction<request>("api/callBegan");
export const apiCallfail = createAction("api/callfail");
export const apiCallSuccess = createAction("api/callSuccess");

export const apiStatusCode = createAction("api/Status", function prepare(text) {
  return {
    payload: {
      text,
    },
  };
});
