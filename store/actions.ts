import { captureException } from '@sentry/core';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import api from 'services/api';

import * as cartActions from './cart/actions';
import * as masterActions from './master/actions';
import * as ordersActions from './orders/actions';
import * as productsActions from './products/actions';
import * as types from './types';
import * as usersActions from './users/actions';

export const setErrorMessage = (message: string): types.ActionTypes => {
  return {
    type: types.SET_ERROR_MESSAGE,
    payload: message,
  };
};

function sendMessage(isFetching): types.ActionTypes {
  return {
    type: types.SEND_MESSAGE,
    payload: isFetching,
  };
}
export const thunkSendMessage =
  (data: Record<string, unknown>): ThunkAction<void, types.State, null, Action<string>> =>
  (dispatch, getState) => {
    const { user } = (getState() as unknown as { users: { user: { id: string } | null } }).users;
    let DATA = { ...data };
    if (user) DATA = { ...data, userId: user.id };
    dispatch(sendMessage(true));
    return api()
      .message.send(DATA)
      .then(() => {
        dispatch(sendMessage(false));
      })
      .catch((err) => {
        dispatch(sendMessage(false));
        dispatch(setErrorMessage(err.message));
        captureException(err);
      });
  };

export default {
  ...cartActions,
  ...ordersActions,
  ...productsActions,
  ...usersActions,
  ...masterActions,
  setSideNav(state: boolean): types.ActionTypes {
    return {
      type: types.SET_SIDE_NAV,
      payload: state,
    };
  },
  setErrorMessage,
  thunkSendMessage,
};
