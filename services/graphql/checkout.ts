export default class Checkout {
  adapter: any;
  basePath: string;

  constructor(adapter) {
    this.adapter = adapter;
  }

  create(data?): Promise<any> {
    // return this.adapter.checkout.create(data);
    return Promise.resolve({
      data: {
        id: 'chk_123',
        items: data?.items || [],
        total: 100000,
        status: 'created',
        ...data,
      },
    });
  }

  get(id): Promise<any> {
    // return this.adapter.checkout.fetch(id);
    return Promise.resolve({
      data: {
        id,
        items: [{ id: 'item_1', name: 'Book 1', qty: 1, price: 100000 }],
        total: 100000,
        status: 'created',
      },
    });
  }

  addLineItems(id, data): Promise<any> {
    // return this.adapter.checkout.addLineItems(id, data);
    return Promise.resolve({
      data: {
        id,
        items: data.items || [],
        total: 100000,
        status: 'items added',
      },
    });
  }

  updateLineItems(id, data): Promise<any> {
    // return this.adapter.checkout.updateLineItems(id, data);
    return Promise.resolve({
      data: {
        id,
        items: data.items || [],
        total: 100000,
        status: 'items updated',
      },
    });
  }

  removeLineItems(id, itemId): Promise<any> {
    // return this.adapter.checkout.removeLineItems(id, itemId);
    return Promise.resolve({
      data: {
        id,
        removedItemId: itemId,
        status: 'item removed',
      },
    });
  }

  // addDiscount(id, code): Promise<any> {
  //   return this.adapter.checkout.addDiscount(id, code);
  // }

  // removeDiscount(id): Promise<any> {
  //   return this.adapter.checkout.removeDiscount(id);
  // }
}
