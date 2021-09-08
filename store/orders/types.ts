import { CustomAttributes } from 'store/cart/types';

// export const CHECKOUT = 'CHECKOUT';
export const LOAD_ORDER = 'LOAD_ORDER';
export const LOAD_ORDERS = 'LOAD_ORDERS';
export const SET_PAYMENT_PROBLEM = 'SET_PAYMENT_PROBLEM';

export interface LineItem {
  id: string;
  properties: {
    name: string;
    value: string;
  }[];
  customAttributes: CustomAttributes;
}
export interface Order {
  id: number;
  name: string;
  order_number: string;
  shopify_order_id: string;
  user_id: number;
  state_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  state: string;
  line_items: LineItem[];
  total_price: number;
  shipping_address: {
    address1: string;
    address2: string;
    province: string;
    zip: string;
    city: string;
  };
  fulfillments: {
    created_at: string;
    tracking_number: string;
  }[];
  fulfillment_status: string;
  processed_at: string;
  shipping_lines: {
    title: string;
    price: number;
  }[];
  discount_applications: {
    code: string;
  }[];
  total_discounts: number;
  payment: {
    type: string;
    instance: string;
    number: string;
    url: string;
  };
  total_line_items_price: number;
  financial_status: string;
}

export interface OrdersState {
  isFetching: boolean;
  orders: Order[];
  currentOrder: Order | null;
  paymentProblem: boolean;
}

export interface OrderStateJson {
  shopify_order_id: string;
  state: {
    name: string;
  };
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
