import { createStore, applyMiddleware, combineReducers, compose, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';
import cartReducer from './cart/reducers';
import ordersReducer from './orders/reducers';
import productsReducer from './products/reducers';
import usersReducer from './users/reducers';

const rootReducer = combineReducers({
  default: reducer,
  cart: cartReducer,
  orders: ordersReducer,
  products: productsReducer,
  users: usersReducer,
});

const composeEnhancer =
  (typeof window != 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export type AppState = ReturnType<typeof rootReducer>;
export function initializeStore(initialState?): Store {
  return createStore(rootReducer, initialState, composeEnhancer(applyMiddleware(thunkMiddleware)));
}
