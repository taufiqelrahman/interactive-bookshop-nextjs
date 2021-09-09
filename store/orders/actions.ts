import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { captureException } from '@sentry/browser';
import * as types from './types';
import api from '../../services/api';

// function checkout(isFetching: boolean, order = null): types.OrdersActionTypes {
//   return {
//     type: types.CHECKOUT,
//     payload: order,
//     isFetching,
//   };
// }

// export const thunkCheckout = (newOrder): ThunkAction<void, types.OrdersState, null, Action<string>> => (
//   dispatch,
// ): any => {
//   dispatch(checkout(true));
//   return api()
//     .orders.checkout(newOrder)
//     .then(({ data }) => {
//       dispatch(checkout(false, data.data));
//     })
//     .catch(err => {
//       dispatch(checkout(false));
//       captureException(err);
//     });
// };

export function loadOrder(isFetching: boolean, order = null): types.OrdersActionTypes {
  return {
    type: types.LOAD_ORDER,
    payload: order,
    isFetching,
  };
}
export const thunkLoadOrder = (orderNumber: string): ThunkAction<void, types.OrdersState, null, Action<string>> => (
  dispatch,
): any => {
  dispatch(loadOrder(true));
  return api()
    .orders.loadOrder(orderNumber)
    .then(({ data }) => {
      dispatch(loadOrder(false, data.data));
    })
    .catch(err => {
      dispatch(loadOrder(false));
      captureException(err);
    });
};

export function loadOrders(isFetching: boolean, orders: any = []): types.OrdersActionTypes {
  return {
    type: types.LOAD_ORDERS,
    payload: orders,
    isFetching,
  };
}
export const thunkLoadOrders = (): ThunkAction<void, types.OrdersState, null, Action<string>> => (dispatch): any => {
  dispatch(loadOrders(true));
  return api()
    .orders.loadOrders()
    .then(({ data }) => {
      dispatch(loadOrders(false, data.data));
    })
    .catch(err => {
      dispatch(loadOrders(false));
      captureException(err);
    });
};

export function setPaymentProblem(status: boolean): types.OrdersActionTypes {
  return {
    type: types.SET_PAYMENT_PROBLEM,
    payload: status,
  };
}
