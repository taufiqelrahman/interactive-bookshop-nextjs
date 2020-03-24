import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { captureException } from '@sentry/browser';
import * as types from './types';
import api from 'services/api';
import graphql from 'services/graphql';
import { Router } from 'i18n';
import { setErrorMessage } from '../actions';
import { thunkLoadUser } from '../users/actions';

function loadCart(isFetching, cart = null): types.CartActionTypes {
  return {
    type: types.LOAD_CART,
    payload: cart,
    isFetching,
  };
}
export const thunkLoadCart = (id): ThunkAction<void, types.CartState, null, Action<string>> => (dispatch): any => {
  dispatch(loadCart(true));
  return graphql()
    .checkout.get(id)
    .then(data => {
      dispatch(loadCart(false, data));
    })
    .catch(err => {
      debugger;
      dispatch(loadCart(false));
      dispatch(setErrorMessage(err.message));
      captureException(err);
    });
};

function createCart(isFetching): types.CartActionTypes {
  return {
    type: types.CREATE_CART,
    isFetching,
  };
}
export const thunkCreateCart = (): ThunkAction<void, types.CartState, null, Action<string>> => async (
  dispatch,
): Promise<any> => {
  dispatch(createCart(true));
  const cart = await graphql().checkout.create();
  return api()
    .cart.createCart({ checkoutId: cart.id })
    .then(() => {
      dispatch(createCart(false));
      setTimeout(() => {
        dispatch(thunkLoadUser());
      }, 1000);
    })
    .catch(err => {
      dispatch(createCart(false));
      dispatch(setErrorMessage(err.message));
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
  getState,
): Promise<any> => {
  dispatch(addToCart(true));
  const { cart } = (getState() as any).users.user;
  const customAttributes = Object.keys(newProduct).map(data => ({
    key: data,
    value: newProduct[data].toString(),
  }));
  const lineItemsToAdd = [
    {
      variantId: process.env.SHOPIFY_VARIANT_ID,
      quantity: 1,
      customAttributes,
    },
  ];
  return graphql()
    .checkout.addLineItems(cart.checkout_id, lineItemsToAdd)
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

// function removeFromCart(isFetching, cart = null): types.CartActionTypes {
//   return {
//     type: types.REMOVE_FROM_CART,
//     payload: cart,
//     isFetching,
//   };
// }
// export const thunkRemoveFromCart = (existingProduct: any): ThunkAction<void, types.CartState, null, Action<string>> => (
//   dispatch,
// ): any => {
//   dispatch(removeFromCart(true));
//   return api()
//     .cart.removeFromCart(existingProduct)
//     .then(({ data }) => {
//       dispatch(removeFromCart(false, data.data));
//     })
//     .catch(err => {
//       dispatch(removeFromCart(false));
//       dispatch(setErrorMessage(err.message));
//       captureException(err);
//     });
// };

export function saveSelected(selected = null): types.CartActionTypes {
  return {
    type: types.SAVE_SELECTED,
    payload: selected,
  };
}
