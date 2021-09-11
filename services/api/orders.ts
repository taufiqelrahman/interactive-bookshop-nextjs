import { AdapterObject } from './index';

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

  loadOrder(orderNumber: string) {
    return this.adapter.secure.get(`${this.basePath}/${orderNumber}/detail`)
  }

  loadOrderGuest(orderNumber: string) {
    return this.adapter.default.get(`${this.basePath}/${orderNumber}/guest`)
  }

  loadOrders() {
    return this.adapter.secure.get(this.basePath)
  }
}
