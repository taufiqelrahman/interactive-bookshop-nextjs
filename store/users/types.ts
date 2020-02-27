export const SET_USER = 'SET_USER';
export const LOAD_USER = 'LOAD_USER';
export const SET_LOGIN = 'SET_LOGIN';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export interface User {
  email: string;
}

export interface UsersState {
  isFetching: boolean;
  isLoggedIn: boolean;
  user: User | null;
}

interface SetUser {
  type: typeof SET_USER;
  payload: User | null;
}

interface LoadUser {
  type: typeof LOAD_USER;
  payload: User | undefined;
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

export type UsersActionTypes = SetUser | LoadUser | SetLogin | Login | Logout;
