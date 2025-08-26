import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

export const schema = (t) => ({
  cover: {
    required: {
      value: true,
      message: `${t('cover-label')} ${t('form:required-error')}`,
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
  // @todo should router.push() outside this function afterwards
  // Router.push('/login?from=preview');
};
