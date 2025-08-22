import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import { useEffect, Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import DefaultLayout from 'components/layouts/Default';
import { withTranslation, Router } from 'i18n';
import * as gtag from 'lib/gtag';

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

const PreviewDesktop = (props: any): any => {
  const cart = useSelector((state: any) => state.cart);
  const users = useSelector((state: any) => state.users);
  const master = useSelector((state: any) => state.master);
  // const [enableLazy, setEnableLazy] = useState(true);
  const methods = useForm({ mode: 'onChange' });
  const [showModal, setShowModal] = useState(false);
  const [tempData, setTempData] = useState(null);
  const { register, handleSubmit, errors, formState, watch } = methods;
  const selected = cart.selected || dummySelected || {};
  const addToCart = (cart) => {
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
        isLoggedIn: users.isLoggedIn,
      });
      props.thunkAddToCart(cart);
    }
  };
  const onSubmit = (data) => {
    if (!selected) {
      Router.replace('/create');
      return;
    }
    const cart = { ...selected, ...data };
    if (!users.isLoggedIn) {
      setTempData(cart);
      setShowModal(true);
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
      showError(props.t('form:form-error'));
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
  const bookPages = master.bookPages;
  return (
    <DefaultLayout {...props}>
      <div className="u-container u-container__page">
        <Stepper step={1} totalSteps={2} title={props.t('book-preferences')} />
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
                  <h2>{props.t('book-specs')}</h2>
                  <div className="c-preview__details__content">
                    <div className="c-preview__details__item">
                      <span className="icon-ico_verified" /> {props.t('book-specs-1')}
                    </div>
                    <div className="c-preview__details__item">
                      <span className="icon-ico_premium_account" /> {props.t('book-specs-2')}
                    </div>
                    <div className="c-preview__details__item">
                      <span className="icon-ico_book" /> {props.t('book-specs-3')}
                    </div>
                    <div className="c-preview__details__item">
                      <span className="icon-gift" /> {props.t('manufacturing-time')}
                    </div>
                  </div>
                </div>
                <div className="c-preview__details--right">
                  <div className="c-preview__cover">
                    <FieldCover schema={schema(props).cover} errors={errors.Cover} register={register} />
                  </div>
                  <Button type="submit" width="320px">
                    {props.t('form:continue-order-button')}
                  </Button>
                </div>
              </div>
            </form>
          </Card>
        </div>
      </div>
      <Modal
        title={props.t('guest-order-title')}
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
        actions={
          <Fragment>
            <Button width="100%" onClick={() => saveToCookies(tempData)} style={{ marginBottom: 12 }}>
              {props.t('login')}
            </Button>
            <Button width="100%" onClick={() => continueAsGuest()} variant="outline" color="black">
              {props.t('continue-guest')}
            </Button>
          </Fragment>
        }
        content={props.t('guest-order-info')}
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

export default withTranslation(['common', 'form'])(PreviewDesktop);
