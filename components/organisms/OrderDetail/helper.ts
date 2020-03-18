export const retrieveInfo = order => {
  const currentOrder = order;
  const { shipping_address: shippingAddress, state, fulfillments, shipping_lines: shippingLines } = currentOrder;
  const orderState = state && state.name;
  const shipping = fulfillments.length > 0 ? fulfillments[0] : null;
  const shippingDate = shipping ? shipping.created_at : null;
  const trackingNumber = shipping ? shipping.tracking_number : '';
  const shippingLine = shippingLines.length > 0 ? shippingLines[0] : null;
  const shippingName = shippingLine ? shippingLine.title : '';
  const shippingCost = shippingLine ? shippingLine.price : 0;
  const orderNumber = currentOrder.name.replace('#', '');
  return {
    currentOrder,
    shippingAddress,
    orderState,
    shippingDate,
    trackingNumber,
    shippingLine,
    shippingName,
    shippingCost,
    orderNumber,
  };
};

export const previewImg = item => {
  const filePath = '/static/images/preview/child';
  const { gender, age, skin, hair } = item;
  return `${filePath}/${gender}/${age}_${skin}_${hair}.JPG`;
};
