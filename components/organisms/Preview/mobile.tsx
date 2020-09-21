import { withTranslation } from 'i18n';
import DefaultLayout from 'components/layouts/Default';
import Button from 'components/atoms/Button';
import FieldCover from 'components/molecules/FieldCover';
import { useForm } from 'react-hook-form';
import { useEffect, Fragment, useState } from 'react';
import BookPreview from 'components/BookPreview';
import { dummySelected, schema, showError, saveToCookies, getFromCookies } from './helper';
import NavBar from '../NavBar/mobile';
import Cookies from 'js-cookie';
import Sheet from 'components/atoms/Sheet';
import * as gtag from 'lib/gtag';

const PreviewMobile = (props: any): any => {
  // const [enableLazy, setEnableLazy] = useState(true);
  const [showSheet, setShowSheet] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);
  const [tempData, setTempData] = useState(null);
  const methods = useForm({ mode: 'onChange' });
  const { register, handleSubmit, errors, formState, watch } = methods;
  const selected = props.state.cart.selected || dummySelected || {};
  const addToCart = cart => {
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
        label: 'mobile',
      });
      (window as any).fbq('track', 'AddToCart', {
        cartItem: cart,
        isLoggedIn: props.state.users.isLoggedIn,
      });
      props.thunkAddToCart(cart);
    }
  };
  const onSubmit = data => {
    const cart = { ...selected, ...data };
    if (!props.state.users.isLoggedIn) {
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
  const screenHeight = '100vh - 69px';
  const bookPages = props.state.master.bookPages;
  // const dontHaveCart = !props.state.users.user.cart;
  return (
    <DefaultLayout
      {...props}
      navbar={<NavBar isSteps={true} title={props.t('book-preferences')} step={2} totalSteps={2} />}
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
            <div>{props.t('book-specs')}</div>
            <span className="icon-chevron_right" />
          </div>
          <div className="c-preview__cover">
            <FieldCover schema={schema(props).cover} register={register} errors={errors.cover} />
          </div>
          <Button type="submit" width="648px" style={{ margin: '12px 0 18px' }}>
            {selected.id ? props.t('update-cart') : props.t('form:continue-button')}
          </Button>
        </form>
      </div>
      <Sheet
        name="guest-sheet"
        isOpen={showSheet}
        closeSheet={() => setShowSheet(false)}
        content={
          <Fragment>
            <h1 className="c-preview__sheet__title">{props.t('guest-order-title')}</h1>
            <div className="c-preview__sheet__content">{props.t('guest-order-info')}</div>
          </Fragment>
        }
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
      />
      <Sheet
        name="specs-sheet"
        isOpen={showSpecs}
        closeSheet={() => setShowSpecs(false)}
        content={
          <div className="c-sheet__content">
            <div className="c-sheet__content__item">
              <span className="icon-ico_verified" /> {props.t('book-specs-1')}
            </div>
            <div className="c-sheet__content__item">
              <span className="icon-ico_premium_account" /> {props.t('book-specs-2')}
            </div>
            <div className="c-sheet__content__item">
              <span className="icon-ico_book" /> {props.t('book-specs-3')}
            </div>
          </div>
        }
        header={true}
        title={props.t(`book-specs`)}
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
            @apply font-semibold cursor-pointer text-sm text-center;
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
            @apply flex justify-between mb-6 text-sm items-center font-opensans cursor-pointer;
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

export default withTranslation(['common', 'form'])(PreviewMobile);
