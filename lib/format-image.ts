export const getPreviewUrl = (attributes) => {
  const filePath = '/static/images/child';
  const { Gender, Age, Skin, Hair } = attributes;
  return `${filePath}/${Gender || 'boy'}/${Age || 'kid'}/${Hair || 'short'}/${Skin || 'light'}.png`;
};

const formatImage = { getPreviewUrl };

export default formatImage;
