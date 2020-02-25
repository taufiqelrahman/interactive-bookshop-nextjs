export const SET_SIDE_NAV = 'SET_SIDE_NAV';

export interface State {
  isSideNavOpen: boolean;
}

interface SetSideNav {
  type: typeof SET_SIDE_NAV;
  payload: boolean;
}
export type ActionTypes = SetSideNav;
