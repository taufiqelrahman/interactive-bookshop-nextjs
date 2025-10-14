import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import * as types from './types';

const initialState: types.ProductsState = {
  isFetching: false,
  products: [],
  currentProduct: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    loadProducts: (state, action: PayloadAction<{ isFetching: boolean; payload: types.Product[] }>) => {
      state.products = action.payload.payload;
      state.isFetching = action.payload.isFetching;
    },
    showProduct: (state, action: PayloadAction<{ isFetching: boolean; payload: types.Product | null }>) => {
      state.currentProduct = action.payload.payload;
      state.isFetching = action.payload.isFetching;
    },
  },
});

export const { loadProducts, showProduct } = productsSlice.actions;
export default productsSlice.reducer;
