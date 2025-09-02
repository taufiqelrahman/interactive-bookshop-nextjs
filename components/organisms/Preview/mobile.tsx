import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import DefaultLayout from 'components/layouts/Default';
import NavBar from 'components/organisms/NavBar/mobile';
import * as gtag from 'lib/gtag';
import actions from 'store/actions';

import { dummySelected, schema, showError, saveToCookies, getFromCookies } from './helper';

// import BookPreview from 'components/BookPreview';
// import Sheet from 'components/atoms/Sheet';
// import Button from 'components/atoms/Button';
// import FieldCover from 'components/molecules/FieldCover';

const Button = dynamic(() => import('components/atoms/Button'));
const FieldCover = dynamic(() => import('components/molecules/FieldCover'));
const BookPreview = dynamic(() => import('components/BookPreview'), { ssr: false });
const Sheet = dynamic(() => import('components/atoms/Sheet'));

const PreviewMobile = (props: any): any => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart);
  const users = useSelector((state: any) => state.users);
  const master = useSelector((state: any) => state.master);
  // const [enableLazy, setEnableLazy] = useState(true);
  const [showSheet, setShowSheet] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);
  const [tempData, setTempData] = useState(null);
  const methods = useForm({ mode: 'onChange' });
  const { register, handleSubmit, errors, formState, watch } = methods;
  const selected = cart.selected || dummySelected || {};
  const addToCart = (cart) => {
    if (selected.id) {
      dispatch(actions.thunkUpdateCart(cart));
    } else {
      gtag.event({
        action: 'click_create',
        category: 'engagement',
        label: '/preview',
      });
      gtag.event({
        action: 'add_to_cart',
        category: 'ecommerce',
        label: 'mobile',
      });
      (window as any).fbq('track', 'AddToCart', {
        cartItem: cart,
        isLoggedIn: users.isLoggedIn,
      });
      dispatch(actions.thunkAddToCart(cart));
    }
  };
  const onSubmit = (data) => {
    if (!selected) {
      router.replace('/create');
      return;
    }
    const cart = { ...selected, ...data };
    if (!users.isLoggedIn) {
      setTempData(cart);
      setShowSheet(true);
      // saveToCookies(cart);
      return;
    }
    addToCart(cart);
  };
  const continueAsGuest = () => {
    addToCart(tempData);
  };
  useEffect(() => {
    if (!formState.isValid) {
      showError(t('form:form-error'));
    }
  }, [errors]);
  useEffect(() => {
    const fromCookies = getFromCookies();
    if (fromCookies) {
      props.saveSelected(fromCookies);
      Cookies.remove('pendingTrx');
      // setEnableLazy(false);
    }
  }, []);
  const screenHeight = '100vh - 69px';
  const bookPages = master.bookPages;
  // const dontHaveCart = !users.user.cart;
  return (
    <DefaultLayout {...props} navbar={<NavBar isSteps={true} title={t('book-preferences')} step={2} totalSteps={2} />}>
      <div className="c-preview" style={{ height: `calc(${screenHeight})` }}>
        <BookPreview
          selected={selected || {}}
          isMobile={props.isMobile}
          bookPages={bookPages}
          cover={watch('Cover')}
          // enableLazy={enableLazy}
        />
        <form className="c-preview__tab u-container" onSubmit={handleSubmit(onSubmit)}>
          <div className="c-preview__specs" onClick={() => setShowSpecs(true)}>
            <div>{t('book-specs')}</div>
            <span className="icon-chevron_right" />
          </div>
          <div className="c-preview__cover">
            <FieldCover schema={schema(t).cover} register={register} errors={errors.Cover} />
          </div>
          <Button type="submit" width="648px" style={{ margin: '12px 0 18px' }}>
            {t('form:continue-button')}
          </Button>
        </form>
      </div>
      <Sheet
        name="guest-sheet"
        isOpen={showSheet}
        closeSheet={() => setShowSheet(false)}
        content={
          <Fragment>
            <h1 className="c-preview__sheet__title">{t('guest-order-title')}</h1>
            <div className="c-preview__sheet__content">{t('guest-order-info')}</div>
          </Fragment>
        }
        actions={
          <Fragment>
            <Button width="100%" onClick={() => saveToCookies(tempData)} style={{ marginBottom: 12 }}>
              {t('login')}
            </Button>
            <Button width="100%" onClick={() => continueAsGuest()} variant="outline" color="black">
              {t('continue-guest')}
            </Button>
          </Fragment>
        }
      />
      <Sheet
        name="specs-sheet"
        isOpen={showSpecs}
        closeSheet={() => setShowSpecs(false)}
        content={
          <div className="c-sheet__content">
            <div className="c-sheet__content__item">
              <span className="icon-ico_verified" /> {t('book-specs-1')}
            </div>
            <div className="c-sheet__content__item">
              <span className="icon-ico_premium_account" /> {t('book-specs-2')}
            </div>
            <div className="c-sheet__content__item">
              <span className="icon-ico_book" /> {t('book-specs-3')}
            </div>
            <div className="c-sheet__content__item">
              <span className="icon-gift" /> {t('manufacturing-time')}
            </div>
          </div>
        }
        header={true}
        title={t(`book-specs`)}
      />
      <style jsx>{`
        .c-preview {
          @apply flex flex-col justify-between;
          &__tab {
            border-top: 1px solid #efeef4;
            border-radius: 24px 24px 0px 0px;
            padding-top: 20px;
          }
          &__cover {
            @apply flex;
          }
          &__link {
            @apply cursor-pointer text-center text-sm font-semibold;
            color: #445ca4;
            margin-bottom: 18px;
          }
          &__sheet {
            &__title {
              @apply font-semibold;
              font-size: 27px;
              line-height: 32px;
            }
            &__content {
              @apply font-opensans text-sm;
              line-height: 20px;
              margin-top: 12px;
            }
          }
          &__specs {
            @apply mb-6 flex cursor-pointer items-center justify-between font-opensans text-sm;
            box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.12);
            border-radius: 4px;
            padding: 12px;
            div {
              line-height: 19px;
            }
            span {
              @apply text-xl;
            }
          }
        }
      `}</style>
      <style jsx global>{`
        .c-sheet__content {
          @apply font-opensans text-sm;
          line-height: 22px;
          padding-top: 16px;
          padding-bottom: 16px;
          &__item {
            @apply mb-2 flex;
            align-items: baseline;
            span {
              @apply mr-3;
            }
          }
        }
      `}</style>
    </DefaultLayout>
  );
};

export default PreviewMobile;
