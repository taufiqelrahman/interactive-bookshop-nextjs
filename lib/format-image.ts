export const getPreviewUrl = attributes => {
  const filePath = '/static/images/child';
  const { Gender, Age, Skin, Hair } = attributes;
  return `${filePath}/${Gender}/${Age}/${Hair}/${Skin}.png`;
};

export default { getPreviewUrl };
