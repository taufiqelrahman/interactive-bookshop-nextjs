import { Order } from 'store/orders/types';
import { AdapterObject } from './index';
import { ORDER } from './__mocks__/order';

interface OrdersResponse {
  data: {
    data: {
      orders: Order[];
      order_states: {
        shopify_order_id: string;
        state: {
          name: string;
        };
      }[];
    };
  };
}

export interface OrderResponse {
  data: {
    order: Order;
    state?: {
      name: string;
    };
    payment?: {
      id: string;
      amount: string;
      currency: string;
      payment_method: string;
      status: string;
      created_at: string;
      updated_at: string;
    };
  };
}

export default class Orders {
  adapter: AdapterObject;
  basePath: string;

  constructor(adapter: AdapterObject) {
    this.adapter = adapter;
    this.basePath = '/orders';
  }

  // checkout(data) {
  //   return this.adapter.secure.post(`${this.basePath}`, data)
  // }

  loadOrder(orderNumber: string): Promise<{ data: OrderResponse }> {
    // return this.adapter.secure.get(`${this.basePath}/${orderNumber}/detail`);
    return Promise.resolve({
      data: {
        data: {
          order: {
            ...ORDER,
            state_id: 1,
            order_number: orderNumber,
            name: 'Test Order',
          } as Order,
        },
      },
    });
  }

  loadOrderGuest(orderNumber: any): Promise<{ data: OrderResponse }> {
    // return this.adapter.default.get(`${this.basePath}/${orderNumber}/guest`);
    return Promise.resolve({
      data: {
        data: {
          order: {
            ...ORDER,
            state_id: 1,
            order_number: orderNumber,
            name: 'Test Order Guest',
          } as Order,
        },
      },
    });
  }

  loadOrders(): Promise<OrdersResponse> {
    // return this.adapter.secure.get(this.basePath);
    return Promise.resolve({
      data: {
        data: {
          order_states: [
            {
              shopify_order_id: 'gid://shopify/Order/1234567890',
              state: {
                name: 'PAID',
              },
            },
            {
              shopify_order_id: 'gid://shopify/Order/0987654321',
              state: {
                name: 'PENDING',
              },
            },
          ],
          orders: [
            {
              ...ORDER,
              state_id: 1,
              order_number: 'ORD001',
              name: 'Test Order 1',
            },
            {
              ...ORDER,
              state_id: 2,
              order_number: 'ORD002',
              name: 'Test Order 2',
            },
          ],
        },
      },
    });
  }
}
