import { createStore, applyMiddleware, combineReducers, compose, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';

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

const isBrowser = typeof window != 'undefined';
const reduxOption = { trace: true, traceLimit: 25 };
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancer =
  isBrowser && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as any)(reduxOption)
    : compose;

export type AppState = ReturnType<typeof rootReducer>;
export function initializeStore(initialState?: Partial<AppState>): Store {
  return createStore(rootReducer, initialState, composeEnhancer(applyMiddleware(thunkMiddleware)));
}
