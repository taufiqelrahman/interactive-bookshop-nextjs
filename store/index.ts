import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import cartReducer from './cart/reducers';
import masterReducer from './master/reducers';
import ordersReducer from './orders/reducers';
import productsReducer from './products/reducers';
import reducer from './reducers';
import usersReducer from './users/reducers';

const rootReducer = combineReducers({
  default: reducer,
  cart: cartReducer,
  orders: ordersReducer,
  products: productsReducer,
  users: usersReducer,
  master: masterReducer,
});

// ✅ bikin store pakai `configureStore` (gak perlu manual compose, enhancer, dll)
export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }), // supaya aman kalau ada non-serializable (misal Date)
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

// ✅ bikin wrapper
export const wrapper = createWrapper<AppStore>(makeStore, { debug: process.env.NODE_ENV === 'development' });
