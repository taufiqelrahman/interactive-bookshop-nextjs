import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { captureException } from '@sentry/browser';
import * as types from './types';
import api from 'services/api';
import graphql from 'services/graphql';
import { Router } from 'i18n';
import { setErrorMessage } from '../actions';
import { loadUser } from '../users/actions';
import { mapKeyValue } from 'lib/format-array';
import { LineItem } from 'store/orders/types';
import { User } from 'store/users/types';

function mapItems(items: any[]) {
  return items.map(item => ({
    ...item,
    customAttributes: mapKeyValue(item.customAttributes),
  }));
}

function createCart(isFetching: boolean): types.CartActionTypes {
  return {
    type: types.CREATE_CART,
    isFetching,
  };
}
function createCheckout(user: User) {
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
export const thunkCreateCart = (callback?: any): ThunkAction<void, types.CartState, null, Action<string>> => async (
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
    .then(({ data }) => {
      dispatch(createCart(false));
      dispatch(loadUser(false, { ...user, cart: data.data }));
      if (callback) dispatch(callback);
    })
    .catch(err => {
      dispatch(createCart(false));
      captureException(err);
    });
};

function transferCart(isFetching: boolean, cart = null): types.CartActionTypes {
  return {
    type: types.TRANSFER_CART,
    payload: cart,
    isFetching,
  };
}

export const thunkTransferCart = (dbId: string): ThunkAction<void, types.CartState, null, Action<string>> => async (
  dispatch,
): Promise<any> => {
  dispatch(transferCart(true));
  const localStorageCart = JSON.parse(localStorage.getItem('cart') as any);
  localStorage.removeItem('cart');
  if (!localStorageCart) return;
  const localCartResponse = await graphql().checkout.get(localStorageCart.id);
  if (!localCartResponse) return;
  const localCartItems = JSON.parse(JSON.stringify(localCartResponse.lineItems)).map((item: LineItem) => ({
    variantId: item.variant.id,
    customAttributes: (item.customAttributes as any).map((att: any) => ({ key: att.key, value: att.value })),
    quantity: item.quantity,
  }));
  if (localCartItems.length === 0) return;
  return graphql()
    .checkout.addLineItems(dbId, localCartItems)
    .then(cart => {
      if (!cart) return;
      const lineItems = mapItems(cart.lineItems);
      dispatch(transferCart(false, { ...cart, lineItems }));
    })
    .catch(err => {
      if (err.message && (err.message.includes('exist') || err.message.includes('completed'))) {
        dispatch(thunkCreateCart());
      } else {
        dispatch(transferCart(false));
        captureException(err);
      }
    });
};

export function loadCart(isFetching: boolean, cart = null): types.CartActionTypes {
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
export const thunkLoadCart = (
  id: string,
  isLocal = false,
  retryLeft = 3,
): ThunkAction<void, types.CartState, null, Action<string>> => dispatch => {
  dispatch(loadCart(true));
  if (!isLocal && localStorage.getItem('cart')) {
    dispatch(thunkTransferCart(id));
    return;
  }
  if (!id) return;
  return graphql()
    .checkout.get(id)
    .then(cart => {
      if (!cart) return;
      const lineItems = mapItems(cart.lineItems);
      dispatch(loadCart(false, { ...cart, lineItems }));
    })
    .catch(err => {
      if (err.message && (err.message.includes('exist') || err.message.includes('completed'))) {
        dispatch(thunkCreateCart());
      } else {
        dispatch(loadCart(false));
        if (retryLeft > 0) {
          thunkLoadCart(id, isLocal, retryLeft - 1);
        } else {
          captureException(err);
        }
      }
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

function updateAttributes(isFetching: boolean, cart = null): types.CartActionTypes {
  return {
    type: types.UPDATE_ATTRIBUTES,
    payload: cart,
    isFetching,
  };
}

export const thunkUpdateAttributes = (
  customAttributes: any[],
): ThunkAction<void, types.CartState, null, Action<string>> => async (dispatch, getState): Promise<any> => {
  dispatch(updateAttributes(true));
  const { user } = (getState() as any).users;
  const { id, checkout_id: checkoutId } = user ? user.cart : JSON.parse(localStorage.getItem('cart') as any);
  return graphql()
    .checkout.updateAttributes(user ? checkoutId : id, { customAttributes })
    .then(cart => {
      if (!cart) return;
      dispatch(updateAttributes(false, cart));
      // dispatch(saveSelected());
      if (Router.pathname !== '/cart') Router.replace('/cart');
    })
    .catch(err => {
      if (err.message && (err.message.includes('exist') || err.message.includes('completed'))) {
        dispatch(thunkCreateCart(thunkUpdateAttributes(customAttributes)));
      } else {
        dispatch(updateAttributes(false));
        dispatch(setErrorMessage(err.message));
        captureException(err);
      }
    });
};

export function saveSelected(selected = null): types.CartActionTypes {
  return {
    type: types.SAVE_SELECTED,
    payload: selected,
  };
}

function updateCart(isFetching: boolean, cart = null): types.CartActionTypes {
  return {
    type: types.UPDATE_CART,
    payload: cart,
    isFetching,
  };
}

function addToCart(isFetching: boolean, cart = null): types.CartActionTypes {
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
  const currentCart = user ? user.cart : JSON.parse(localStorage.getItem('cart') as any);
  if (!currentCart) {
    dispatch(thunkCreateCart(thunkAddToCart(newProduct)));
    return;
  }
  return graphql()
    .checkout.addLineItems(user ? currentCart.checkout_id : currentCart.id, lineItemsToAdd)
    .then(cart => {
      if (!cart) return;
      const lineItems = mapItems(cart.lineItems);
      dispatch(addToCart(false, { ...cart, lineItems }));
      dispatch(saveSelected());
      Router.replace('/cart');
    })
    .catch(err => {
      if (
        err.message &&
        (err.message.includes('exist') || err.message.includes('completed') || err.message.includes('invalid'))
      ) {
        dispatch(thunkCreateCart(thunkAddToCart(newProduct)));
      } else {
        dispatch(addToCart(false));
        dispatch(setErrorMessage(err.message));
        captureException(err);
      }
    });
};

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
      if (!cart) return;
      const lineItems = mapItems(cart.lineItems);
      dispatch(updateCart(false, { ...cart, lineItems }));
      dispatch(saveSelected());
      if (Router.pathname !== '/cart') Router.replace('/cart');
    })
    .catch(err => {
      if (err.message && (err.message.includes('exist') || err.message.includes('completed'))) {
        dispatch(thunkCreateCart(thunkAddToCart(product)));
      } else {
        dispatch(updateCart(false));
        dispatch(setErrorMessage(err.message));
        captureException(err);
      }
    });
};

function removeFromCart(isFetching: boolean, cart = null): types.CartActionTypes {
  return {
    type: types.REMOVE_FROM_CART,
    payload: cart,
    isFetching,
  };
}
export const thunkRemoveFromCart = (
  id: number,
  itemId: string,
): ThunkAction<void, types.CartState, null, Action<string>> => dispatch => {
  dispatch(removeFromCart(true));
  return graphql()
    .checkout.removeLineItems(id, [itemId])
    .then(cart => {
      if (!cart) return;
      const lineItems = mapItems(cart.lineItems);
      dispatch(removeFromCart(false, { ...cart, lineItems }));
    })
    .catch(err => {
      if (err.message && (err.message.includes('exist') || err.message.includes('completed'))) {
        dispatch(thunkCreateCart());
      } else {
        dispatch(removeFromCart(false));
        dispatch(setErrorMessage(err.message));
        captureException(err);
      }
    });
};
