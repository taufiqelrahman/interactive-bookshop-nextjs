import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { captureException } from '@sentry/browser';
import * as types from './types';
import api from 'services/api';
import graphql from 'services/graphql';
import { Router } from 'i18n';
import { setErrorMessage } from '../actions';
import { thunkLoadUser } from '../users/actions';

function mapItems(items) {
  return items.map(item => {
    const customAttributes = item.customAttributes.reduce(function(map, obj) {
      map[obj.key] = obj.value;
      return map;
    }, {});
    return { ...item, customAttributes };
  });
}

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
      dispatch(
        loadCart(false, {
          ...data,
          lineItems: mapItems(data.lineItems),
        }),
      );
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
export const thunkCreateCart = (): ThunkAction<void, types.CartState, null, Action<string>> => async (
  dispatch,
  getState,
): Promise<any> => {
  dispatch(createCart(true));
  const { user } = (getState() as any).users;
  const cart = await createCheckout(user);
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
  const { cart } = (getState() as any).users.user;
  const { id, quantity } = product;
  delete product.id;
  delete product.quantity;

  const customAttributes = Object.keys(product).map(data => ({
    key: data,
    value: product[data].toString(),
  }));
  const lineItemsToUpdate = [{ id, quantity, customAttributes }];
  return graphql()
    .checkout.updateLineItems(cart.checkout_id, lineItemsToUpdate)
    .then(data => {
      const lineItems = mapItems(data.lineItems);
      dispatch(updateCart(false, { ...data, lineItems }));
      if (Router.pathname !== '/cart') Router.push('/cart');
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
    .then(data => {
      const lineItems = mapItems(data.lineItems);
      dispatch(removeFromCart(false, { ...data, lineItems }));
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
