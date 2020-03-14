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

export const thunkLoadUser = (req = null): ThunkAction<void, types.UsersState, null, Action<string>> => (
  dispatch,
): any => {
  dispatch(loadUser(true));
  return api(req)
    .users.getMe()
    .then(({ data }) => {
      dispatch(loadUser(false, data));
    })
    .catch(err => {
      dispatch(loadUser(false));
      dispatch(setErrorMessage(err.message));
      captureException(err);
    });
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
function encrypt(token) {
  const parsedKey = CryptoJS.enc.Hex.parse(process.env.SECRET_KEY);
  const parsedIv = CryptoJS.enc.Hex.parse('0123456789abcdef');
  const options = { mode: CryptoJS.mode.CBC, iv: parsedIv };
  return CryptoJS.AES.encrypt(token, parsedKey, options).toString();
}
export const thunkLogin = (userData): ThunkAction<void, types.UsersState, null, Action<string>> => (dispatch): any => {
  dispatch(login(true));
  return api()
    .users.login(userData)
    .then(({ data }) => {
      const token = encrypt(data.token);
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

function forgotPassword(isFetching): types.UsersActionTypes {
  return {
    type: types.FORGOT_PASSWORD,
    isFetching,
  };
}
export const thunkForgotPassword = (data): ThunkAction<void, types.UsersState, null, Action<string>> => (
  dispatch,
): any => {
  dispatch(forgotPassword(true));
  return api()
    .users.forgotPassword(data)
    .then(() => {
      dispatch(forgotPassword(false));
    })
    .catch(err => {
      dispatch(forgotPassword(false));
      dispatch(setErrorMessage(err.message));
      captureException(err);
    });
};

function resetPassword(isFetching): types.UsersActionTypes {
  return {
    type: types.FORGOT_PASSWORD,
    isFetching,
  };
}
export const thunkResetPassword = (data): ThunkAction<void, types.UsersState, null, Action<string>> => (
  dispatch,
): any => {
  dispatch(resetPassword(true));
  return api()
    .users.resetPassword(data)
    .then(() => {
      dispatch(resetPassword(false));
      Router.push('/login');
    })
    .catch(err => {
      dispatch(resetPassword(false));
      dispatch(setErrorMessage(err.message));
      captureException(err);
    });
};
