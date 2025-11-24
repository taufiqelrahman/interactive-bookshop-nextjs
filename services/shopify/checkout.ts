import ShopifyBuy from 'shopify-buy';

import { mockShippingAddress, mockShopifyCheckout } from './__mocks__/mocks';

import { IS_SHOPIFY_AVAILABLE } from '.';

export default class Checkout {
  adapter: ShopifyBuy;
  basePath: string = '';

  constructor(adapter: ShopifyBuy) {
    this.adapter = adapter;
  }

  create(data?: {
    email?: string;
    lineItems?: ShopifyBuy.CheckoutLineItemInput[];
    shippingAddress?: ShopifyBuy.MailingAddressInput;
    customAttributes?: ShopifyBuy.AttributeInput[];
    presentmentCurrencyCode?: ShopifyBuy.CurrencyCode;
  }): Promise<ShopifyBuy.Checkout> {
    if (!IS_SHOPIFY_AVAILABLE) {
      return Promise.resolve({
        ...mockShopifyCheckout,
        id: 'chk_123',
        lineItems:
          data?.lineItems?.map((item, idx) => ({
            ...item,
            id: `lineitem_${idx}`,
            title: (item as any).title || 'Product',
            discountAllocations: [],
            customAttributes: (item as any).customAttributes || [],
          })) || [],
        shippingAddress: data?.shippingAddress
          ? { ...mockShippingAddress, ...data.shippingAddress }
          : mockShippingAddress,
        customAttributes: data?.customAttributes || [],
        buyerIdentity: {
          ...mockShopifyCheckout.buyerIdentity,
          email: data?.email || '',
        },
      } as any);
    }
    return this.adapter.checkout.create(data);
  }

  get(id: ShopifyBuy.ID): Promise<ShopifyBuy.Checkout> {
    if (!IS_SHOPIFY_AVAILABLE) {
      return Promise.resolve({
        ...mockShopifyCheckout,
        id: id,
        lineItems: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') as any).lineItems : [],
      } as any);
    }
    return this.adapter.checkout.fetch(id);
  }

  addLineItems(checkoutId: ShopifyBuy.ID, lineItems: ShopifyBuy.CheckoutLineItemInput[]): Promise<ShopifyBuy.Checkout> {
    if (!IS_SHOPIFY_AVAILABLE) {
      return Promise.resolve({
        id: checkoutId,
        lineItems: lineItems.map(
          (item, idx) =>
            ({
              ...item,
              id: `lineitem_${idx}`,
              title: (item as any).title || 'Product',
              discountAllocations: [],
              customAttributes: item.customAttributes || [],
              variant: {
                id: item.variantId || `variant_${idx}`,
                title: (item as any).variantTitle || 'Default Variant',
                price: {
                  amount: item.quantity ? (item as any).price || '0.00' : '0.00',
                  currencyCode: 'IDR',
                },
                sku: (item as any).sku || `SKU_${idx}`,
                available: true,
                selectedOptions: [],
                image: null,
                product: null,
                availableForSale: true,
                barcode: '',
                compareAtPrice: null,
                currentlyNotInStock: false,
                presentmentPrices: [],
                requiresShipping: true,
                shopifyId: item.variantId || `variant_${idx}`,
                taxable: false,
                unitPrice: null,
                weight: 0,
                sellingPlanAllocations: [],
                storeAvailability: [],
                metafields: [],
              },
            }) as any,
        ),
        ...mockShopifyCheckout,
      } as any);
    }
    return this.adapter.checkout.addLineItems(checkoutId, lineItems);
  }

  updateLineItems(id: ShopifyBuy.ID, data: ShopifyBuy.CheckoutLineItemUpdateInput[]): Promise<ShopifyBuy.Checkout> {
    if (!IS_SHOPIFY_AVAILABLE) {
      return Promise.resolve({
        ...mockShopifyCheckout,
        id,
        lineItems: [],
        shippingAddress: mockShippingAddress,
        customAttributes: [],
        buyerIdentity: {
          ...mockShopifyCheckout.buyerIdentity,
          email: 'john@example.com',
        },
      } as any);
    }
    return this.adapter.checkout.updateLineItems(id, data);
  }

  removeLineItems(id: ShopifyBuy.ID, itemIds: string[]): Promise<ShopifyBuy.Checkout> {
    if (!IS_SHOPIFY_AVAILABLE) {
      return Promise.resolve({
        ...mockShopifyCheckout,
        id,
        lineItems: [],
        shippingAddress: mockShippingAddress,
        customAttributes: [],
        buyerIdentity: {
          ...mockShopifyCheckout.buyerIdentity,
          email: 'john@example.com',
        },
      } as any);
    }
    return this.adapter.checkout.removeLineItems(id, itemIds);
  }

  addDiscount(id: ShopifyBuy.ID, code: string): Promise<ShopifyBuy.Checkout> {
    if (!IS_SHOPIFY_AVAILABLE) {
      return Promise.resolve({
        ...mockShopifyCheckout,
        id,
        lineItems: [],
        shippingAddress: mockShippingAddress,
        customAttributes: [],
        buyerIdentity: {
          ...mockShopifyCheckout.buyerIdentity,
          email: 'john@example.com',
        },
        discountApplications: [
          {
            code,
            type: 'discount_code',
            value: {
              amount: '10.00',
              currencyCode: 'USD',
              type: 'fixed_amount',
            },
            allocationMethod: 'across',
            targetSelection: 'all',
            targetType: 'line_item',
          },
        ],
      } as any);
    }
    return this.adapter.checkout.addDiscount(id, code);
  }

  removeDiscount(id: ShopifyBuy.ID): Promise<ShopifyBuy.Checkout> {
    if (!IS_SHOPIFY_AVAILABLE) {
      return Promise.resolve({
        ...mockShopifyCheckout,
        id,
        lineItems: [],
        shippingAddress: mockShippingAddress,
        customAttributes: [],
        buyerIdentity: {
          ...mockShopifyCheckout.buyerIdentity,
          email: 'john@example.com',
        },
        discountApplications: [],
      } as any);
    }
    return this.adapter.checkout.removeDiscount(id);
  }
}
