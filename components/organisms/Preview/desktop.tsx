import { withTranslation, Link, Router } from 'i18n';
import DefaultLayout from 'components/layouts/Default';
import Stepper from 'components/atoms/Stepper';
import Card from 'components/atoms/Card';
import Button from 'components/atoms/Button';
import FieldCover from 'components/molecules/FieldCover';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import BookPreview from 'components/BookPreview';
import { onSubmit, dummySelected, schema, showError } from './helper';

const PreviewDesktop = (props: any): any => {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: 'onChange',
  });
  useEffect(() => {
    if (!formState.isValid) {
      showError(props.t('form:form-error'));
    }
  }, [errors]);
  const selected = props.state.cart.selected || dummySelected || {};
  const bookPages = props.state.master.bookPages;
  return (
    <DefaultLayout {...props}>
      <div className="u-container u-container__page">
        <Stepper step={1} totalSteps={2} title={props.t('book-preferences')} />
        <div className="c-preview">
          <Card variant="border">
            <form className="c-preview__container" onSubmit={handleSubmit(onSubmit)}>
              <div className="c-preview__book">
                <BookPreview selected={selected || {}} bookPages={bookPages} />
              </div>
              <div className="c-preview__cover">
                <FieldCover
                  ref={register(schema(props).cover)}
                  errors={errors.cover}
                  style={{ marginTop: 24, marginBottom: 12 }}
                />
              </div>
              <Button type="submit" width="648px" style={{ margin: '18px 0' }}>
                {props.t('add-to-cart')}
              </Button>
              <Link href="/">
                <a className="c-preview__link">{props.t('back-to-home')}</a>
              </Link>
            </form>
          </Card>
        </div>
      </div>
      <style jsx>{`
        .c-section {
          @apply w-full;
        }
        .c-preview {
          @apply mx-auto w-full;
          margin-top: 30px;
          &__container {
            padding: 42px 30px 30px;
            text-align: center;
          }
          &__cover {
            @apply flex justify-center;
          }
          &__link {
            @apply font-semibold cursor-pointer;
            color: #445ca4;
            span {
              @apply font-normal;
            }
          }
        }
      `}</style>
    </DefaultLayout>
  );
};

export default withTranslation(['common', 'form'])(PreviewDesktop);
