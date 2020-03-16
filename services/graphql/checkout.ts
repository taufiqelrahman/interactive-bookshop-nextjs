export default class Checkout {
  adapter: any;
  basePath: string;

  constructor(adapter) {
    this.adapter = adapter;
  }

  create(): Promise<any> {
    // return this.adapter.product.fetchAll();
    return this.adapter.checkout.create();
  }

  addLineItems(id, data): Promise<any> {
    return this.adapter.checkout.addLineItems(id, data);
  }
}
