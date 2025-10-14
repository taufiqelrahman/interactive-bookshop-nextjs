import { Cart } from 'store/cart/types';

export interface User {
  name: string;
  email: string;
  cart: Cart & {
    checkout_id: string;
  };
}

export interface UsersState {
  isFetching: boolean;
  isLoggedIn: boolean;
  isExpired: boolean;
  user: User | null;
}
