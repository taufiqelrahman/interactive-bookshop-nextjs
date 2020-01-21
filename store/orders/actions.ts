import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { captureException } from '@sentry/browser';
import * as types from './types';
import api from '../../services/api';

function checkout(isFetching, order = null): types.OrdersActionTypes {
  return {
    type: types.CHECKOUT,
    payload: order,
    isFetching,
  };
}

export const thunkCheckout = (newOrder): ThunkAction<void, types.OrdersState, null, Action<string>> => (
  dispatch,
): any => {
  dispatch(checkout(true));
  return api()
    .orders.checkout(newOrder)
    .then(({ data }) => {
      dispatch(checkout(false, data.data));
    })
    .catch(err => {
      dispatch(checkout(false));
      captureException(err);
    });
};

function loadOrder(isFetching, order = null): types.OrdersActionTypes {
  return {
    type: types.LOAD_ORDER,
    payload: order,
    isFetching,
  };
}
export const thunkLoadOrder = (chargeData): ThunkAction<void, types.OrdersState, null, Action<string>> => (
  dispatch,
): any => {
  dispatch(loadOrder(true));
  return api()
    .orders.loadOrder(chargeData)
    .then(({ data }) => {
      dispatch(loadOrder(false, data.data));
    })
    .catch(err => {
      dispatch(loadOrder(false));
      captureException(err);
    });
};
