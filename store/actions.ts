import * as cartActions from './cart/actions';
import * as ordersActions from './orders/actions';
import * as productsActions from './products/actions';
import * as usersActions from './users/actions';
import * as types from './types';

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
};
