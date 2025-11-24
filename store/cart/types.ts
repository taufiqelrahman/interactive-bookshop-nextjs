export type CartLineItem = ShopifyBuy.CheckoutLineItem & {
  customAttributes: Record<string, any>;
};
export interface Cart extends ShopifyBuy.Checkout {
  id: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  cart_items: CartItem[];
  lineItems: CartLineItem[];
}

export interface Character {
  Name: string;
  Language: string;
  Gender: string;
  Dedication: string;
  Age: string;
  Skin: string;
  Hair: string;
  Occupations: string[];
  'Date of Birth': string;
}

export interface CartItem extends Character {
  id: string;
  cart_id: number;
  product_id: number;
  quantity: number;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface CartState {
  isFetching: boolean;
  cart?: Cart | null;
  selected: CartItem | null;
}
