import { AdapterObject } from './index';

export default class Cart {
  adapter: AdapterObject;
  basePath: string;

  constructor(adapter) {
    this.adapter = adapter;
    this.basePath = '/cart';
  }

  // get() {
  //   return this.adapter.secure.get(`${this.basePath}`)
  // }

  // addToCart(data) {
  //   return this.adapter.secure.post(`${this.basePath}`, data)
  // }

  // removeFromCart(data) {
  //   return this.adapter.secure.delete(`${this.basePath}`, data)
  // }

  createCart(data) {
    return this.adapter.secure.post(`${this.basePath}`, data)
  }
}
