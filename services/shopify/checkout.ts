import { mockShopifyCheckout } from './__mocks__/mocks';

import { IS_SHOPIFY_AVAILABLE } from '.';

export default class Checkout {
  adapter: ShopifyBuy;
  basePath: string;

  constructor(adapter: ShopifyBuy) {
    this.adapter = adapter;
  }

  create(data?): Promise<any> {
    if (!IS_SHOPIFY_AVAILABLE) {
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
    return this.adapter.checkout.create(data);
  }

  get(id): Promise<any> {
    if (!IS_SHOPIFY_AVAILABLE) {
      return Promise.resolve({
        data: {
          id,
          items: [{ id: 'item_1', name: 'Book 1', qty: 1, price: 100000 }],
          total: 100000,
          status: 'created',
        },
      });
    }
    return this.adapter.checkout.fetch(id);
  }

  addLineItems(checkoutId: ShopifyBuy.ID, lineItems: ShopifyBuy.CheckoutLineItemInput[]): Promise<ShopifyBuy.Checkout> {
    if (!IS_SHOPIFY_AVAILABLE) {
      return Promise.resolve({
        id: checkoutId,
        lineItems: lineItems.map((item, idx) => ({
          ...item,
          id: `lineitem_${idx}`,
          title: (item as any).title || 'Product',
          discountAllocations: [],
        })),
        ...mockShopifyCheckout,
      } as ShopifyBuy.Checkout);
    }
    return this.adapter.checkout.addLineItems(checkoutId, lineItems);
  }

  updateLineItems(id, data): Promise<any> {
    if (!IS_SHOPIFY_AVAILABLE) {
      return Promise.resolve({
        data: {
          id,
          items: data.items || [],
          total: 100000,
          status: 'items updated',
        },
      });
    }
    return this.adapter.checkout.updateLineItems(id, data);
  }

  removeLineItems(id, itemId): Promise<any> {
    if (!IS_SHOPIFY_AVAILABLE) {
      return Promise.resolve({
        data: {
          id,
          removedItemId: itemId,
          status: 'item removed',
        },
      });
    }
    return this.adapter.checkout.removeLineItems(id, itemId);
  }

  // addDiscount(id, code): Promise<any> {
  //   return this.adapter.checkout.addDiscount(id, code);
  // }

  // removeDiscount(id): Promise<any> {
  //   return this.adapter.checkout.removeDiscount(id);
  // }
}
