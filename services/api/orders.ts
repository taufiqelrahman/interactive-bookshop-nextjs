import { Order } from 'store/orders/types';
import { AdapterObject } from './index';

interface LoadOrderResponse {
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
  };
}

export default class Orders {
  adapter: AdapterObject;
  basePath: string;

  constructor(adapter) {
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
            id: 'gid://shopify/Order/1234567890',
            user_id: 1,
            state_id: 1,
            updated_at: new Date().toISOString(),
            deleted_at: null,
            shopify_order_id: 'gid://shopify/Order/1234567890',
            order_number: orderNumber,
            created_at: new Date().toISOString(),
            name: 'Test Order',
          } as Order,
        },
      },
    });
  }

  loadOrderGuest(orderNumber): Promise<{ data: OrderResponse }> {
    // return this.adapter.default.get(`${this.basePath}/${orderNumber}/guest`);
    return Promise.resolve({
      data: {
        data: {
          order: {
            id: 'gid://shopify/Order/1234567890',
            user_id: 1,
            state_id: 1,
            updated_at: new Date().toISOString(),
            deleted_at: null,
            shopify_order_id: 'gid://shopify/Order/1234567890',
            order_number: 'ORD001',
            created_at: new Date().toISOString(),
            name: 'Test Order Guest',
          } as Order,
        },
      },
    });
  }

  loadOrders(): Promise<LoadOrderResponse> {
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
              id: 'gid://shopify/Order/1234567890',
              user_id: 1,
              state_id: 1,
              updated_at: new Date().toISOString(),
              deleted_at: null,
              shopify_order_id: 'gid://shopify/Order/1234567890',
              order_number: 'ORD001',
              created_at: new Date().toISOString(),
              name: 'Test Order 1',
            },
            {
              id: 'gid://shopify/Order/0987654321',
              user_id: 1,
              state_id: 2,
              updated_at: new Date().toISOString(),
              deleted_at: null,
              shopify_order_id: 'gid://shopify/Order/0987654321',
              order_number: 'ORD002',
              created_at: new Date().toISOString(),
              name: 'Test Order 2',
            },
          ],
        },
      },
    });
  }
}
