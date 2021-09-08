import { Cart } from 'store/cart/types';

// export const SET_USER = 'SET_USER';
export const LOAD_USER = 'LOAD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const SET_LOGIN = 'SET_LOGIN';
export const SET_EXPIRED = 'SET_EXPIRED';
export const LOGIN = 'LOGIN';
export const LOGIN_FACEBOOK = 'LOGIN_FACEBOOK';
export const LOGIN_GOOGLE = 'LOGIN_GOOGLE';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const SEND_OTP = 'SEND_OTP';

export interface Address {
  address1: string;
  address2: string;
  province: string;
  zip: string;
  city: string;
  country: string;
}

export interface User {
  email: string;
  name: string;
  phone: string;
  cart: Cart;
  address: Address;
}

export interface UsersState {
  isFetching: boolean | null;
  isLoggedIn: boolean | null;
  isExpired: boolean;
  user: User | null;
}

// interface SetUser {
//   type: typeof SET_USER;
//   payload: User | null;
// }

interface LoadUser {
  type: typeof LOAD_USER;
  payload: User | null;
  isFetching: boolean;
}

export interface UpdateUser {
  type: typeof UPDATE_USER;
  payload: User | undefined;
  isFetching: boolean;
}

interface SetLogin {
  type: typeof SET_LOGIN;
  payload: boolean;
}
interface SetExpired {
  type: typeof SET_EXPIRED;
  payload: boolean;
}
interface Login {
  type: typeof LOGIN;
  payload: boolean | null;
  isFetching: boolean;
}
interface LoginFacebook {
  type: typeof LOGIN_FACEBOOK;
  payload: boolean | null;
  isFetching: boolean;
}
interface LoginGoogle {
  type: typeof LOGIN_GOOGLE;
  payload: boolean | null;
  isFetching: boolean;
}
interface Logout {
  type: typeof LOGOUT;
  payload: boolean | null;
  isFetching: boolean;
}

interface Register {
  type: typeof REGISTER;
  isFetching: boolean;
}

interface ForgotPassword {
  type: typeof FORGOT_PASSWORD;
  isFetching: boolean;
}

interface ResetPassword {
  type: typeof RESET_PASSWORD;
  isFetching: boolean;
}

interface SendOtp {
  type: typeof SEND_OTP;
  isFetching: boolean;
}

export type UsersActionTypes =
  | LoadUser
  | UpdateUser
  | SetLogin
  | SetExpired
  | Login
  | LoginFacebook
  | LoginGoogle
  | Logout
  | Register
  | ForgotPassword
  | ResetPassword
  | SendOtp;
