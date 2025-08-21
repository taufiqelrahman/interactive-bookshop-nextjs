import { getPreviewUrl } from 'lib/format-image';

export const previewImg = (item) => {
  if (!item.customAttributes) return '';
  return getPreviewUrl(item.customAttributes);
};
