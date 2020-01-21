import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { captureException } from '@sentry/browser';
import * as types from './types';
import api from '../../services/api';

function loadCart(isFetching, cart = null): types.CartActionTypes {
  return {
    type: types.LOAD_CART,
    payload: cart,
    isFetching,
  };
}
export const thunkLoadCart = (): ThunkAction<void, types.CartState, null, Action<string>> => (dispatch): any => {
  dispatch(loadCart(true));
  return api()
    .cart.get()
    .then(({ data }) => {
      dispatch(loadCart(false, data.data));
    })
    .catch(err => {
      dispatch(loadCart(false));
      captureException(err);
    });
};

function addToCart(isFetching, cart = null): types.CartActionTypes {
  return {
    type: types.ADD_TO_CART,
    payload: cart,
    isFetching,
  };
}
export const thunkAddToCart = (newProduct: any): ThunkAction<void, types.CartState, null, Action<string>> => (
  dispatch,
): any => {
  dispatch(addToCart(true));
  return api()
    .cart.addToCart(newProduct)
    .then(({ data }) => {
      dispatch(addToCart(false, data.data));
    })
    .catch(err => {
      dispatch(addToCart(false));
      captureException(err);
    });
};

function removeFromCart(isFetching, cart = null): types.CartActionTypes {
  return {
    type: types.REMOVE_FROM_CART,
    payload: cart,
    isFetching,
  };
}
export const thunkRemoveFromCart = (existingProduct: any): ThunkAction<void, types.CartState, null, Action<string>> => (
  dispatch,
): any => {
  dispatch(removeFromCart(true));
  return api()
    .cart.removeFromCart(existingProduct)
    .then(({ data }) => {
      dispatch(removeFromCart(false, data.data));
    })
    .catch(err => {
      dispatch(removeFromCart(false));
      captureException(err);
    });
};
