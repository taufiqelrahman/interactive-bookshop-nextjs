import { toast } from 'react-toastify';

export const schema = props => ({
  occupations: {
    required: { value: true, message: props.t('occupations-invalid') },
    validate: value => value.length === 3 || props.t('occupations-invalid'),
  },
  name: {
    required: { value: true, message: `${props.t('nickname-label')} ${props.t('required-error')}` },
    maxLength: { value: 10, message: `${props.t('nickname-label')} ${props.t('less-than-error')} 10` },
    validate: value => !value.includes(' ') || `${props.t('nickname-label')} ${props.t('space-error')}`,
  },
  age: { required: { value: true, message: `${props.t('age-label')} ${props.t('required-error')}` } },
  // dob: { required: false },
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

export const previewImg = (data, watch, isMobile = false) => {
  const filePath = `/static/images/child${isMobile ? '-sm' : ''}`;
  const { Gender, Age, Skin, Hair } = data;
  const pickedGender = watch('Gender') || Gender || 'boy';
  const pickedAge = watch('Age') || Age || 'kid';
  const pickedSkin = watch('Skin') || Skin || 'light';
  let pickedHair = watch('Hair') || Hair || 'short';
  if ((pickedHair === 'hijab' && pickedGender === 'boy') || (pickedHair === 'curly' && pickedGender === 'girl')) {
    pickedHair = 'short';
  }
  return `${filePath}/${pickedGender}/${pickedAge}/${pickedHair}/${pickedSkin}.png`;
};

export const getJobIds = (names, list) => {
  return names.map(job => {
    return list.find(occ => occ.name === job).id;
  });
};

export const loadImg = source => {
  const image: any = document.getElementById('preview-char');
  if (!image) return;
  image.src = '/static/images/empty.png';
  const downloadingImage = new Image();
  downloadingImage.onload = function downloadingImage() {
    image.src = (this as any).src;
  };
  downloadingImage.src = source;
};

export const addDedicationToLS = (dedication: string) => {
  localStorage.setItem('dedication', JSON.stringify(dedication));
};

export const retrieveDedication = () => {
  const dedicationFromLs = localStorage.getItem('dedication');
  if (!dedicationFromLs) return '';
  return JSON.parse(dedicationFromLs);
};
