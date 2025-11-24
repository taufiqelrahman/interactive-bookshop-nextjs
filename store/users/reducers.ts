import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import * as types from './types';

const initState: types.UsersState = {
  isFetching: false,
  isLoggedIn: false,
  isExpired: false,
  user: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState: initState,
  reducers: {
    loadUser: (state, action: PayloadAction<{ isFetching: boolean; payload: types.User | null | undefined }>) => {
      state.user = action.payload.payload || state.user;
      state.isFetching = action.payload.isFetching;
    },
    setLogin: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setExpired: (state, action: PayloadAction<boolean>) => {
      state.isExpired = action.payload;
    },
    login: (state, action: PayloadAction<{ isFetching: boolean; payload: boolean | undefined }>) => {
      state.isLoggedIn = action.payload.payload || false;
      state.isFetching = action.payload.isFetching;
    },
    loginFacebook: (state, action: PayloadAction<{ isFetching: boolean; payload: boolean | undefined }>) => {
      state.isLoggedIn = action.payload.payload || false;
      state.isFetching = action.payload.isFetching;
    },
    loginGoogle: (state, action: PayloadAction<{ isFetching: boolean; payload: boolean | undefined }>) => {
      state.isLoggedIn = action.payload.payload || false;
      state.isFetching = action.payload.isFetching;
    },
    logout: (state, action: PayloadAction<{ isFetching: boolean; payload: boolean | undefined }>) => {
      state.isLoggedIn = action.payload.payload || false;
      state.isFetching = action.payload.isFetching;
    },
    forgotPassword: (state, action: PayloadAction<{ isFetching: boolean }>) => {
      state.isFetching = action.payload.isFetching;
    },
    register: (state, action: PayloadAction<{ isFetching: boolean }>) => {
      state.isFetching = action.payload.isFetching;
    },
    resetPassword: (state, action: PayloadAction<{ isFetching: boolean }>) => {
      state.isFetching = action.payload.isFetching;
    },
    sendOtp: (state, action: PayloadAction<{ isFetching: boolean }>) => {
      state.isFetching = action.payload.isFetching;
    },
  },
});

export const {
  loadUser,
  setLogin,
  setExpired,
  login,
  loginFacebook,
  loginGoogle,
  logout,
  forgotPassword,
  register,
  resetPassword,
  sendOtp,
} = usersSlice.actions;
export default usersSlice.reducer;
