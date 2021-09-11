import { getPreviewUrl } from 'lib/format-image';
import { mapKeyValue } from 'lib/format-array';
import { PropsFromRedux } from 'lib/with-redux-store';
import { WithTranslation } from 'next-i18next';
import { LineItem, Order } from 'store/orders/types';
import { CustomAttributes } from 'store/cart/types';

export interface OrderDetailProps extends WithTranslation, PropsFromRedux {
  isMobile: boolean;
}
export const retrieveInfo = (order: Order) => {
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
  })) as LineItem[];
  const hasDedication = lineItems.some(item => !!item.customAttributes.Dedication);
  const whatsappUrl = `https://wa.me/6287777717119?text=Saya%20ingin%20bertanya%20terkait%20pesanan%20${order.name}`;
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
    whatsappUrl,
  };
};

export const previewImg = (item: CustomAttributes) => getPreviewUrl(item);

export const calculateDays = (createdAt: string) => {
  if (!createdAt) return 0;
  // const createdDate = new Date('2021-02-01T15:07:19+07:00');
  const createdDate = new Date(createdAt);
  const currentDate = new Date();
  let numWorkDays = 0;

  while (createdDate <= currentDate) {
    // Skips Sunday and Saturday
    const dayIndex = createdDate.getDay();
    if (dayIndex !== 0 && dayIndex !== 6) {
      numWorkDays++;
    }
    createdDate.setDate(createdDate.getDate() + 1);
  }
  const daysLeft = 14 - numWorkDays;
  return daysLeft > 0 ? daysLeft : 0;
};
