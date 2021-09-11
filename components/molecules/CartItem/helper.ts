import { getPreviewUrl } from 'lib/format-image';
import { WithTranslation } from 'next-i18next';
import { CSSProperties } from 'react';
import { CustomAttributes } from 'store/cart/types';
import { Cart, CartItem as ICartItem } from 'store/cart/types';

export const previewImg = (attributes: CustomAttributes) => getPreviewUrl(attributes);

export const updateQuantity = (props: CartItemProps, quantity: number) => {
  const { id, customAttributes } = props;
  props.updateCart({ id, quantity, ...customAttributes });
};

export interface CartItemProps extends WithTranslation {
  isSkeleton: boolean;
  quantity: ICartItem['quantity'];
  customAttributes: ICartItem['customAttributes'];
  variant: ICartItem['variant'];
  cartId?: Cart['id'];
  id: ICartItem['id'];
  style: CSSProperties;
  saveSelected: (selected: any) => any;
  removeFromCart: (id: any, itemId: any) => any;
  updateCart: (product: any) => any;
}
