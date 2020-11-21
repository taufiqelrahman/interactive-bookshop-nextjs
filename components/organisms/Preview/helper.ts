import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { Router } from 'i18n';
import { CartItem } from 'store/cart/types';

export interface FormData {
  Cover: string;
}

export const schema = (props: any) => ({
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

export const showError = (error: string): void => {
  window.scrollTo(0, 0);
  toast.error(error);
};

export const getFromCookies = (): CartItem | null => {
  if (!Cookies.get('pendingTrx')) return null;
  return JSON.parse(Cookies.get('pendingTrx') || '');
};

export const saveToCookies = (cart: CartItem | null): void => {
  // save pending trx
  Cookies.set('pendingTrx', JSON.stringify(cart));
  Router.push('/login?from=preview');
};
