import { getPreviewUrl } from 'lib/format-image';
import { mapKeyValue } from 'lib/format-array';

export const retrieveInfo = order => {
  if (!Object.keys(order).length) return {};
  const {
    shipping_address: shippingAddress,
    fulfillments,
    shipping_lines: shippingLines,
    discount_applications: discountApps,
    total_discounts: totalDiscounts,
  } = order;
  const shipping = fulfillments.length > 0 ? fulfillments[0] : null;
  const shippingDate = shipping ? shipping.created_at : null;
  const trackingNumber = shipping ? shipping.tracking_number : '-';
  const shippingLine = shippingLines.length > 0 ? shippingLines[0] : null;
  const shippingName = shippingLine ? shippingLine.title : '-';
  const shippingCost = shippingLine ? shippingLine.price : 0;
  const lineItems = order.line_items.map(item => ({
    ...item,
    customAttributes: mapKeyValue(item.properties || []),
  }));
  const hasDedication = lineItems.some(item => !!item.customAttributes.Dedication);
  return {
    currentOrder: order,
    shippingAddress,
    shippingDate,
    trackingNumber,
    shippingLine,
    shippingName,
    shippingCost,
    orderNumber: order.name.replace('#', ''),
    lineItems,
    hasDedication,
    discounts: discountApps || [],
    totalDiscounts,
    payment: order.payment || {},
  };
};

export const previewImg = item => getPreviewUrl(item);
