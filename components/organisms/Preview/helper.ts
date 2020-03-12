import { toast } from 'react-toastify';

export const schema = props => ({
  cover: {
    required: {
      value: true,
      message: `${props.t('cover-label')} ${props.t('form:required-error')}`,
    },
  },
});

export const dummySelected = {
  age: 'Kid',
  dedication: '',
  dob: '05-01-2019',
  gender: 'girl',
  hair: 'hair',
  languange: 'English',
  name: 'asd',
  occupations: ['astronaut', 'doctor', 'nurse'],
  skin: 'light',
};

export const showError = error => {
  window.scrollTo(0, 0);
  toast.error(error);
};
