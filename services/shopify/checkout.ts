import ShopifyBuy from 'shopify-buy';

import { mockShippingAddress, mockShopifyCheckout } from './__mocks__/mocks';

import { IS_SHOPIFY_AVAILABLE } from '.';

export default class Checkout {
  adapter: ShopifyBuy;
  basePath: string;

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
          email: data?.email || '',
          ...mockShopifyCheckout.buyerIdentity,
        },
        ...mockShopifyCheckout,
      });
    }
    return this.adapter.checkout.create(data);
  }

  get(id: ShopifyBuy.ID): Promise<ShopifyBuy.Checkout> {
    if (!IS_SHOPIFY_AVAILABLE) {
      return Promise.resolve({
        id: id,
        lineItems: [],
        shippingAddress: mockShippingAddress,
        customAttributes: [],
        buyerIdentity: {
          email: 'john@example.com',
          ...mockShopifyCheckout.buyerIdentity,
        },
        ...mockShopifyCheckout,
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
          customAttributes: item.customAttributes || [],
          variant: {
            id: (item as any).variantId || `variant_${idx}`,
            title: (item as any).variantTitle || 'Default Variant',
            price: (item as any).price || '0.00',
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
            shopifyId: (item as any).variantId || `variant_${idx}`,
            taxable: false,
            unitPrice: null,
            weight: 0,
            sellingPlanAllocations: [],
            storeAvailability: [],
            metafields: [],
          },
        })),
        ...mockShopifyCheckout,
      } as ShopifyBuy.Checkout);
    }
    return this.adapter.checkout.addLineItems(checkoutId, lineItems);
  }

  updateLineItems(id: ShopifyBuy.ID, data: ShopifyBuy.CheckoutLineItemUpdateInput[]): Promise<ShopifyBuy.Checkout> {
    if (!IS_SHOPIFY_AVAILABLE) {
      return Promise.resolve({
        id,
        lineItems: [],
        shippingAddress: mockShippingAddress,
        customAttributes: [],
        buyerIdentity: {
          email: 'john@example.com',
          ...mockShopifyCheckout.buyerIdentity,
        },
        ...mockShopifyCheckout,
      } as ShopifyBuy.Checkout);
    }
    return this.adapter.checkout.updateLineItems(id, data);
  }

  removeLineItems(id: ShopifyBuy.ID, itemId: string[]): Promise<ShopifyBuy.Checkout> {
    if (!IS_SHOPIFY_AVAILABLE) {
      return Promise.resolve({
        id,
        lineItems: [],
        shippingAddress: mockShippingAddress,
        customAttributes: [],
        buyerIdentity: {
          email: 'john@example.com',
          ...mockShopifyCheckout.buyerIdentity,
        },
        ...mockShopifyCheckout,
      });
    }
    return this.adapter.checkout.removeLineItems(id, itemId);
  }

  addDiscount(id: ShopifyBuy.ID, code: string): Promise<ShopifyBuy.Checkout> {
    return this.adapter.checkout.addDiscount(id, code);
  }

  removeDiscount(id: ShopifyBuy.ID): Promise<ShopifyBuy.Checkout> {
    return this.adapter.checkout.removeDiscount(id);
  }
}
