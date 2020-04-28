export const getPreviewUrl = attributes => {
  const filePath = '/static/images/child';
  const { Gender, Age, Skin, Hair } = attributes;
  return `${filePath}/${Gender}_${Age}_${Skin}_${Hair}.JPG`;
};

export default { getPreviewUrl };
