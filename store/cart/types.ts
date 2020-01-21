export const LOAD_CART = 'LOAD_CART';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export interface Cart {
  id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  cart_items: CartItem[];
}

export interface CartItem {
  id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface CartState {
  isFetching: boolean;
  cart: Cart | null;
}

interface LoadCart {
  type: typeof LOAD_CART;
  payload: Cart | null;
  isFetching: boolean;
}
interface AddToCart {
  type: typeof ADD_TO_CART;
  payload: Cart | null;
  isFetching: boolean;
}

interface RemoveFromCart {
  type: typeof REMOVE_FROM_CART;
  payload: Cart | null;
  isFetching: boolean;
}

export type CartActionTypes = LoadCart | AddToCart | RemoveFromCart;
