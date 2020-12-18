import { getPreviewUrl } from 'lib/format-image';
import { Child } from 'store/types';

export const previewImg = (attributes: Child) => getPreviewUrl(attributes);

export const updateQuantity = (props: any, quantity: number) => {
  const { id, customAttributes } = props;
  props.updateCart({ id, quantity, ...customAttributes });
};
