import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

type TranslateFn = (key: string) => string;

export const schema = (t: TranslateFn) => ({
  cover: {
    required: {
      value: true,
      message: `${t('cover-label')} ${t('form:required-error')}`,
    },
  },
});

export interface DummySelected {
  age: string;
  dedication: string;
  dob: string;
  gender: string;
  hair: string;
  languange: string;
  name: string;
  occupations: string[];
  skin: string;
}

export const dummySelected: DummySelected = {
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

export const showError = (error: string) => {
  window.scrollTo(0, 0);
  toast.error(error);
};

export const getFromCookies = (): unknown | null => {
  const cookie = Cookies.get('pendingTrx');
  if (!cookie) return null;
  return JSON.parse(cookie);
};
