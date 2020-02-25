import { withTranslation, Router } from 'i18n';
import { useForm } from 'react-hook-form';
import Card from 'components/atoms/Card';
import Button from 'components/atoms/Button';
import FieldOccupations from 'components/molecules/FieldOccupations';
import FormTextField from 'components/molecules/FormTextField';
import FieldAge from 'components/molecules/FieldAge';
import { useState, useEffect } from 'react';

const BookForm = (props: any) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [step, setStep] = useState(1);
  const { register, handleSubmit, errors, formState, watch } = useForm({
    mode: 'onChange',
  });
  const onSubmit = data => {
    props.saveSelected(data);
    Router.push('/create');
  };
  const schema = {
    occupations: {
      required: true,
      validate: value => value.length === 3,
    },
    name: { required: true },
    gender: { required: true },
  };

  useEffect(() => {
    setIsFormValid(formState.isValid);
  }, [watch()]);

  const next = () => {
    setStep(2);
  };

  return (
    <div>
      <div className="c-book-form">
        {props.isMobile ? (
          <form onSubmit={handleSubmit(onSubmit)} style={{ overflow: 'hidden' }}>
            <Card variant="shadow--bold">
              {step === 1 && (
                <div key={1} className="c-book-form__container c-book-form__container__mobile">
                  <FieldOccupations ref={register(schema.occupations)} errors={errors.occupations} />
                  <Button width="100%" disabled={!isFormValid} onClick={next}>
                    {props.t('next-button')}
                  </Button>
                </div>
              )}
              {step === 2 && (
                <div key={2} className="c-book-form__container c-book-form__container__mobile">
                  <div>
                    <FormTextField
                      label={props.t('name-label')}
                      name="name"
                      placeholder={props.t('name-placeholder')}
                      ref={register(schema.name)}
                      errors={errors.name}
                      variant="full-width"
                    />
                    <FieldAge ref={register(schema.gender)} errors={errors.gender} />
                  </div>
                  <Button type="submit" width="100%" disabled={!isFormValid}>
                    {props.t('continue-button')}
                  </Button>
                </div>
              )}
            </Card>
          </form>
        ) : (
          <Card variant="shadow--bold">
            <form className="c-book-form__container" onSubmit={handleSubmit(onSubmit)}>
              <FieldOccupations
                ref={register(schema.occupations)}
                errors={errors.occupations}
                isMobile={props.isMobile}
              />
              <div className="c-book-form__second-row">
                <FormTextField
                  label={props.t('name-label')}
                  name="name"
                  placeholder={props.t('name-placeholder')}
                  ref={register(schema.name)}
                  errors={errors.name}
                />
                <FieldAge ref={register(schema.gender)} errors={errors.gender} />
                <Button type="submit" width="308px" disabled={!isFormValid}>
                  {props.t('continue-button')}
                </Button>
              </div>
            </form>
          </Card>
        )}
      </div>
      <style jsx>{`
        .c-book-form {
          @apply mx-auto w-11/12;
          @screen md {
            max-width: 920px;
          }
          &__container {
            padding: 36px;
            &__mobile {
              @apply flex flex-col justify-between;
              height: 466px;
            }
          }
          &__second-row {
            @apply flex mt-6 flex-col;
            @screen md {
              @apply items-end justify-between flex-row;
            }
          }
        }
      `}</style>
      <style jsx global>{`
        .inputs-enter {
          opacity: 0.01;
          &.inputs-enter-active {
            opacity: 1;
            transition: opacity 300ms ease-in;
          }
        }
        .inputs-leave {
          opacity: 1;
          &.inputs-leave-active {
            opacity: 0.01;
            transition: opacity 300ms ease-in;
          }
        }
      `}</style>
    </div>
  );
};

export default withTranslation('form')(BookForm);
