import Router from "next/router";
import {loginSucess} from '../auth'
import { createAction } from "@reduxjs/toolkit";

 const beforeHandler =  createAction("redirect/beforeHandler");
 const afterHandler =  createAction("redirect/afterHandler");

const redirect = ({ dispatch }) => (next) => (action) => {
  if (action.type !== loginSucess.type) return next(action);

  if (onStart) dispatch({ type: onStart });
  next(action);
  try {
    const res = await instance.request({ url, method, data });
    // General
    dispatch({ type: actions.apiCallSuccess.type, payload: res.data });
    // Specific
    if (onSuccess) dispatch({ type: onSuccess, payload: res.data });
  } catch (err) {
    // General
    dispatch({ type: actions.apiCallfail.type, payload: err.message });
    // Specific
    if (OnError) dispatch({ type: OnError, payload: err.message });
  }
};

// export const authHeader = (token) => {
//     let accessToken = token;
//     if (accessToken == undefined){
//      accessToken = localStorage.getItem('accessToken');
//     }
//       if (accessToken) {
//         return { Authorization: 'Bearer ' + accessToken };
//       } else {
//         return {};
//       }
//     }

export default redirect;
