import { User } from 'store/users/types';
import { AdapterObject } from './index';
import { CART } from './__mocks__/cart';

interface CartResponse {
  data: {
    data: User['cart'];
  };
}

export default class Cart {
  adapter: AdapterObject;
  basePath: string;

  constructor(adapter: AdapterObject) {
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

  createCart({ checkoutId }: { checkoutId: string }): Promise<CartResponse> {
    // return this.adapter.secure.post(`${this.basePath}`, data);
    return Promise.resolve({
      data: {
        data: {
          ...CART,
          id: checkoutId,
          checkout_id: checkoutId,
        } as any,
      },
    });
  }
}
