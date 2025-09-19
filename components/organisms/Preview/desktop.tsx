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
import { useResponsive } from 'lib/hooks/useResponsive';
import actions from 'store/actions';

import { dummySelected, schema, showError, saveToCookies, getFromCookies } from './helper';

// import Modal from 'components/atoms/Modal';
// import Button from 'components/atoms/Button';
// import FieldCover from 'components/molecules/FieldCover';
// import BookPreview from 'components/BookPreview';

const Modal = dynamic(() => import('components/atoms/Modal'));
const Stepper = dynamic(() => import('components/atoms/Stepper'));
const Card = dynamic(() => import('components/atoms/Card'));
const Button = dynamic(() => import('components/atoms/Button'));
const FieldCover = dynamic(() => import('components/molecules/FieldCover'));
const BookPreview = dynamic(() => import('components/BookPreview'), { ssr: false });
const Sheet = dynamic(() => import('components/atoms/Sheet'));

const PreviewDesktop = (props: any): any => {
  const { t } = useTranslation('common');
  const { isMobile } = useResponsive();
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector((state: any) => state.cart);
  const users = useSelector((state: any) => state.users);
  const master = useSelector((state: any) => state.master);
  // const [enableLazy, setEnableLazy] = useState(true);
  const methods = useForm({ mode: 'onChange' });

  // desktop only
  const [showModal, setShowModal] = useState(false);

  // mobile only
  const [showSheet, setShowSheet] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);
  const screenHeight = '100vh - 69px';

  const [tempData, setTempData] = useState(null);
  const { register, handleSubmit, errors, formState, watch } = methods;
  const selected = cart.selected || dummySelected || {};
  const addToCart = async (cart) => {
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
        label: 'desktop',
      });
      (window as any).fbq('track', 'AddToCart', {
        cartItem: cart,
        isLoggedIn: users.isLoggedIn,
      });
      await dispatch(actions.thunkAddToCart(cart));
      router.push('/cart');
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
      if (isMobile) {
        setShowSheet(true);
      } else {
        setShowModal(true);
      }
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
      dispatch(actions.saveSelected(fromCookies));
      Cookies.remove('pendingTrx');
      // setEnableLazy(false);
    }
  }, []);
  const bookPages = master.bookPages;

  if (isMobile) {
    return (
      <DefaultLayout
        {...props}
        navbar={<NavBar isSteps={true} title={t('book-preferences')} step={2} totalSteps={2} />}
      >
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
  }

  return (
    <DefaultLayout {...props}>
      <div className="u-container u-container__page">
        <Stepper step={1} totalSteps={2} title={t('book-preferences')} />
        <div className="c-preview">
          <Card variant="border">
            <form className="c-preview__container" onSubmit={handleSubmit(onSubmit)}>
              <div className="c-preview__book">
                <BookPreview
                  selected={selected || {}}
                  bookPages={bookPages}
                  cover={watch('Cover')}
                  // enableLazy={enableLazy}
                />
              </div>
              <div className="c-preview__details">
                <div className="c-preview__details--left">
                  <h2>{t('book-specs')}</h2>
                  <div className="c-preview__details__content">
                    <div className="c-preview__details__item">
                      <span className="icon-ico_verified" /> {t('book-specs-1')}
                    </div>
                    <div className="c-preview__details__item">
                      <span className="icon-ico_premium_account" /> {t('book-specs-2')}
                    </div>
                    <div className="c-preview__details__item">
                      <span className="icon-ico_book" /> {t('book-specs-3')}
                    </div>
                    <div className="c-preview__details__item">
                      <span className="icon-gift" /> {t('manufacturing-time')}
                    </div>
                  </div>
                </div>
                <div className="c-preview__details--right">
                  <div className="c-preview__cover">
                    <FieldCover schema={schema(t).cover} errors={errors.Cover} register={register} />
                  </div>
                  <Button type="submit" width="320px">
                    {t('form:continue-order-button')}
                  </Button>
                </div>
              </div>
            </form>
          </Card>
        </div>
      </div>
      <Modal
        title={t('guest-order-title')}
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
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
        content={t('guest-order-info')}
      />
      <style jsx>{`
        .c-section {
          @apply w-full;
        }
        .c-preview {
          @apply mx-auto w-full;
          margin-top: 30px;
          &__container {
            @apply overflow-hidden;
            padding: 42px 30px 30px;
            text-align: center;
          }
          &__cover {
            @apply flex justify-center;
          }
          &__link {
            @apply cursor-pointer font-semibold;
            color: #445ca4;
            span {
              @apply font-normal;
            }
          }
          &__details {
            @apply flex;
            margin-top: 30px;
            &--left,
            &--right {
              @apply w-1/2;
            }
            &--left {
              @apply text-left;
              padding-right: 32px;
            }
            &--right {
              @apply flex flex-col;
              justify-content: space-evenly;
            }
            h2 {
              @apply font-semibold;
              line-height: 24px;
              margin-bottom: 6px;
            }
            &__content {
              @apply font-opensans;
              line-height: 22px;
            }
            &__item {
              @apply mb-1 flex;
              align-items: baseline;
              span {
                @apply mr-2;
              }
            }
          }
        }
      `}</style>
    </DefaultLayout>
  );
};

export default PreviewDesktop;
