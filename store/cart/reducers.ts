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
    loadCart: (state, action: PayloadAction<{ isFetching: boolean; payload: types.Cart | null }>) => {
      state.isFetching = action.payload.isFetching;
      state.cart = action.payload.payload;
    },
    addToCart: (state, action: PayloadAction<{ isFetching: boolean; payload: types.Cart | null }>) => {
      state.isFetching = action.payload.isFetching;
      state.cart = action.payload.payload;
    },
    transferCart: (state, action: PayloadAction<{ isFetching: boolean; payload: types.Cart | null }>) => {
      state.isFetching = action.payload.isFetching;
      state.cart = action.payload.payload;
    },
    updateCart: (state, action: PayloadAction<{ isFetching: boolean; payload: types.Cart | null }>) => {
      state.isFetching = action.payload.isFetching;
      state.cart = action.payload.payload;
    },
    removeFromCart: (state, action: PayloadAction<{ isFetching: boolean; payload: types.Cart | null }>) => {
      state.isFetching = action.payload.isFetching;
      state.cart = action.payload.payload;
    },
    saveSelected: (state, action: PayloadAction<types.CartItem | null>) => {
      state.selected = action.payload;
    },
    createCart: (state, action: PayloadAction<{ isFetching: boolean }>) => {
      state.isFetching = action.payload.isFetching;
    },
  },
});

export const { loadCart, addToCart, transferCart, updateCart, removeFromCart, saveSelected, createCart } =
  cartSlice.actions;
export default cartSlice.reducer;
