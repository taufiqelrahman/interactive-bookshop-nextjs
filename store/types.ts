export const SET_SIDE_NAV = 'SET_SIDE_NAV';
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';

export interface State {
  isSideNavOpen: boolean;
  errorMessage: string;
}

interface SetSideNav {
  type: typeof SET_SIDE_NAV;
  payload: boolean;
}
interface SetErrorMessage {
  type: typeof SET_ERROR_MESSAGE;
  payload: string;
}
export type ActionTypes = SetSideNav | SetErrorMessage;
