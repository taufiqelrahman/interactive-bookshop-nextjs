import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import * as types from './types';

const initialState: types.OrdersState = {
  isFetching: false,
  orders: [],
  currentOrder: null,
  paymentProblem: false,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    loadOrder: (state, action: PayloadAction<{ isFetching: boolean; payload: types.Order | null }>) => {
      state.currentOrder = action.payload.payload;
      state.isFetching = action.payload.isFetching;
    },
    loadOrders: (state, action: PayloadAction<{ isFetching: boolean; payload: types.Order[] }>) => {
      state.orders = action.payload.payload;
      state.isFetching = action.payload.isFetching;
    },
    setPaymentProblem: (state, action: PayloadAction<boolean>) => {
      state.paymentProblem = action.payload;
    },
  },
});

export const { loadOrder, loadOrders, setPaymentProblem } = ordersSlice.actions;
export default ordersSlice.reducer;
