import { withTranslation, Router } from 'i18n';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { useEffect, Fragment, useState } from 'react';
import { dummySelected, schema, showError, saveToCookies, getFromCookies, FormData, addToCart } from './helper';
import NavBar from 'components/organisms/NavBar/mobile';
import DefaultLayout from 'components/layouts/Default';
import { PropsFromRedux } from 'lib/with-redux-store';
import { WithTranslation } from 'next-i18next';
import { Product } from 'store/products/types';
// import BookPreview from 'components/BookPreview';
// import Sheet from 'components/atoms/Sheet';
// import Button from 'components/atoms/Button';
// import FieldCover from 'components/molecules/FieldCover';

const Button = dynamic(() => import('components/atoms/Button'));
const FieldCover = dynamic(() => import('components/molecules/FieldCover'));
const BookPreview = dynamic(() => import('components/BookPreview'), { ssr: false });
const Sheet = dynamic(() => import('components/atoms/Sheet'));

interface Props extends PropsFromRedux, WithTranslation {
  isMobile: boolean;
}
const PreviewMobile: React.FC<Props> = (props: Props): any => {
  // const [enableLazy, setEnableLazy] = useState(true);
  const [showSheet, setShowSheet] = useState<boolean>(false);
  const [showSpecs, setShowSpecs] = useState<boolean>(false);
  const [tempData, setTempData] = useState<Product | any>(null);
  const { register, handleSubmit, errors, formState, watch } = useForm<FormData>({ mode: 'onChange' });
  const selected = props.state.cart.selected || dummySelected || {};
  const onSubmit = (data: FormData): void => {
    if (!selected) {
      Router.replace('/create');
      return;
    }
    const cart = { ...selected, ...data };
    if (!props.state.users.isLoggedIn) {
      setTempData(cart);
      setShowSheet(true);
      // saveToCookies(cart);
      return;
    }
    addToCart(cart, selected, props);
  };
  useEffect(() => {
    if (!formState.isValid) {
      showError(props.t('form:form-error'));
    }
  }, [errors]);
  useEffect(() => {
    getFromCookies(props);
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
            <FieldCover schema={schema(props).cover} register={register} errors={errors.Cover} />
          </div>
          <Button type="submit" width="648px" style={{ margin: '12px 0 18px' }}>
            {props.t('form:continue-button')}
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
            <Button width="100%" onClick={() => addToCart(tempData, selected, props)} variant="outline" color="black">
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
            <div className="c-sheet__content__item">
              <span className="icon-gift" /> {props.t('manufacturing-time')}
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
