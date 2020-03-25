import { captureException } from '@sentry/core';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import Cookies from 'js-cookie';
import { Router } from 'i18n';
import * as types from './types';
import { setErrorMessage } from '../actions';
import api from 'services/api';
import graphql from 'services/graphql';
import { encryptTokenClient } from 'lib/crypto';

// function setUser(user: types.User): types.UsersActionTypes {
//   return {
//     type: types.SET_USER,
//     payload: user,
//   };
// };

export function loadUser(isFetching, user: types.User | object): types.UsersActionTypes {
  return {
    type: types.LOAD_USER,
    payload: user,
    isFetching,
  };
}

export const thunkLoadUser = (req?): any => (dispatch): any => {
  dispatch(loadUser(true, {}));
  return api(req)
    .users.getMe()
    .then(({ data }) => {
      dispatch(loadUser(false, data));
    })
    .catch(err => {
      dispatch(loadUser(false, {}));
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
export const thunkLogin = (userData): ThunkAction<void, types.UsersState, null, Action<string>> => (dispatch): any => {
  dispatch(login(true));
  return api()
    .users.login(userData)
    .then(({ data }) => {
      const token = encryptTokenClient(data.token);
      Cookies.set('user', token);
      dispatch(login(false, data));
      Router.push(`/${userData.from || ''}`);
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

function register(isFetching): types.UsersActionTypes {
  return {
    type: types.REGISTER,
    isFetching,
  };
}
export const thunkRegister = (userData): ThunkAction<void, types.UsersState, null, Action<string>> => async (
  dispatch,
): Promise<any> => {
  dispatch(register(true));
  const checkout = await graphql().checkout.create();
  return api()
    .users.register({
      ...userData,
      checkoutId: checkout.id,
    })
    .then(() => {
      dispatch(register(false));
      Router.push('/');
    })
    .catch(err => {
      dispatch(register(false));
      dispatch(setErrorMessage(err.message));
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
