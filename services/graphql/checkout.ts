import { ApolloClient } from 'apollo-boost';

export default class Checkout {
  adapter: any;
  // basePath: string;

  constructor(adapter: ApolloClient<any>) {
    this.adapter = adapter;
  }

  create(data: any): Promise<any> {
    // return this.adapter.product.fetchAll();
    return this.adapter.checkout.create(data);
  }

  get(id: number): Promise<any> {
    return this.adapter.checkout.fetch(id);
  }

  addLineItems(id: number, data: any): Promise<any> {
    return this.adapter.checkout.addLineItems(id, data);
  }

  updateLineItems(id: number, data: any): Promise<any> {
    return this.adapter.checkout.updateLineItems(id, data);
  }

  removeLineItems(id: number, itemId: number): Promise<any> {
    return this.adapter.checkout.removeLineItems(id, itemId);
  }

  // addDiscount(id, code): Promise<any> {
  //   return this.adapter.checkout.addDiscount(id, code);
  // }

  // removeDiscount(id): Promise<any> {
  //   return this.adapter.checkout.removeDiscount(id);
  // }
}
