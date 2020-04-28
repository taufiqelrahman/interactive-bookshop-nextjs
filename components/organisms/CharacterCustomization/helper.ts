import { toast } from 'react-toastify';

export const schema = props => ({
  occupations: {
    required: { value: true, message: `${props.t('occupations-label')} ${props.t('required-error')}` },
    validate: value => value.length === 3 || props.t('occupations-invalid'),
  },
  name: { required: { value: true, message: `${props.t('name-label')} ${props.t('required-error')}` } },
  age: { required: { value: true, message: `${props.t('age-label')} ${props.t('required-error')}` } },
  dob: { required: { value: true, message: `${props.t('dob-label')} ${props.t('required-error')}` } },
  gender: { required: { value: true, message: `${props.t('gender-label')} ${props.t('required-error')}` } },
  hair: { required: { value: true, message: `${props.t('hair-label')} ${props.t('required-error')}` } },
  skin: { required: { value: true, message: `${props.t('skin-label')} ${props.t('required-error')}` } },
  language: { required: { value: true, message: `${props.t('language-label')} ${props.t('required-error')}` } },
  dedication: { required: false },
});

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
  const filePath = '/static/images/child';
  const { Gender, Age, Skin, Hair } = data;
  const pickedGender = watch('Gender') || Gender || 'boy';
  const pickedAge = watch('Age') || Age || 'kid';
  const pickedSkin = watch('Skin') || Skin || 'light';
  const pickedHair = watch('Hair') || Hair || 'short';
  return `${filePath}/${pickedGender}/${pickedAge}/${pickedHair}/${pickedSkin}.png`;
};

export const getJobIds = (names, list) => {
  return names.map(job => {
    return list.find(occ => occ.name === job).id;
  });
};
