import { captureException } from '@sentry/core';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import { Router } from 'i18n';
import * as types from './types';
import { setErrorMessage } from '../actions';
import api from '../../services/api';

function setUser(user: types.User): types.UsersActionTypes {
  return {
    type: types.SET_USER,
    payload: user,
  };
}

export function loadUser(isFetching, state?: types.User): types.UsersActionTypes {
  return {
    type: types.LOAD_USER,
    payload: state,
    isFetching,
  };
}

export const thunkLoadUser = (): ThunkAction<void, types.UsersState, null, Action<string>> => (dispatch): any => {
  dispatch(loadUser(true));
  dispatch(loadUser(false, { email: 'taufiqelrahman65@gmail.com' }));
};

export function setLogin(state: boolean): types.UsersActionTypes {
  return {
    type: types.SET_LOGIN,
    payload: state,
  };
}

function login(isFetching, state = null): types.UsersActionTypes {
  return {
    type: types.LOGIN,
    payload: !!state,
    isFetching,
  };
}
export const thunkLogin = (userData): ThunkAction<void, types.UsersState, null, Action<string>> => (dispatch): any => {
  dispatch(login(true));
  return api()
    .users.login(userData)
    .then(({ data }) => {
      const token = CryptoJS.AES.encrypt(data.token, process.env.SECRET_KEY).toString();
      Cookies.set('user', token);
      dispatch(login(false, data));
      Router.push(`/${userData.from || ''}`);
      dispatch(setUser({ email: userData.email }));
    })
    .catch(err => {
      dispatch(login(false));
      dispatch(setErrorMessage(err.message));
      captureException(err);
    });
};

function logout(isFetching, state = null): types.UsersActionTypes {
  return {
    type: types.LOGOUT,
    payload: !state,
    isFetching,
  };
}
export const thunkLogout = (): ThunkAction<void, types.UsersState, null, Action<string>> => (dispatch): any => {
  dispatch(logout(true));
  return api()
    .users.logout()
    .then(({ data }) => {
      Cookies.remove('user');
      dispatch(logout(false, data));
      Router.push('/');
    })
    .catch(err => {
      dispatch(logout(false));
      captureException(err);
    });
};
