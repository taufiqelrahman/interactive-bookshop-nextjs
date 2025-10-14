export interface Order {
  id: string;
  order_number: string;
  shopify_order_id: string;
  user_id: number;
  state_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  state?: string;
  name: string;
  payment?: {
    type: string;
    instance: string;
    number: string;
    url: string;
  };
}

export interface OrdersState {
  isFetching: boolean;
  orders: Order[];
  currentOrder: Order | null;
  paymentProblem: boolean;
}
