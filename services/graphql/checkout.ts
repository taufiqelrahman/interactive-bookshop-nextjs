export default class Checkout {
  adapter: any;
  basePath: string;

  constructor(adapter) {
    this.adapter = adapter;
  }

  create(data): Promise<any> {
    // return this.adapter.product.fetchAll();
    return this.adapter.checkout.create(data);
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

  // addDiscount(id, code): Promise<any> {
  //   return this.adapter.checkout.addDiscount(id, code);
  // }

  // removeDiscount(id): Promise<any> {
  //   return this.adapter.checkout.removeDiscount(id);
  // }
}
