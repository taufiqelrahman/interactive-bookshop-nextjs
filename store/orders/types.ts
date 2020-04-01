// export const CHECKOUT = 'CHECKOUT';
export const LOAD_ORDER = 'LOAD_ORDER';
export const LOAD_ORDERS = 'LOAD_ORDERS';

interface Order {
  id: number;
  order_number: string;
  shopify_order_id: string;
  user_id: number;
  state_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface OrdersState {
  isFetching: boolean;
  orders: Order[];
  currentOrder: Order | null;
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
  payload: Order[] | null;
  isFetching: boolean;
}

export type OrdersActionTypes = LoadOrder | LoadOrders;
