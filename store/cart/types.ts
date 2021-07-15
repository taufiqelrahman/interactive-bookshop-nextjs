export const LOAD_CART = 'LOAD_CART';
// export const ADD_DISCOUNT = 'ADD_DISCOUNT';
// export const REMOVE_DISCOUNT = 'REMOVE_DISCOUNT';
export const ADD_TO_CART = 'ADD_TO_CART';
export const UPDATE_CART = 'UPDATE_CART';
export const CREATE_CART = 'CREATE_CART';
export const TRANSFER_CART = 'TRANSFER_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const SAVE_SELECTED = 'SAVE_SELECTED';

interface DiscountApplications {
  code: string;
  value: {
    percentage: number;
  };
}
export interface Cart {
  id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  cart_items: CartItem[];

  lineItemsSubtotalPrice?: {
    amount: number;
  };
  shippingLine?: {
    price: number;
  };
  discountApplications?: DiscountApplications[];
  lineItems?: CartItem[];
  webUrl?: string;
  totalPrice?: number;
}

export interface CartItem {
  id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
  price: number;
  created_at: string;
  updated_at: string;

  Name: string;
  Language: 'english' | 'indo';
  Gender: 'boy' | 'girl';
  Age: 'kid' | 'toddler';
  Skin: 'light' | 'medium' | 'dark';
  Hair: 'short' | 'curly' | 'hijab';
  Dedication: 'string';
}

export interface CartState {
  isFetching: boolean;
  cart: Cart | null;
  selected: CartItem | null;
}

interface LoadCart {
  type: typeof LOAD_CART;
  payload: Cart | null;
  isFetching: boolean;
}

// interface AddDiscount {
//   type: typeof ADD_DISCOUNT;
//   payload: Cart | null;
//   isFetching: boolean;
// }

// interface RemoveDiscount {
//   type: typeof REMOVE_DISCOUNT;
//   payload: Cart | null;
//   isFetching: boolean;
// }

interface AddToCart {
  type: typeof ADD_TO_CART;
  payload: Cart | null;
  isFetching: boolean;
}

interface UpdateCart {
  type: typeof UPDATE_CART;
  payload: Cart | null;
  isFetching: boolean;
}

interface CreateCart {
  type: typeof CREATE_CART;
  isFetching: boolean;
}

interface TransferCart {
  type: typeof TRANSFER_CART;
  payload: Cart | null;
  isFetching: boolean;
}

interface RemoveFromCart {
  type: typeof REMOVE_FROM_CART;
  payload: Cart | null;
  isFetching: boolean;
}

interface SaveSelected {
  type: typeof SAVE_SELECTED;
  payload: CartItem | null;
}

export type CartActionTypes =
  | LoadCart
  // | RemoveDiscount
  // | AddDiscount
  | AddToCart
  | UpdateCart
  | CreateCart
  | TransferCart
  | RemoveFromCart
  | SaveSelected;
