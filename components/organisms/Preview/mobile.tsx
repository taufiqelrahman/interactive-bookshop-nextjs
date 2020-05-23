import { withTranslation, Router } from 'i18n';
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
      (window as any).fbq('track', 'AddToCart');
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
          <div className="c-preview__cover">
            <FieldCover schema={schema(props).cover} register={register} errors={errors.cover} />
          </div>
          <Button type="submit" width="648px" style={{ margin: '12px 0 18px' }}>
            {selected.id ? props.t('update-cart') : props.t('form:continue-button')}
          </Button>
          <div className="c-preview__link" onClick={() => Router.back()}>
            {props.t('go-back')}
          </div>
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
      <style jsx>{`
        .c-preview {
          @apply flex flex-col justify-between;
          &__tab {
            border-top: 1px solid #efeef4;
            border-radius: 24px 24px 0px 0px;
            padding-top: 20px;
          }
          &__cover {
            @apply flex justify-center;
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
        }
      `}</style>
    </DefaultLayout>
  );
};

export default withTranslation(['common', 'form'])(PreviewMobile);
