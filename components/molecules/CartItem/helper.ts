import { getPreviewUrl } from 'lib/format-image';

export const previewImg = (attributes) => getPreviewUrl(attributes);

export const updateQuantity = (props, quantity) => {
  const { id, customAttributes } = props;
  props.updateCart({ id, quantity, ...customAttributes });
};
