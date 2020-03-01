import * as cartActions from './cart/actions';
import * as ordersActions from './orders/actions';
import * as productsActions from './products/actions';
import * as usersActions from './users/actions';
import * as types from './types';

export const setErrorMessage = (message: string): types.ActionTypes => {
  return {
    type: types.SET_ERROR_MESSAGE,
    payload: message,
  };
};

export default {
  ...cartActions,
  ...ordersActions,
  ...productsActions,
  ...usersActions,
  setSideNav(state: boolean): types.ActionTypes {
    return {
      type: types.SET_SIDE_NAV,
      payload: state,
    };
  },
  setSheet(state: boolean): types.ActionTypes {
    return {
      type: types.SET_SHEET,
      payload: state,
    };
  },
  setErrorMessage,
};
