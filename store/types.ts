export const SET_SIDE_NAV = 'SET_SIDE_NAV';
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
export const SEND_MESSAGE = 'SEND_MESSAGE';

export interface State {
  isSideNavOpen: boolean;
  errorMessage: string;
  isFetching: boolean;
  maintenanceMode: boolean;
}

interface SetSideNav {
  type: typeof SET_SIDE_NAV;
  payload: boolean;
}
interface SetErrorMessage {
  type: typeof SET_ERROR_MESSAGE;
  payload: string;
}
interface SendMessage {
  type: typeof SEND_MESSAGE;
  payload: boolean;
}
export type ActionTypes = SetSideNav | SetErrorMessage | SendMessage;

export interface KeyValue {
  key?: string;
  name?: string;
  value: string;
}

export interface Child {
  Name: string;
  Gender: string;
  Age: string;
  Skin: string;
  Hair: string;
  Dedication: string;
}
