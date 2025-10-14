import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import * as types from './types';

const initState: types.State = {
  isSideNavOpen: false,
  errorMessage: '',
  isFetching: false,
};

const mainSlice = createSlice({
  name: 'main',
  initialState: initState,
  reducers: {
    setSideNav: (state, action: PayloadAction<boolean>) => {
      state.isSideNavOpen = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    sendMessage: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
  },
});

export const { setSideNav, setErrorMessage, sendMessage } = mainSlice.actions;
export default mainSlice.reducer;
