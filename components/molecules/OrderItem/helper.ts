import { getPreviewUrl } from 'lib/format-image';
import { Order } from 'store/orders/types';

export const previewImg = (item: Order) => {
  if (!item.customAttributes) return '';
  return getPreviewUrl(item.customAttributes);
};
