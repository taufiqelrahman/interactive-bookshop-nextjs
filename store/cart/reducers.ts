import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import * as types from './types';

const initialState: types.CartState = {
  isFetching: false,
  cart: null,
  selected: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    loadCart: (state, action: PayloadAction<{ isFetching: boolean; payload: types.Cart | null | undefined }>) => {
      state.isFetching = action.payload.isFetching;
      state.cart = action.payload.payload || null;
    },
    addToCart: (state, action: PayloadAction<{ isFetching: boolean; payload: types.Cart | null | undefined }>) => {
      state.isFetching = action.payload.isFetching;
      state.cart = action.payload.payload || null;
    },
    transferCart: (state, action: PayloadAction<{ isFetching: boolean; payload: types.Cart | null | undefined }>) => {
      state.isFetching = action.payload.isFetching;
      state.cart = action.payload.payload || null;
    },
    updateCart: (state, action: PayloadAction<{ isFetching: boolean; payload: types.Cart | null | undefined }>) => {
      state.isFetching = action.payload.isFetching;
      state.cart = action.payload.payload || null;
    },
    removeFromCart: (state, action: PayloadAction<{ isFetching: boolean; payload: types.Cart | null | undefined }>) => {
      state.isFetching = action.payload.isFetching;
      state.cart = action.payload.payload || null;
    },
    saveSelected: (state, action: PayloadAction<Partial<types.CartItem> | null>) => {
      state.selected = action.payload as types.CartItem | null;
    },
    createCart: (state, action: PayloadAction<{ isFetching: boolean }>) => {
      state.isFetching = action.payload.isFetching;
    },
  },
});

export const { loadCart, addToCart, transferCart, updateCart, removeFromCart, saveSelected, createCart } =
  cartSlice.actions;
export default cartSlice.reducer;
