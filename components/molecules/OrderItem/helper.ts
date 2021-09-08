import { getPreviewUrl } from 'lib/format-image';
import { WithTranslation } from 'next-i18next';
import { CSSProperties } from 'react';
import { LineItem, Order } from 'store/orders/types';

export const previewImg = (item: LineItem) => {
  if (!item.customAttributes) return '';
  return getPreviewUrl(item.customAttributes);
};

export interface OrderItemProps extends WithTranslation, Order {
  isMobile?: boolean;
  isSkeleton: boolean;
  style: CSSProperties;
}
