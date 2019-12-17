import * as cartActions from './cart/actions';
import * as ordersActions from './orders/actions';
import * as productsActions from './products/actions';
import * as usersActions from './users/actions';

export default {
  ...cartActions,
  ...ordersActions,
  ...productsActions,
  ...usersActions,
};
