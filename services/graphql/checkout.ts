import Client from 'shopify-buy';

export default class Checkout {
  adapter: Client.Client;
  // basePath: string;

  constructor(adapter: Client.Client) {
    this.adapter = adapter;
  }

  create(data: any): Promise<any> {
    // return this.adapter.product.fetchAll();
    return this.adapter.checkout.create(data);
  }

  get(id: string): Promise<any> {
    return this.adapter.checkout.fetch(id);
  }

  addLineItems(id: string | number, data: any): Promise<any> {
    return this.adapter.checkout.addLineItems(id, data);
  }

  updateLineItems(id: string | number, data: any): Promise<any> {
    return this.adapter.checkout.updateLineItems(id, data);
  }

  removeLineItems(id: string | number, itemId: string[]): Promise<any> {
    return this.adapter.checkout.removeLineItems(id, itemId);
  }

  // addDiscount(id, code): Promise<any> {
  //   return this.adapter.checkout.addDiscount(id, code);
  // }

  // removeDiscount(id): Promise<any> {
  //   return this.adapter.checkout.removeDiscount(id);
  // }
}
