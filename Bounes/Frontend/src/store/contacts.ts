import {
    CreateContact,
    patchObj,
    Contact,
    ContactState,
    RootState,
  } from "./../types.d";
  import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
  import { apiCallBegan } from "./api";
  
  const initialState = {
    loading: false,
    contacts: [],
    // lastFetch: null
  } as ContactState;
  
  const slice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
      contactRequest: (req, action) => {
        req.loading = true;
      },
      contactRequestFail: (req, action) => {
        req.loading = false;
      },
      contactListSucess: (op, action: PayloadAction<Contact[]>) => {
        op.contacts = action.payload;
        op.loading = false;
      },
      contactCreateSucess: (op, action) => {
        op.contacts.push(action.payload);
        op.loading = false;
      },
      // actions => action handlers
  
      contactFail: (contacts, action) => {
        contacts.loading = false;
      },
      contactUpdateSucess: (contacts, action) => {
        contacts.loading = false;
      },
      contactDeleteSucess: (contacts, action) => {
        contacts.loading = false;
      },
      contacttypesSucess: (contacts, action) => {
        contacts.contacts = action.payload;
        contacts.loading = false;
      },
    },
  });
  
  export const {
    contactCreateSucess,
    contactListSucess,
    contactFail,
    contacttypesSucess,
    contactRequest,
    contactRequestFail,
    contactUpdateSucess,
    contactDeleteSucess,
  } = slice.actions;
  export default slice.reducer;
  
  // Action creators
  const url = process.env.REACT_APP_CONTACTS_ENDPOINT;
  
  export const createContact = (data: CreateContact) => (
    dispatch: Dispatch<any>,
    getState: () => RootState
  ) => {
    // get the auth token to send alongside request
    const token = getState().User.authToken;
    dispatch(
      apiCallBegan({
        url,
        method: "post",
        data,
        token,
        onStart: contactRequest.type,
        onSuccess: contactCreateSucess.type,
        onError: contactFail.type,
      })
    );
  };
  
  export const getContacts = () => (
    dispatch: Dispatch<any>,
    getState: () => RootState
  ) => {
    // get the auth token to send alongside request
    const token = getState().User.authToken;
    const userid = getState().User.user.id;
    dispatch(
      apiCallBegan({
        url: url + "user/" + userid,
        method: "get",
        token,
        onStart: contactRequest.type,
        onSuccess: contactListSucess.type,
        onError: contactFail.type,
      })
    );
  };
  
  export const updateContact = (id: number, data: Array<patchObj>) => (
    dispatch: Dispatch<any>,
    getState: () => RootState
  ) => {
    const token = getState().User.authToken;
    const userid = getState().User.user.id;
    const refreshList = apiCallBegan({
      url: url + "user/" + userid,
      method: "get",
      token,
      onStart: contactRequest.type,
      onSuccess: contactListSucess.type,
      onError: contactFail.type,
    });
    dispatch(
      apiCallBegan({
        url: url + "" + id,
        method: "patch",
        data,
        token,
        onStart: contactRequest.type,
        onSuccess: contactUpdateSucess.type,
        onError: contactFail.type,
        onRefresh: refreshList,
      })
    );
  };
  
  export const deleteContact = (data: number) => (
    dispatch: Dispatch<any>,
    getState: () => RootState
  ) => {
    // get the auth token to send alongside request
    const token = getState().User.authToken;
    const userid = getState().User.user.id;
    const refreshList = apiCallBegan({
      url: url + "user/" + userid,
      method: "get",
      token,
      onStart: contactRequest.type,
      onSuccess: contactListSucess.type,
      onError: contactFail.type,
    });
  
    dispatch(
      apiCallBegan({
        url: url + "" + data,
        method: "delete",
        // data,
        token,
        onStart: contactRequest.type,
        onSuccess: contactDeleteSucess.type,
        onError: contactFail.type,
        onRefresh: refreshList,
      })
    );
  };
  
  // export const getUserTypes = () => (dispatch, getState) => {
  //   const token = getState().entities.auth.accessToken;
  //   const url = process.env.REACT_APP_USER_USERTYPES;
  //   dispatch(
  //     apiCallBegan({
  //       url,
  //       method: "get",
  //       token,
  //       onStart: contactRequest.type,
  //       onSuccess: contacttypesSucess.type,
  //       onError: contactRequestFail.type,
  //     })
  //   );
  // };
  