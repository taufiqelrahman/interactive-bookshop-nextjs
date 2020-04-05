// export const SET_USER = 'SET_USER';
export const LOAD_USER = 'LOAD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const SET_LOGIN = 'SET_LOGIN';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const SEND_OTP = 'SEND_OTP';

export interface User {
  email: string;
}

export interface UsersState {
  isFetching: boolean;
  isLoggedIn: boolean;
  user: User | null;
}

// interface SetUser {
//   type: typeof SET_USER;
//   payload: User | null;
// }

interface LoadUser {
  type: typeof LOAD_USER;
  payload: User | object;
  isFetching: boolean;
}

interface UpdateUser {
  type: typeof UPDATE_USER;
  payload: User | object;
  isFetching: boolean;
}

interface SetLogin {
  type: typeof SET_LOGIN;
  payload: boolean;
}

interface Login {
  type: typeof LOGIN;
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
  | Login
  | Logout
  | Register
  | ForgotPassword
  | ResetPassword
  | SendOtp;
