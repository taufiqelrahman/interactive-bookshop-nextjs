export const previewImg = item => {
  const filePath = '/static/images/preview/child';
  const { gender, age, skin, hair } = item;
  return `${filePath}/${gender}_${age}_${skin}_${hair}.JPG`;
};
