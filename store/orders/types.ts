export const CHECKOUT = 'CHECKOUT';
export const LOAD_ORDER = 'LOAD_ORDER';

export interface Order {
  id: number;
  order_number: string;
  shipping_number: string;
  user_id: number;
  address_id: number;
  total: number;
  payment_type: string;
  shipping_method: string;
  shipping_rate: number;
  status: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  order_items: OrderItem[];
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  total: number;
  created_at: string;
  updated_at: string;
}

export interface OrdersState {
  isFetching: boolean;
  orders: Order[];
  currentOrder: Order | null;
}

interface Checkout {
  type: typeof CHECKOUT;
  payload: Order | null;
  isFetching: boolean;
}
interface LoadOrder {
  type: typeof LOAD_ORDER;
  payload: Order | null;
  isFetching: boolean;
}

export type OrdersActionTypes =
  | Checkout
  | LoadOrder;
