import { captureException } from '@sentry/core';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import Cookies from 'js-cookie';
import { Router, i18n } from 'i18n';
import * as types from './types';
import { setErrorMessage } from '../actions';
import { thunkLoadCart, loadCart } from '../cart/actions';
import api from 'services/api';
import graphql from 'services/graphql';
import { encryptTokenClient } from 'lib/crypto';
import { toast } from 'react-toastify';
import { Request } from 'express';

// function setUser(user: types.User): types.UsersActionTypes {
//   return {
//     type: types.SET_USER,
//     payload: user,
//   };
// };

export function loadUser(isFetching: boolean, user: types.User | null): types.UsersActionTypes {
  return {
    type: types.LOAD_USER,
    payload: user,
    isFetching,
  };
}

export const thunkLoadUser = (req?: Request): ThunkAction<void, types.UsersState, null, Action<string>> => (
  dispatch: (action: any) => any,
): any => {
  dispatch(loadUser(true, null));
  return api(req)
    .users.getMe()
    .then(({ data }) => {
      dispatch(loadUser(false, data));
      if (data.cart) dispatch(thunkLoadCart(data.cart.checkout_id));
    })
    .catch(err => {
      dispatch(loadUser(false, null));
      dispatch(setErrorMessage(err.message));
      captureException(err);
    });
};

function updateUser(isFetching: boolean, user?: types.User): types.UsersActionTypes {
  return {
    type: types.UPDATE_USER,
    payload: user,
    isFetching,
  };
}

export const thunkUpdateUser = (data: types.User): ThunkAction<void, types.UsersState, null, Action<string>> => (
  dispatch,
): any => {
  dispatch(updateUser(true));
  return api()
    .users.updateMe(data)
    .then(({ data }) => {
      dispatch(updateUser(false, data.user));
      const isEnglish = i18n.language === 'en';
      let message = isEnglish ? 'Saved successfully' : 'Berhasil menyimpan';
      if (data.updated === 'email') {
        message = isEnglish
          ? `A confirmation email has been sent to ${data.user.email}`
          : `Email konfirmasi untuk pengubahan telah dikirim ke ${data.user.email}`;
      }
      toast.success(message);
    })
    .catch(err => {
      dispatch(updateUser(false));
      let message = '';
      if (err.response.data) {
        if (err.response.data.error === 'DIFFERENT_PHONE') {
          message = i18n.language === 'en' ? `Your old phone number did not match` : `Nomor telepon anda tidak sesuai`;
        }
      } else {
        message = err.message;
      }
      dispatch(setErrorMessage(message));
      captureException(err);
    });
};

export function setLogin(state: boolean) {
  return {
    type: types.SET_LOGIN,
    payload: state,
  } as const;
}

// type actions = ReturnType<typeof setLogin>;
// setLogin('qwe')

export function setExpired(state: boolean): types.UsersActionTypes {
  return {
    type: types.SET_EXPIRED,
    payload: state,
  };
}

function login(isFetching: boolean, state = null): types.UsersActionTypes {
  return {
    type: types.LOGIN,
    payload: !!state,
    isFetching,
  };
}
interface LoginData extends types.User {
  from: string;
}
export const thunkLogin = (userData: LoginData): ThunkAction<void, types.UsersState, null, Action<string>> => (
  dispatch,
): any => {
  dispatch(login(true));
  return api()
    .users.login(userData)
    .then(({ data }) => {
      const token = encryptTokenClient(data.token);
      Cookies.set('user', token, { domain: process.env.DOMAIN });
      dispatch(setExpired(false));
      dispatch(login(false, data));
      Router.push(`/${userData.from || ''}`);
    })
    .catch(err => {
      dispatch(login(false));
      dispatch(setErrorMessage(err.response && err.response.data));
      captureException(err);
    });
};

function redirectSocialLogin() {
  const fromQuery = localStorage.getItem('from');
  if (fromQuery) localStorage.removeItem('from');
  Router.push(`/${fromQuery || ''}`);
}

function loginFacebook(isFetching: boolean, state = null): types.UsersActionTypes {
  return {
    type: types.LOGIN_FACEBOOK,
    payload: !!state,
    isFetching,
  };
}
export const thunkLoginFacebook = (data: types.User): ThunkAction<void, types.UsersState, null, Action<string>> => (
  dispatch,
): any => {
  dispatch(loginFacebook(true));
  return api()
    .users.loginFacebook(data)
    .then(({ data }) => {
      const token = encryptTokenClient(data.token);
      Cookies.set('user', token, { domain: process.env.DOMAIN });
      dispatch(setExpired(false));
      dispatch(loginFacebook(false, data));
      redirectSocialLogin();
    })
    .catch(err => {
      dispatch(loginFacebook(false));
      dispatch(setErrorMessage(err.message));
      Router.push('/login');
      captureException(err);
    });
};

function loginGoogle(isFetching: boolean, state = null): types.UsersActionTypes {
  return {
    type: types.LOGIN_FACEBOOK,
    payload: !!state,
    isFetching,
  };
}
export const thunkLoginGoogle = (data: types.User): ThunkAction<void, types.UsersState, null, Action<string>> => (
  dispatch,
): any => {
  dispatch(loginGoogle(true));
  return api()
    .users.loginGoogle(data)
    .then(({ data }) => {
      const token = encryptTokenClient(data.token);
      Cookies.set('user', token, { domain: process.env.DOMAIN });
      dispatch(setExpired(false));
      dispatch(loginGoogle(false, data));
      redirectSocialLogin();
    })
    .catch(err => {
      dispatch(loginGoogle(false));
      dispatch(setErrorMessage(err.message));
      Router.push('/login');
      captureException(err);
    });
};

function logout(isFetching: boolean, state = null): types.UsersActionTypes {
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
      Cookies.remove('user', { domain: process.env.DOMAIN });
      dispatch(logout(false, data));
      dispatch(loadCart(false, null));
      Router.push('/');
    })
    .catch(err => {
      dispatch(logout(false));
      captureException(err);
    });
};

function register(isFetching: boolean): types.UsersActionTypes {
  return {
    type: types.REGISTER,
    isFetching,
  };
}
export const thunkRegister = (
  userData: types.User,
): ThunkAction<void, types.UsersState, null, Action<string>> => async (dispatch): Promise<any> => {
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

function forgotPassword(isFetching: boolean): types.UsersActionTypes {
  return {
    type: types.FORGOT_PASSWORD,
    isFetching,
  };
}
export const thunkForgotPassword = (data: types.User): ThunkAction<void, types.UsersState, null, Action<string>> => (
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

function resetPassword(isFetching: boolean): types.UsersActionTypes {
  return {
    type: types.FORGOT_PASSWORD,
    isFetching,
  };
}
export const thunkResetPassword = (data: types.User): ThunkAction<void, types.UsersState, null, Action<string>> => (
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

function sendOtp(isFetching: boolean): types.UsersActionTypes {
  return {
    type: types.FORGOT_PASSWORD,
    isFetching,
  };
}
export const thunkSendOtp = (): ThunkAction<void, types.UsersState, null, Action<string>> => (
  dispatch,
  getState,
): any => {
  dispatch(sendOtp(true));
  return api()
    .users.sendOtp()
    .then(() => {
      dispatch(sendOtp(false));
      const { user } = (getState() as any).users;
      const message =
        i18n.language === 'en'
          ? `A verification code has been sent to ${user.phone}`
          : `Kode verifikasi telah dikirim ke ${user.phone}`;
      toast.success(message);
    })
    .catch(err => {
      dispatch(sendOtp(false));
      dispatch(setErrorMessage(err.message));
      captureException(err);
    });
};
