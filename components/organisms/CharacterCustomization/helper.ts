import { toast } from 'react-toastify';

export const schema = {
  occupations: {
    required: true,
    validate: value => value.length === 3,
  },
  name: { required: true },
  age: { required: true },
  dob: { required: true },
  gender: { required: true },
  hair: { required: true },
  skin: { required: true },
  language: { required: true },
  dedication: { required: false },
};

export const showError = error => {
  window.scrollTo(0, 0);
  toast.error(error);
};

export const dummy = {
  name: 'asd',
  age: 'Toddler',
  occupations: ['4', '5', '6'],
};

export const previewImg = (data, watch) => {
  const filePath = '/static/images/preview/child';
  const { Gender, Age, Skin, Hair } = data;
  const pickedGender = watch('Gender') || Gender || 'boy';
  const pickedAge = watch('Age') || Age || 'kid';
  const pickedSkin = watch('Skin') || Skin || 'light';
  const pickedHair = watch('Hair') || Hair || 'short';
  return `${filePath}/${pickedGender}_${pickedAge}_${pickedSkin}_${pickedHair}.JPG`;
};
