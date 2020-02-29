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
