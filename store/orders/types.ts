import { CartItem } from 'store/cart/types';

// export const CHECKOUT = 'CHECKOUT';
export const LOAD_ORDER = 'LOAD_ORDER';
export const LOAD_ORDERS = 'LOAD_ORDERS';
export const SET_PAYMENT_PROBLEM = 'SET_PAYMENT_PROBLEM';

export interface Order extends CartItem {
  id: number;
  order_number: string;
  shopify_order_id: string;
  user_id: number;
  state_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  state: {
    name: string;
  };
  properties?: any;
}

export interface OrdersState {
  isFetching: boolean;
  orders: Order[];
  currentOrder: Order | null;
  paymentProblem: boolean;
}

// interface Checkout {
//   type: typeof CHECKOUT;
//   payload: Order | null;
//   isFetching: boolean;
// }
interface LoadOrder {
  type: typeof LOAD_ORDER;
  payload: Order | null;
  isFetching: boolean;
}
interface LoadOrders {
  type: typeof LOAD_ORDERS;
  payload: Order[];
  isFetching: boolean;
}
interface SetPaymentProblem {
  type: typeof SET_PAYMENT_PROBLEM;
  payload: boolean;
}

export type OrdersActionTypes = LoadOrder | LoadOrders | SetPaymentProblem;
