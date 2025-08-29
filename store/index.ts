'use client';

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

import cartReducer from './cart/reducers';
import masterReducer from './master/reducers';
import ordersReducer from './orders/reducers';
import productsReducer from './products/reducers';
import commonReducer from './reducers'; // ganti default -> common
import usersReducer from './users/reducers';

const combinedReducer = combineReducers({
  common: commonReducer,
  cart: cartReducer,
  orders: ordersReducer,
  products: productsReducer,
  users: usersReducer,
  master: masterReducer,
});

const rootReducer = (state: ReturnType<typeof combinedReducer> | undefined, action: any) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  } else {
    return combinedReducer(state, action);
  }
};

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

// Types
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;

// Next.js wrapper
export const wrapper = createWrapper<AppStore>(makeStore, {
  debug: process.env.NODE_ENV === 'development',
});
