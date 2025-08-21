import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

import { Router } from 'i18n';

export const schema = (props) => ({
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

export const showError = (error) => {
  window.scrollTo(0, 0);
  toast.error(error);
};

export const getFromCookies = () => {
  if (!Cookies.get('pendingTrx')) return null;
  return JSON.parse(Cookies.get('pendingTrx') || '');
};

export const saveToCookies = (cart) => {
  // save pending trx
  Cookies.set('pendingTrx', JSON.stringify(cart));
  Router.push('/login?from=preview');
};
