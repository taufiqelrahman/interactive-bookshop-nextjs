import { IS_SHOPIFY_AVAILABLE } from '.';

export default class Checkout {
  adapter: ShopifyBuy;
  basePath: string;

  constructor(adapter: ShopifyBuy) {
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
        completedAt: null,
        createdAt: new Date().toISOString(),
        currencyCode: 'USD',
        email: '',
        lineItemsSubtotalPrice: { amount: 100000, currencyCode: 'USD' },
        note: null,
        order: null,
        orderStatusUrl: null,
        ready: true,
        requiresShipping: true,
        shippingAddress: null,
        shippingLine: null,
        subtotalPrice: { amount: 100000, currencyCode: 'USD' },
        taxExempt: false,
        taxesIncluded: false,
        totalPrice: { amount: 100000, currencyCode: 'USD' },
        totalTax: { amount: 0, currencyCode: 'USD' },
        updatedAt: new Date().toISOString(),
        webUrl: '',
        discountApplications: [],
        customAttributes: [],
        userErrors: [],
        completed: false,
        paymentDue: { amount: 0, currencyCode: 'USD' },
        paymentDueV2: { amount: 0, currencyCode: 'USD' },
        phone: '',
        presentmentCurrencyCode: 'USD',
        shippingDiscountAllocations: [],
        shippingLineHandle: '',
        subtotalPriceV2: { amount: 100000, currencyCode: 'USD' },
        totalDuties: null,
        totalPriceV2: { amount: 100000, currencyCode: 'USD' },
        totalTaxV2: { amount: 0, currencyCode: 'USD' },
        appliedGiftCards: [],
        buyerIdentity: {
          countryCode: null,
          email: '',
          phone: '',
          customer: null,
          deliveryAddressPreferences: [],
        },
      } as ShopifyBuy.Checkout);
    }
    return this.adapter.checkout.addLineItems(checkoutId, lineItems);
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
