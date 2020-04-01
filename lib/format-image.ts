export const getPreviewUrl = attributes => {
  const filePath = '/static/images/preview/child';
  const { Gender, Age, Skin, Hair } = attributes;
  return `${filePath}/${Gender}_${Age}_${Skin}_${Hair}.JPG`;
};

export default { getPreviewUrl };
