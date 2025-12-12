import { captureException } from '@sentry/core';
import { toast } from 'react-toastify';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { setSecureCookie, removeSecureCookie } from 'lib/secure-cookies';
import api from 'services/api';
import shopify from 'services/shopify';
import { loadCart } from 'store/cart/reducers';
import { setErrorMessage } from 'store/reducers';

import { thunkLoadCart } from '../cart/actions';

import {
  forgotPassword,
  loadUser,
  login,
  loginFacebook,
  loginGoogle,
  logout,
  register,
  resetPassword,
  sendOtp,
  setExpired,
} from './reducers';
import * as types from './types';

export const thunkLoadUser =
  (req?: any): any =>
  (dispatch: any): any => {
    dispatch(loadUser({ isFetching: true, payload: undefined }));
    return api(req)
      .users.getMe()
      .then(({ data }) => {
        // @todo fix typing
        dispatch(loadUser({ isFetching: false, payload: data as unknown as types.User }));
        if (data.cart) dispatch(thunkLoadCart(data.cart.checkout_id));
      })
      .catch((err) => {
        dispatch(loadUser({ isFetching: false, payload: undefined }));
        dispatch(setErrorMessage(err.message));
        captureException(err);
      });
  };

export const thunkUpdateUser =
  (data: any, language = 'en'): any =>
  (dispatch: any): any => {
    dispatch(loadUser({ isFetching: true, payload: undefined }));
    return api()
      .users.updateMe(data)
      .then(({ data }) => {
        dispatch(loadUser({ isFetching: false, payload: data.user }));
        const isEnglish = language === 'en';
        let message = isEnglish ? 'Saved successfully' : 'Berhasil menyimpan';
        if (data.updated === 'email') {
          message = isEnglish
            ? `A confirmation email has been sent to ${data.user.email}`
            : `Email konfirmasi untuk pengubahan telah dikirim ke ${data.user.email}`;
        }
        toast.success(message);
      })
      .catch((err) => {
        dispatch(loadUser({ isFetching: false, payload: undefined }));
        let message = '';
        if (err.response.data) {
          if (err.response.data.error === 'DIFFERENT_PHONE') {
            message = language === 'en' ? 'Your old phone number did not match' : 'Nomor telepon anda tidak sesuai';
          }
        } else {
          message = err.message;
        }
        dispatch(setErrorMessage(message));
        captureException(err);
      });
  };

export const thunkLogin =
  (userData: any): ThunkAction<void, types.UsersState, null, Action<string>> =>
  (dispatch: any) => {
    dispatch(login({ isFetching: true, payload: undefined }));
    return api()
      .users.login(userData)
      .then(({ data }) => {
        // const token = encryptTokenClient(data.token);
        setSecureCookie('user', data.token);
        dispatch(setExpired(false));
        dispatch(login({ isFetching: false, payload: !!data }));
      })
      .catch((err) => {
        dispatch(login({ isFetching: false, payload: undefined }));
        dispatch(setErrorMessage(err.response && err.response.data));
        captureException(err);
      });
  };

export const thunkLoginFacebook =
  (data: any): ThunkAction<void, types.UsersState, null, Action<string>> =>
  (dispatch: any): any => {
    dispatch(loginFacebook({ isFetching: true, payload: undefined }));
    return api()
      .users.loginFacebook(data)
      .then(({ data }) => {
        // const token = encryptTokenClient(data.token);
        setSecureCookie('user', data.token);
        dispatch(setExpired(false));
        dispatch(loginFacebook({ isFetching: false, payload: !!data }));
      })
      .catch((err) => {
        dispatch(loginFacebook({ isFetching: false, payload: undefined }));
        dispatch(setErrorMessage(err.message));
        captureException(err);
      });
  };

export const thunkLoginGoogle =
  (data: any): ThunkAction<void, types.UsersState, null, Action<string>> =>
  (dispatch: any): any => {
    dispatch(loginGoogle({ isFetching: true, payload: undefined }));
    return api()
      .users.loginGoogle(data)
      .then(({ data }) => {
        // const token = encryptTokenClient(data.token);
        setSecureCookie('user', data.token);
        dispatch(setExpired(false));
        dispatch(loginGoogle({ isFetching: false, payload: !!data }));
      })
      .catch((err) => {
        dispatch(loginGoogle({ isFetching: false, payload: undefined }));
        dispatch(setErrorMessage(err.message));
        captureException(err);
      });
  };

export const thunkLogout =
  (): ThunkAction<void, types.UsersState, null, Action<string>> =>
  (dispatch: any): any => {
    dispatch(logout({ isFetching: true, payload: undefined }));
    return api()
      .users.logout()
      .then(({ data }) => {
        removeSecureCookie('user');
        dispatch(logout({ isFetching: false, payload: !!data }));
        dispatch(loadCart({ isFetching: false, payload: undefined }));
      })
      .catch((err) => {
        dispatch(logout({ isFetching: false, payload: undefined }));
        captureException(err);
      });
  };

export const thunkRegister =
  (userData: any): ThunkAction<void, types.UsersState, null, Action<string>> =>
  async (dispatch): Promise<any> => {
    dispatch(register({ isFetching: true }));
    const checkout = await shopify().checkout.create();
    return api()
      .users.register({
        ...userData,
        checkoutId: checkout.id,
      })
      .then(() => {
        dispatch(register({ isFetching: false }));
      })
      .catch((err) => {
        dispatch(register({ isFetching: false }));
        dispatch(setErrorMessage(err.message));
        captureException(err);
      });
  };

export const thunkForgotPassword =
  (data: any): ThunkAction<void, types.UsersState, null, Action<string>> =>
  (dispatch: any): any => {
    dispatch(forgotPassword({ isFetching: true }));
    return api()
      .users.forgotPassword(data)
      .then(() => {
        dispatch(forgotPassword({ isFetching: false }));
      })
      .catch((err) => {
        dispatch(forgotPassword({ isFetching: false }));
        dispatch(setErrorMessage(err.message));
        captureException(err);
      });
  };

export const thunkResetPassword =
  (data: any): ThunkAction<void, types.UsersState, null, Action<string>> =>
  (dispatch: any): any => {
    dispatch(resetPassword({ isFetching: true }));
    return api()
      .users.resetPassword(data)
      .then(() => {
        dispatch(resetPassword({ isFetching: false }));
      })
      .catch((err) => {
        dispatch(resetPassword({ isFetching: false }));
        dispatch(setErrorMessage(err.message));
        captureException(err);
      });
  };

export const thunkSendOtp =
  (language = 'en'): ThunkAction<void, types.UsersState, null, Action<string>> =>
  (dispatch, getState): any => {
    dispatch(sendOtp({ isFetching: true }));
    return api()
      .users.sendOtp()
      .then(() => {
        dispatch(sendOtp({ isFetching: false }));
        const { user } = (getState() as any).users;
        const message =
          language === 'en'
            ? `A verification code has been sent to ${user.phone}`
            : `Kode verifikasi telah dikirim ke ${user.phone}`;
        toast.success(message);
      })
      .catch((err) => {
        dispatch(sendOtp({ isFetching: false }));
        dispatch(setErrorMessage(err.message));
        captureException(err);
      });
  };
