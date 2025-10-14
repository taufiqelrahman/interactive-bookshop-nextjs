import { captureException } from '@sentry/browser';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import api from '../../services/api';

import { loadOrder, loadOrders } from './reducers';
import * as types from './types';

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

export const thunkLoadOrder =
  (orderNumber: string): ThunkAction<void, types.OrdersState, null, Action<string>> =>
  (dispatch) => {
    dispatch(loadOrder({ isFetching: true, payload: null }));
    return api()
      .orders.loadOrder(orderNumber)
      .then(({ data }) => {
        dispatch(loadOrder({ isFetching: false, payload: data.data.order }));
      })
      .catch((err) => {
        dispatch(loadOrder({ isFetching: false, payload: null }));
        captureException(err);
      });
  };

export const thunkLoadOrders = (): ThunkAction<void, types.OrdersState, null, Action<string>> => (dispatch) => {
  dispatch(loadOrders({ isFetching: true, payload: [] }));
  return api()
    .orders.loadOrders()
    .then(({ data }) => {
      dispatch(loadOrders({ isFetching: false, payload: data.data.orders }));
    })
    .catch((err) => {
      dispatch(loadOrders({ isFetching: false, payload: [] }));
      captureException(err);
    });
};
