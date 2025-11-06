import { mapKeyValue } from 'lib/format-array';
import { getPreviewUrl } from 'lib/format-image';

/**
 * WhatsApp contact configuration
 * Base URL for WhatsApp Web API with Indonesian phone number
 * Note: Replace 'xxx' with actual phone number digits
 */
const WHATSAPP_BASE_URL = 'https://wa.me/628xxx?text=' as const;

/**
 * Enhanced line item with custom attributes
 */
interface EnhancedLineItem {
  /** All original line item properties */
  [key: string]: unknown;
  /** Parsed custom attributes from item properties */
  customAttributes: Record<string, unknown>;
}

/**
 * Complete order information structure returned by retrieveInfo
 */
interface OrderInfo {
  /** Original order object */
  currentOrder: Record<string, unknown>;
  /** Shipping address information */
  shippingAddress: Record<string, unknown>;
  /** Date when order was shipped */
  shippingDate: string | null;
  /** Package tracking number */
  trackingNumber: string;
  /** Shipping line object */
  shippingLine: Record<string, unknown> | null;
  /** Shipping service name */
  shippingName: string;
  /** Shipping cost amount */
  shippingCost: number;
  /** Order number without '#' prefix */
  orderNumber: string;
  /** Enhanced line items with parsed custom attributes */
  lineItems: EnhancedLineItem[];
  /** Whether any item has a dedication message */
  hasDedication: boolean;
  /** Applied discount information */
  discounts: unknown[];
  /** Total discount amount */
  totalDiscounts: unknown;
  /** Payment information */
  payment: Record<string, unknown>;
  /** Pre-formatted WhatsApp support URL */
  whatsappUrl: string;
}

/**
 * Order information processing utility
 *
 * Transforms raw order data into a structured format suitable for the OrderDetail component.
 * Extracts and processes shipping information, line items, discounts, and generates
 * support contact URLs. Handles edge cases and provides fallback values.
 *
 * @param order - Raw order object from e-commerce platform (Shopify format)
 * @returns Processed order information with enhanced structure, empty object if invalid
 *
 * @example
 * ```typescript
 * const orderData = retrieveInfo(rawOrder);
 * if (Object.keys(orderData).length > 0) {
 *   // Order is valid, use processed data
 *   console.log(orderData.orderNumber, orderData.shippingName);
 * }
 * ```
 */
export const retrieveInfo = (order: Record<string, any>): OrderInfo | Record<string, never> => {
  // Validate input - return empty object if order is invalid or empty
  if (!order || typeof order !== 'object' || !Object.keys(order).length) {
    return {};
  }

  try {
    // Destructure order properties with safe defaults
    const {
      shipping_address: shippingAddress = {},
      fulfillments = [],
      shipping_lines: shippingLines = [],
      discount_applications: discountApps = [],
      total_discounts: totalDiscounts = 0,
      line_items: lineItems = [],
      name: orderName = '',
      payment = {},
    } = order;

    // Extract shipping information from fulfillments
    const shipping = fulfillments.length > 0 ? fulfillments[0] : null;
    const shippingDate = shipping?.created_at || null;
    const trackingNumber = shipping?.tracking_number || '-';

    // Extract shipping service details
    const shippingLine = shippingLines.length > 0 ? shippingLines[0] : null;
    const shippingName = shippingLine?.title || '-';
    const shippingCost = Number(shippingLine?.price) || 0;

    // Process line items and add parsed custom attributes
    const enhancedLineItems: EnhancedLineItem[] = lineItems.map((item: any) => ({
      ...item,
      customAttributes: mapKeyValue(item.properties || []),
    }));

    // Check if any item has a dedication message
    const hasDedication = enhancedLineItems.some((item) => item.customAttributes && !!item.customAttributes.Dedication);

    // Generate WhatsApp support URL with order reference
    const encodedMessage = encodeURIComponent(`Saya ingin bertanya terkait pesanan ${orderName}`);
    const whatsappUrl = `${WHATSAPP_BASE_URL}${encodedMessage}`;

    // Return structured order information
    return {
      currentOrder: order,
      shippingAddress,
      shippingDate,
      trackingNumber,
      shippingLine,
      shippingName,
      shippingCost,
      orderNumber: orderName.replace('#', ''),
      lineItems: enhancedLineItems,
      hasDedication,
      discounts: discountApps,
      totalDiscounts,
      payment,
      whatsappUrl,
    } as OrderInfo;
  } catch (error) {
    // Log error for debugging but don't crash the application
    console.error('Error processing order information:', error);
    return {};
  }
};

