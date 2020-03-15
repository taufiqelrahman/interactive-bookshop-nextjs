import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { captureException } from '@sentry/browser';
import * as types from './types';
import api from 'services/api';
import graphql from 'services/graphql';
import { Router } from 'i18n';
import { setErrorMessage } from '../actions';

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
export const thunkAddToCart = (newProduct: any): ThunkAction<void, types.CartState, null, Action<string>> => async (
  dispatch,
): Promise<any> => {
  dispatch(addToCart(true));
  const cart = await graphql().cart.create();
  const customAttributes = Object.keys(newProduct).map(data => ({
    key: data,
    value: newProduct[data].toString(),
  }));
  const lineItemsToAdd = [
    {
      variantId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMjkwNDkwMjU3NDIxMw==',
      quantity: 1,
      customAttributes,
    },
  ];
  return graphql()
    .cart.addLineItems(cart.id, lineItemsToAdd)
    .then(cart => {
      dispatch(addToCart(false, cart));
      Router.push('/cart');
    })
    .catch(err => {
      dispatch(addToCart(false));
      dispatch(setErrorMessage(err.message));
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
      dispatch(setErrorMessage(err.message));
      captureException(err);
    });
};

export function saveSelected(selected = null): types.CartActionTypes {
  return {
    type: types.SAVE_SELECTED,
    payload: selected,
  };
}
