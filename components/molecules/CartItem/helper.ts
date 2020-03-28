export const previewImg = attributes => {
  const filePath = '/static/images/preview/child';
  const { Gender, Age, Skin, Hair } = attributes;
  return `${filePath}/${Gender}_${Age}_${Skin}_${Hair}.JPG`;
};

export const updateQuantity = (props, quantity) => {
  const { id, customAttributes } = props;
  props.updateCart({ id, quantity, ...customAttributes });
};
