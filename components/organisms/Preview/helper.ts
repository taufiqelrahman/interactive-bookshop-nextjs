import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { Router } from 'i18n';
import { CartItem } from 'store/cart/types';
import { PropsFromRedux } from 'lib/with-redux-store';
import { WithTranslation } from 'next-i18next';
import * as gtag from 'lib/gtag';
import { Product } from 'store/products/types';

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

export interface Props extends PropsFromRedux, WithTranslation {}

const trxCookieName = 'pendingTrx';
export const getFromCookies = (props: Props): void => {
  /**
   * Load pending transaction from cookies
   */
  if (!Cookies.get(trxCookieName)) return;
  const cookies = JSON.parse(Cookies.get(trxCookieName) || '');
  props.saveSelected(cookies);
  Cookies.remove(trxCookieName);
};

export const saveToCookies = (cart: CartItem | null): void => {
  /**
   * Save pending transaction
   */
  Cookies.set(trxCookieName, JSON.stringify(cart));
  Router.push('/login?from=preview');
};

export const addToCart = (cart: Product, selected: any, props: Props) => {
  if (selected.id) {
    props.thunkUpdateCart(cart);
  } else {
    gtag.event({
      action: 'click_create',
      category: 'engagement',
      label: '/preview',
    });
    gtag.event({
      action: 'add_to_cart',
      category: 'ecommerce',
      label: 'desktop',
    });
    (window as any).fbq('track', 'AddToCart', {
      cartItem: cart,
      isLoggedIn: props.state.users.isLoggedIn,
    });
    props.thunkAddToCart(cart);
  }
};
