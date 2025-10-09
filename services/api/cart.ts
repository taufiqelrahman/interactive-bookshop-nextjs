import { User } from 'store/users/types';
import { AdapterObject } from './index';

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

  createCart(checkoutId: string): Promise<{ data: User['cart'] }> {
    // return this.adapter.secure.post(`${this.basePath}`, data);
    return Promise.resolve({
      data: {
        // ShopifyBuy.Checkout properties
        id: checkoutId,
        completedAt: null,
        createdAt: new Date().toISOString(),
        currencyCode: 'USD',
        email: '',
        lineItems: [],
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
        phone: '',
        presentmentCurrencyCode: 'USD',
        shippingDiscountAllocations: [],
        appliedGiftCards: [],
        buyerIdentity: {
          countryCode: null,
          email: '',
          phone: '',
          customer: null,
          deliveryAddressPreferences: [],
        },
        // Additional required properties
        lineItemsSubtotalPrice: { amount: 100000, currencyCode: 'USD' },
        paymentDueV2: { amount: 0, currencyCode: 'USD' },
        subtotalPriceV2: { amount: 100000, currencyCode: 'USD' },
        totalPriceV2: { amount: 100000, currencyCode: 'USD' },
        totalTaxV2: { amount: 0, currencyCode: 'USD' },
        // Cart properties
        user_id: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: '',
        cart_items: [],
        // User cart extension
        checkout_id: checkoutId,
      } as User['cart'],
    });
  }
}
