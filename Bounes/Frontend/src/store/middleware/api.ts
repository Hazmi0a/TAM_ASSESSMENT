import * as actions from "../api";
import { instance } from "../api";
import { Dispatch, AnyAction } from "@reduxjs/toolkit";
import history from "../../history";
const api = ({ dispatch }: { dispatch: Dispatch<any> }) => (
  next: (action: AnyAction) => void
) => async (action: AnyAction) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const {
    url,
    method,
    data,
    token,
    onStart,
    onSuccess,
    onError,
    onRefresh,
    onRedirect,
  } = action.payload;

  if (onStart) dispatch({ type: onStart });
  next(action);
  try {
    // introduce manual delay
    // setTimeout(function () {
    //   //your code to be executed after 1 second
    //   const res = await instance.request({
    //     url,
    //     method,
    //     data,
    //     headers: { Authorization: "Bearer " + token },
    //   });
    //   // General
    //   dispatch({ type: actions.apiCallSuccess.type, payload: res.data });
    //   // Specific
    //   if (onSuccess) dispatch({ type: onSuccess, payload: res.data });
    // }, 5000);
    const res = await instance.request({
      url,
      method,
      data,
      headers: { Authorization: "Bearer " + token },
    });
    // General
    dispatch({ type: actions.apiCallSuccess.type, payload: res.data });
    dispatch({ type: actions.apiStatusCode.type, payload: res.statusText });
    // Specific
    if (onSuccess) dispatch({ type: onSuccess, payload: res.data });
    if (onRefresh)
      dispatch({ type: onRefresh.type, payload: onRefresh.payload });
    if (onRedirect) history.push(onRedirect);
  } catch (err) {
    // General
    dispatch({ type: actions.apiCallfail.type, payload: err.message });
    // Specific
    if (onError) dispatch({ type: onError, payload: err.message });
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

export default api;
