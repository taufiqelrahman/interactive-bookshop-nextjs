import { captureException } from '@sentry/core';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import api from 'services/api';

import * as cartActions from './cart/actions';
import * as masterActions from './master/actions';
import * as ordersActions from './orders/actions';
import * as productsActions from './products/actions';
import { sendMessage, setErrorMessage } from './reducers';
import * as types from './types';
import * as usersActions from './users/actions';

const thunkSendMessage =
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

const actions = {
  ...cartActions,
  ...ordersActions,
  ...productsActions,
  ...usersActions,
  ...masterActions,
  thunkSendMessage,
};

export default actions;
