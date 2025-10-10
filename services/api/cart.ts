import { User } from 'store/users/types';
import { AdapterObject } from './index';
import { CART } from './__mocks__/cart';

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

  createCart({ checkoutId }: { checkoutId: string }): Promise<{ data: User['cart'] }> {
    // return this.adapter.secure.post(`${this.basePath}`, data);
    return Promise.resolve({
      data: {
        ...CART,
        id: checkoutId,
        checkout_id: checkoutId,
      } as User['cart'],
    });
  }
}
