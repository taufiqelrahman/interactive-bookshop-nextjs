import { withTranslation, Router } from 'i18n';
import DefaultLayout from 'components/layouts/Default';
import Button from 'components/atoms/Button';
import FieldCover from 'components/molecules/FieldCover';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import BookPreview from 'components/BookPreview';
import { dummySelected, schema, showError, saveToCookies, getFromCookies } from './helper';
import NavBar from '../NavBar/mobile';
import Cookies from 'js-cookie';
import { forceVisible } from 'react-lazyload';

const PreviewMobile = (props: any): any => {
  const methods = useForm({ mode: 'onChange' });
  const { register, handleSubmit, errors, formState, watch } = methods;
  const onSubmit = data => {
    const { selected } = props.state.cart;
    const cart = { ...selected, ...data };
    if (!props.state.users.isLoggedIn) {
      saveToCookies(cart);
      return;
    }
    if (selected.id) {
      props.thunkUpdateCart(cart);
    } else {
      props.thunkAddToCart(cart);
    }
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
      forceVisible();
      Cookies.remove('pendingTrx');
    }
  }, []);
  const selected = props.state.cart.selected || dummySelected || {};
  const screenHeight = '100vh - 69px';
  const bookPages = props.state.master.bookPages;
  // const dontHaveCart = !props.state.users.user.cart;
  return (
    <DefaultLayout
      {...props}
      navbar={<NavBar isSteps={true} title={props.t('book-preferences')} step={2} totalSteps={2} />}
    >
      <div className="c-preview" style={{ height: `calc(${screenHeight})` }}>
        <BookPreview selected={selected || {}} isMobile={props.isMobile} bookPages={bookPages} cover={watch('Cover')} />
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
        }
      `}</style>
    </DefaultLayout>
  );
};

export default withTranslation(['common', 'form'])(PreviewMobile);
