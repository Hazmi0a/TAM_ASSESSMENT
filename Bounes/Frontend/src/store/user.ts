import { Session, UserState } from "../types";
import { Login, Registration, User } from "../types";
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import history from "../history";
import { signinRoute, homeRoute } from "../Routes";
import { setItem, getItem } from "../localService";

const initialState = {
  loading: false,
  loggedIn: false,
  user: {},
  authToken: "",
  // lastFetch: null
} as UserState;

const localUser = getItem("user");
const localAuth = getItem("authToken");
if (localUser && localAuth) {
  initialState.user = localUser;
  initialState.authToken = localAuth;
  initialState.loggedIn = true;
}

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userRequest: (req, action) => {
      req.loading = true;
    },
    userRequestFail: (req, action) => {
      req.loading = false;
    },
    userLoginSucess: (op, action: PayloadAction<Session>) => {
      op.authToken = action.payload.authToken;
      op.user = action.payload.user;
      setItem("user", op.user);
      setItem("authToken", op.authToken);
      op.loggedIn = true;
      op.loading = false;
    },
    userCreateSucess: (op, action) => {
      op.authToken = action.payload.authToken;
      op.user = action.payload.user;
      setItem("user", op.user);
      setItem("authToken", op.authToken);
      op.loggedIn = true;
      op.loading = false;
    },
    // actions => action handlers

    userFail: (users, action) => {
      users.loading = false;
    },
    userUpdateSucess: (users, action) => {
      users.loading = false;
    },
    userDeleteSucess: (users, action) => {
      users.loading = false;
    },
    usertypesSucess: (users, action) => {
      users.loading = false;
    },
  },
});

export const {
  userCreateSucess,
  userLoginSucess,
  userFail,
  usertypesSucess,
  userRequest,
  userRequestFail,
  userUpdateSucess,
  userDeleteSucess,
} = slice.actions;
export default slice.reducer;

// Action creators
const url = process.env.REACT_APP_USERS_ENDPOINT;

export const registerUser = (data: Registration) => (
  dispatch: Dispatch<any>,
  getState: any
) => {
  dispatch(
    apiCallBegan({
      url: url + "register",
      method: "post",
      data,
      onStart: userRequest.type,
      onSuccess: userCreateSucess.type,
      onError: userFail.type,
      onRedirect: signinRoute,
    })
  );
};

export const loginUser = (data: Login) => (
  dispatch: Dispatch<any>,
  getState: any
) => {
  dispatch(
    apiCallBegan({
      url: url + "login",
      method: "post",
      data,
      onStart: userRequest.type,
      onSuccess: userLoginSucess.type,
      onError: userFail.type,
      onRedirect: homeRoute,
    })
  );
};
// // redirect to home page
// history.push("/session/signup");

// export const updateUser = (id, data) => (dispatch, getState) => {
//   const token = getState().entities.auth.accessToken;
//   const url = process.env.REACT_APP_USER_ENDPOINT + "/" + id;
//   dispatch(
//     apiCallBegan({
//       url,
//       method: "patch",
//       data,
//       token,
//       onStart: userRequest.type,
//       onSuccess: userUpdateSucess.type,
//       onError: userFail.type,
//     })
//   );
// };
// export const deletUser = (id) => (dispatch, getState) => {
//   const token = getState().entities.auth.accessToken;
//   const url = process.env.REACT_APP_USER_ENDPOINT + "/" + id;
//   dispatch(
//     apiCallBegan({
//       url,
//       method: "delete",
//       token,
//       onStart: userRequest.type,
//       onSuccess: userDeleteSucess.type,
//       onError: userFail.type,
//     })
//   );
// };

// export const getUserTypes = () => (dispatch, getState) => {
//   const token = getState().entities.auth.accessToken;
//   const url = process.env.REACT_APP_USER_USERTYPES;
//   dispatch(
//     apiCallBegan({
//       url,
//       method: "get",
//       token,
//       onStart: userRequest.type,
//       onSuccess: usertypesSucess.type,
//       onError: userRequestFail.type,
//     })
//   );
// };
