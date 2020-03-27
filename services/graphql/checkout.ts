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

  get(id): Promise<any> {
    return this.adapter.checkout.fetch(id);
  }

  addLineItems(id, data): Promise<any> {
    return this.adapter.checkout.addLineItems(id, data);
  }

  updateLineItems(id, data): Promise<any> {
    return this.adapter.checkout.updateLineItems(id, data);
  }

  removeLineItems(id, itemId): Promise<any> {
    return this.adapter.checkout.removeLineItems(id, itemId);
  }
}
