import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { captureException } from '@sentry/browser';
import * as types from './types';
import api from 'services/api';
import graphql from 'services/graphql';
import { Router } from 'i18n';
import { setErrorMessage } from '../actions';
import { thunkLoadUser } from '../users/actions';
import { mapKeyValue } from 'lib/format-array';

function mapItems(items) {
  return items.map(item => ({
    ...item,
    customAttributes: mapKeyValue(item.customAttributes),
  }));
}

function transferCart(isFetching, cart = null): types.CartActionTypes {
  return {
    type: types.TRANSFER_CART,
    payload: cart,
    isFetching,
  };
}

export const thunkTransferCart = (dbId): ThunkAction<void, types.CartState, null, Action<string>> => async (
  dispatch,
): Promise<any> => {
  dispatch(transferCart(true));
  const localStorageCart = JSON.parse(localStorage.getItem('cart') as any);
  localStorage.removeItem('cart');
  const localCartResponse = await graphql().checkout.get(localStorageCart.id);
  if (!localCartResponse) return;
  const localCartItems = JSON.parse(JSON.stringify(localCartResponse.lineItems)).map(item => ({
    variantId: item.variant.id,
    customAttributes: item.customAttributes.map(att => ({ key: att.key, value: att.value })),
    quantity: item.quantity,
  }));
  if (localCartItems.length === 0) return;
  return graphql()
    .checkout.addLineItems(dbId, localCartItems)
    .then(cart => {
      const lineItems = mapItems(cart.lineItems);
      dispatch(transferCart(false, { ...cart, lineItems }));
    })
    .catch(err => {
      dispatch(transferCart(false));
      dispatch(setErrorMessage(err.message));
      captureException(err);
    });
};

export function loadCart(isFetching, cart = null): types.CartActionTypes {
  return {
    type: types.LOAD_CART,
    payload: cart,
    isFetching,
  };
}
// export function loadCartFromStorage(): types.CartActionTypes {
//   const cart = JSON.parse(localStorage.getItem('cart') as any);
//   return {
//     type: types.LOAD_CART,
//     payload: { ...cart, lineItems: mapItems(cart.lineItems) },
//     isFetching: false,
//   };
// }
export const thunkLoadCart = (id, isLocal = false): ThunkAction<void, types.CartState, null, Action<string>> => (
  dispatch,
): any => {
  dispatch(loadCart(true));
  if (!isLocal && localStorage.getItem('cart')) {
    dispatch(thunkTransferCart(id));
    return;
  }
  return graphql()
    .checkout.get(id)
    .then(cart => {
      const lineItems = mapItems(cart.lineItems);
      dispatch(loadCart(false, { ...cart, lineItems }));
    })
    .catch(err => {
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
function createCheckout(user) {
  const { email, address } = user;
  let PARAMS: any = { email };
  if (address) {
    const shippingAddress = {
      ...address,
      firstName: address.first_name,
      lastName: address.last_name,
    };
    delete shippingAddress.id;
    delete shippingAddress.created_at;
    delete shippingAddress.updated_at;
    delete shippingAddress.deleted_at;
    delete shippingAddress.first_name;
    delete shippingAddress.last_name;
    PARAMS = { ...PARAMS, shippingAddress };
  }
  return graphql().checkout.create(PARAMS);
}
function createCheckoutGuest() {
  return graphql().checkout.create();
}
export const thunkCreateCart = (): ThunkAction<void, types.CartState, null, Action<string>> => async (
  dispatch,
  getState,
): Promise<any> => {
  dispatch(createCart(true));
  const { user } = (getState() as any).users;
  const cart = user ? await createCheckout(user) : await createCheckoutGuest();
  if (!user) {
    localStorage.setItem('cart', JSON.stringify(cart));
    dispatch(createCart(false));
    return;
  }
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

// function removeDiscount(isFetching, cart = null): types.CartActionTypes {
//   return {
//     type: types.ADD_DISCOUNT,
//     payload: cart,
//     isFetching,
//   };
// }
// export const thunkRemoveDiscount = (): ThunkAction<void, types.CartState, null, Action<string>> => async (
//   dispatch,
//   getState,
// ): Promise<any> => {
//   dispatch(removeDiscount(true));
//   const { cart } = (getState() as any).users.user;
//   return graphql()
//     .checkout.removeDiscount(cart.checkout_id)
//     .then(cart => {
//       dispatch(removeDiscount(false, cart));
//     })
//     .catch(err => {
//       dispatch(removeDiscount(false));
//       dispatch(setErrorMessage(err.message));
//       captureException(err);
//     });
// };

// function addDiscount(isFetching, cart = null): types.CartActionTypes {
//   return {
//     type: types.ADD_DISCOUNT,
//     payload: cart,
//     isFetching,
//   };
// }
// export const thunkAddDiscount = (code): ThunkAction<void, types.CartState, null, Action<string>> => async (
//   dispatch,
//   getState,
// ): Promise<any> => {
//   dispatch(addDiscount(true));
//   const { cart } = (getState() as any).users.user;
//   return graphql()
//     .checkout.addDiscount(cart.checkout_id, code)
//     .then(cart => {
//       dispatch(addDiscount(false, cart));
//     })
//     .catch(err => {
//       dispatch(addDiscount(false));
//       dispatch(setErrorMessage(err.message));
//       captureException(err);
//     });
// };

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
  const { user } = (getState() as any).users;
  delete newProduct.jobIds;
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
  const { id, checkout_id: checkoutId } = user ? user.cart : JSON.parse(localStorage.getItem('cart') as any);
  return graphql()
    .checkout.addLineItems(user ? checkoutId : id, lineItemsToAdd)
    .then(cart => {
      const lineItems = mapItems(cart.lineItems);
      dispatch(addToCart(false, { ...cart, lineItems }));
      Router.replace('/cart');
    })
    .catch(err => {
      dispatch(addToCart(false));
      dispatch(setErrorMessage(err.message));
      captureException(err);
    });
};

function updateCart(isFetching, cart = null): types.CartActionTypes {
  return {
    type: types.UPDATE_CART,
    payload: cart,
    isFetching,
  };
}
export const thunkUpdateCart = (product: any): ThunkAction<void, types.CartState, null, Action<string>> => async (
  dispatch,
  getState,
): Promise<any> => {
  dispatch(updateCart(true));
  const { user } = (getState() as any).users;
  const { id: productId, quantity } = product;
  delete product.id;
  delete product.quantity;

  const customAttributes = Object.keys(product).map(data => ({
    key: data,
    value: product[data].toString(),
  }));
  const lineItemsToUpdate = [{ id: productId, quantity, customAttributes }];
  const { id, checkout_id: checkoutId } = user ? user.cart : JSON.parse(localStorage.getItem('cart') as any);
  return graphql()
    .checkout.updateLineItems(user ? checkoutId : id, lineItemsToUpdate)
    .then(cart => {
      const lineItems = mapItems(cart.lineItems);
      dispatch(updateCart(false, { ...cart, lineItems }));
      if (Router.pathname !== '/cart') Router.replace('/cart');
    })
    .catch(err => {
      dispatch(updateCart(false));
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
export const thunkRemoveFromCart = (id, itemId): ThunkAction<void, types.CartState, null, Action<string>> => (
  dispatch,
): any => {
  dispatch(removeFromCart(true));
  return graphql()
    .checkout.removeLineItems(id, itemId)
    .then(cart => {
      const lineItems = mapItems(cart.lineItems);
      dispatch(removeFromCart(false, { ...cart, lineItems }));
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
