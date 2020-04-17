import { withTranslation, Router } from 'i18n';
import DefaultLayout from 'components/layouts/Default';
import Button from 'components/atoms/Button';
import FieldCover from 'components/molecules/FieldCover';
import { useForm, FormContext } from 'react-hook-form';
import { useEffect } from 'react';
import BookPreview from 'components/BookPreview';
import { dummySelected, schema, showError } from './helper';
import NavBar from '../NavBar/mobile';

const PreviewMobile = (props: any): any => {
  const methods = useForm({
    mode: 'onChange',
  });
  const { handleSubmit, errors, formState } = methods;
  const onSubmit = data => {
    const { selected } = props.state.cart;
    const cart = { ...selected, ...data };
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
  const selected = props.state.cart.selected || dummySelected || {};
  const screenHeight = '100vh - 69px';
  const bookPages = props.state.master.bookPages;
  const dontHaveCart = !props.state.users.user.cart;
  return (
    <DefaultLayout
      {...props}
      navbar={<NavBar isSteps={true} title={props.t('book-preferences')} step={2} totalSteps={2} />}
    >
      <div className="c-preview" style={{ height: `calc(${screenHeight})` }}>
        <BookPreview selected={selected || {}} isMobile={props.isMobile} bookPages={bookPages} />
        <FormContext {...methods}>
          <form className="c-preview__tab u-container" onSubmit={handleSubmit(onSubmit)}>
            <div className="c-preview__cover">
              <FieldCover schema={schema(props).cover} errors={errors.cover} />
            </div>
            <Button type="submit" width="648px" disabled={dontHaveCart} style={{ margin: '12px 0 18px' }}>
              {selected.id ? props.t('update-cart') : props.t('form:continue-button')}
            </Button>
            <div className="c-preview__link" onClick={() => Router.back()}>
              {props.t('go-back')}
            </div>
          </form>
        </FormContext>
      </div>
      <style jsx>{`
        .c-preview {
          @apply flex flex-col justify-between;
          &__tab {
            border-top: 1px solid #efeef4;
            border-radius: 24px 24px 0px 0px;
            padding-top: 20px;
            min-height: 200px;
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
