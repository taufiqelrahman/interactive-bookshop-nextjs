import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { Router } from 'i18n';
import { PropsFromRedux } from 'lib/with-redux-store';
import { WithTranslation } from 'next-i18next';
import { CartItem } from 'store/cart/types';

export interface PreviewProps extends WithTranslation, PropsFromRedux {
  isMobile: boolean;
}
export const schema = (props: PreviewProps) => ({
  cover: {
    required: {
      value: true,
      message: `${props.t('cover-label')} ${props.t('form:required-error')}`,
    },
  },
});

export const showError = (error: string) => {
  window.scrollTo(0, 0);
  toast.error(error);
};

export const getFromCookies = () => {
  if (!Cookies.get('pendingTrx')) return null;
  return JSON.parse(Cookies.get('pendingTrx') || '');
};

export const saveToCookies = (cart: CartItem) => {
  // save pending trx
  Cookies.set('pendingTrx', JSON.stringify(cart));
  Router.push('/login?from=preview');
};
