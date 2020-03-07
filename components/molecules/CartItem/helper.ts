export const previewImg = attributes => {
  const filePath = '/static/images/preview/child';
  const { gender, age, skin, hair } = attributes;
  return `${filePath}/${gender}_${age}_${skin}_${hair}.JPG`;
};

export const updateShopify = () => {
  console.log('updated');
};
