import { captureException } from '@sentry/browser';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import ShopifyBuy from 'shopify-buy';

import { mapKeyValue } from 'lib/format-array';
import api from 'services/api';
import shopify from 'services/shopify';

import { setErrorMessage } from '../actions';
import { loadUser } from '../users/actions';

import * as types from './types';

function mapItems(items: ShopifyBuy.CheckoutLineItem[]): (ShopifyBuy.CheckoutLineItem & {
  customAttributes: any;
})[] {
  return items.map((item) => ({
    ...item,
    customAttributes: mapKeyValue(item.customAttributes),
  }));
}

function createCart(isFetching): types.CartActionTypes {
  return {
    type: types.CREATE_CART,
    isFetching,
  };
}
interface CheckoutParams {
  email: string;
  shippingAddress?: {
    [key: string]: any;
  };
}
function createCheckout(user: { email: string; address?: Record<string, any> }) {
  const { email, address } = user;
  let PARAMS: CheckoutParams = { email };
  if (address) {
    const shippingAddress = {
      ...address,
      firstName: address.first_name,
      lastName: address.last_name,
    } as { [key: string]: any };
    delete shippingAddress.id;
    delete shippingAddress.created_at;
    delete shippingAddress.updated_at;
    delete shippingAddress.deleted_at;
    delete shippingAddress.first_name;
    delete shippingAddress.last_name;
    PARAMS = { ...PARAMS, shippingAddress };
  }
  return shopify().checkout.create(PARAMS);
}
function createCheckoutGuest() {
  return shopify().checkout.create();
}
export const thunkCreateCart =
  (callback?): ThunkAction<void, types.CartState, null, Action<string>> =>
  async (dispatch, getState): Promise<any> => {
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
      .catch((err) => {
        dispatch(createCart(false));
        captureException(err);
      });
  };

function transferCart(isFetching, cart = null): types.CartActionTypes {
  return {
    type: types.TRANSFER_CART,
    payload: cart,
    isFetching,
  };
}