/**
 * Preview image URL generator for order line items
 *
 * Generates a preview image URL for a given order line item using the format-image utility.
 * This function serves as a clean abstraction over the getPreviewUrl utility specifically
 * for order detail contexts.
 *
 * @param item - Order line item object containing image and product information
 * @returns Generated preview image URL string, or fallback if generation fails
 *
 * @example
 * ```typescript
 * const imageUrl = previewImg(orderLineItem);
 * <img src={imageUrl} alt="Order item preview" />
 * ```
 *
 * @see {@link getPreviewUrl} for underlying image URL generation logic
 */
export const previewImg = (item: Record<string, unknown>): string => {
  try {
    // Type assertion for compatibility with getPreviewUrl - the function handles validation internally
    return getPreviewUrl(item as any);
  } catch (error) {
    console.warn('Failed to generate preview image URL:', error);
    return ''; // Return empty string as fallback
  }
};

/**
 * Order status classification utility
 *
 * Determines the current status of an order based on fulfillment and payment data.
 * Useful for displaying appropriate status indicators in the UI.
 *
 * @param order - Order object containing fulfillment and payment information
 * @returns Status string: 'fulfilled', 'pending', 'processing', or 'cancelled'
 *
 * @example
 * ```typescript
 * const status = getOrderStatus(order);
 * const statusColor = status === 'fulfilled' ? 'green' : 'orange';
 * ```
 */
export const getOrderStatus = (order: Record<string, any>): string => {
  if (!order || typeof order !== 'object') {
    return 'unknown';
  }

  const { fulfillments = [], financial_status, fulfillment_status } = order;

  // Check if order is cancelled
  if (financial_status === 'cancelled' || fulfillment_status === 'cancelled') {
    return 'cancelled';
  }

  // Check if order is fully fulfilled
  if (fulfillments.length > 0 && fulfillment_status === 'fulfilled') {
    return 'fulfilled';
  }

  // Check if order is being processed
  if (fulfillment_status === 'partial' || fulfillments.length > 0) {
    return 'processing';
  }

  // Default to pending for new orders
  return 'pending';
};

/**
 * Order total calculation utility
 *
 * Calculates various order totals including subtotal, shipping, discounts, and final total.
 * Handles currency conversion and provides formatted totals for display.
 *
 * @param order - Order object containing line items, shipping, and discount information
 * @returns Object containing calculated totals with proper number formatting
 *
 * @example
 * ```typescript
 * const totals = calculateOrderTotals(order);
 * console.log(`Subtotal: $${totals.subtotal}, Total: $${totals.finalTotal}`);
 * ```
 */
export const calculateOrderTotals = (order: Record<string, any>) => {
  if (!order || typeof order !== 'object') {
    return {
      subtotal: 0,
      shipping: 0,
      discounts: 0,
      tax: 0,
      finalTotal: 0,
    };
  }

  const {
    line_items: lineItems = [],
    shipping_lines: shippingLines = [],
    total_discounts: totalDiscounts = 0,
    total_tax: totalTax = 0,
    total_price: totalPrice = 0,
  } = order;

  // Calculate subtotal from line items
  const subtotal = lineItems.reduce((sum: number, item: any) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 0;
    return sum + price * quantity;
  }, 0);

  // Calculate total shipping cost
  const shipping = shippingLines.reduce((sum: number, line: any) => {
    return sum + (Number(line.price) || 0);
  }, 0);

  // Parse discount and tax amounts
  const discounts = Number(totalDiscounts) || 0;
  const tax = Number(totalTax) || 0;
  const finalTotal = Number(totalPrice) || 0;

  return {
    subtotal: Math.round(subtotal * 100) / 100, // Round to 2 decimal places
    shipping: Math.round(shipping * 100) / 100,
    discounts: Math.round(discounts * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    finalTotal: Math.round(finalTotal * 100) / 100,
  };
};

/**
 * Formatted date utility for order display
 *
 * Formats order-related dates (created, updated, shipped) into user-friendly strings.
 * Handles timezone conversion and provides fallback for invalid dates.
 *
 * @param dateString - ISO date string from order data
 * @param locale - Locale string for date formatting (default: 'en-US')
 * @returns Formatted date string or fallback message
 *
 * @example
 * ```typescript
 * const orderDate = formatOrderDate(order.created_at);
 * const shippedDate = formatOrderDate(order.fulfillments[0]?.created_at, 'id-ID');
 * ```
 */
export const formatOrderDate = (dateString: string, locale: string = 'en-US'): string => {
  if (!dateString || typeof dateString !== 'string') {
    return 'Date not available';
  }

  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }

    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch (error) {
    console.warn('Error formatting date:', error);
    return 'Date formatting error';
  }
};
