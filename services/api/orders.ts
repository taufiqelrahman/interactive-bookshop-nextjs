import { AdapterObject } from './index';

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

  loadOrder(orderNumber) {
    // return this.adapter.secure.get(`${this.basePath}/${orderNumber}/detail`);
    return Promise.resolve({
      data: {
        orderNumber,
        status: 'PAID',
        items: [{ id: 1, name: 'Book 1', qty: 1, price: 100000 }],
        total: 100000,
        createdAt: new Date().toISOString(),
      },
    });
  }

  loadOrderGuest(orderNumber) {
    // return this.adapter.default.get(`${this.basePath}/${orderNumber}/guest`);
    return Promise.resolve({
      data: {
        orderNumber,
        status: 'PAID',
        items: [{ id: 1, name: 'Book 1', qty: 1, price: 100000 }],
        total: 100000,
        guest: true,
        createdAt: new Date().toISOString(),
      },
    });
  }

  loadOrders() {
    // return this.adapter.secure.get(this.basePath);
    return Promise.resolve({
      data: [
        {
          orderNumber: 'ORD001',
          status: 'PAID',
          total: 100000,
          createdAt: new Date().toISOString(),
        },
        {
          orderNumber: 'ORD002',
          status: 'PENDING',
          total: 200000,
          createdAt: new Date().toISOString(),
        },
      ],
    });
  }
}
