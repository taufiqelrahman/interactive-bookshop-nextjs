export const SET_LOGIN = 'SET_LOGIN';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export interface UsersState {
  isFetching: boolean;
  isLoggedIn: boolean;
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

export type UsersActionTypes = SetLogin | Login | Logout;