export const thunkTransferCart =
  (dbId: string): ThunkAction<void, types.CartState, null, Action<string>> =>
  async (dispatch) => {
    dispatch(transferCart(true));
    const localStorageCart = JSON.parse(localStorage.getItem('cart') || '{}');
    localStorage.removeItem('cart');
    const localCartResponse = await shopify().checkout.get(localStorageCart.id);
    if (!localCartResponse || !localCartResponse.lineItems) return;
    const localCartItems = localCartResponse.lineItems.map((item: any) => ({
      variantId: item.variant.id,
      customAttributes: item.customAttributes.map((att: any) => ({ key: att.key, value: att.value })),
      quantity: item.quantity,
    }));
    if (localCartItems.length === 0) return;
    return shopify()
      .checkout.addLineItems(dbId, localCartItems)
      .then((cart) => {
        if (!cart) return;
        const lineItems = mapItems(cart.lineItems);
        dispatch(transferCart(false, { ...cart, lineItems }));
      })
      .catch((err) => {
        if (err.message.includes('exist') || err.message.includes('completed')) {
          dispatch(thunkCreateCart());
        } else {
          dispatch(transferCart(false));
          captureException(err);
        }
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
export const thunkLoadCart =
  (id: string, isLocal = false, retryLeft = 3): ThunkAction<void, types.CartState, null, Action<string>> =>
  (dispatch) => {
    dispatch(loadCart(true));
    if (!isLocal && localStorage.getItem('cart')) {
      dispatch(thunkTransferCart(id));
      return;
    }
    return shopify()
      .checkout.get(id)
      .then((cart) => {
        if (!cart) return;
        const lineItems = mapItems(cart.lineItems);
        dispatch(loadCart(false, { ...cart, lineItems }));
      })
      .catch((err) => {
        if (err.message.includes('exist') || err.message.includes('completed')) {
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
//   return shopify()
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
//   return shopify()
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

function updateCart(isFetching, cart = null): types.CartActionTypes {
  return {
    type: types.UPDATE_CART,
    payload: cart,
    isFetching,
  };
}

function addToCart(isFetching: boolean, cart?: types.Cart): types.CartActionTypes {
  return {
    type: types.ADD_TO_CART,
    payload: cart,
    isFetching,
  };
}
export const thunkAddToCart =
  (newProduct: Record<string, any>): ThunkAction<void, types.CartState, null, Action<string>> =>
  async (dispatch, getState) => {
    dispatch(addToCart(true));
    const { user } = (getState() as any).users;
    delete newProduct.jobIds;
    const customAttributes = Object.keys(newProduct).map((data) => ({
      key: data,
      value: String(newProduct[data]),
    }));
    const lineItemsToAdd = [
      {
        variantId: process.env.SHOPIFY_VARIANT_ID,
        quantity: 1,
        customAttributes,
      },
    ] as ShopifyBuy.CheckoutLineItemInput[];
    const { id, checkout_id: checkoutId } = user ? user.cart : JSON.parse(localStorage.getItem('cart') || '{}');
    return shopify()
      .checkout.addLineItems(user ? checkoutId : id, lineItemsToAdd)
      .then((cart: ShopifyBuy.Checkout) => {
        if (!cart) return;
        dispatch(addToCart(false, cart as types.Cart));
        localStorage.setItem('cart', JSON.stringify(cart));
      })
      .catch((err) => {
        if (err.message.includes('exist') || err.message.includes('completed')) {
          dispatch(thunkCreateCart(thunkAddToCart(newProduct)));
        } else {
          dispatch(addToCart(false));
          dispatch(setErrorMessage(err.message));
          captureException(err);
        }
      });
  };

export const thunkUpdateCart =
  (product: Record<string, any>): ThunkAction<void, types.CartState, null, Action<string>> =>
  async (dispatch, getState) => {
    dispatch(updateCart(true));
    const { user } = (getState() as any).users;
    const { id: productId, quantity } = product;
    delete product.id;
    delete product.quantity;

    const customAttributes = Object.keys(product).map((data) => ({
      key: data,
      value: String(product[data]),
    }));
    const lineItemsToUpdate = [{ id: productId, quantity, customAttributes }];
    const { id, checkout_id: checkoutId } = user ? user.cart : JSON.parse(localStorage.getItem('cart') || '{}');
    return shopify()
      .checkout.updateLineItems(user ? checkoutId : id, lineItemsToUpdate)
      .then((cart) => {
        if (!cart) return;
        const lineItems = mapItems(cart.lineItems);
        dispatch(updateCart(false, { ...cart, lineItems }));
        // @todo should router.push() outside this function afterwards
        // if (Router.pathname !== '/cart') Router.replace('/cart');
      })
      .catch((err) => {
        if (err.message.includes('exist') || err.message.includes('completed')) {
          dispatch(thunkCreateCart(thunkAddToCart(product)));
        } else {
          dispatch(updateCart(false));
          dispatch(setErrorMessage(err.message));
          captureException(err);
        }
      });
  };

function removeFromCart(isFetching, cart = null): types.CartActionTypes {
  return {
    type: types.REMOVE_FROM_CART,
    payload: cart,
    isFetching,
  };
}
export const thunkRemoveFromCart =
  (id: string, itemId: string): ThunkAction<void, types.CartState, null, Action<string>> =>
  (dispatch) => {
    dispatch(removeFromCart(true));
    return shopify()
      .checkout.removeLineItems(id, [itemId])
      .then((cart) => {
        if (!cart) return;
        const lineItems = mapItems(cart.lineItems);
        dispatch(removeFromCart(false, { ...cart, lineItems }));
      })
      .catch((err) => {
        if (err.message.includes('exist') || err.message.includes('completed')) {
          dispatch(thunkCreateCart());
        } else {
          dispatch(removeFromCart(false));
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
