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
  const stepEnum = { OCCUPATIONS: 0, DETAIL: 1 };
  const [state, setState] = useState({
    step: stepEnum.OCCUPATIONS,
    occupations: [],
  });
  const methods = useForm({ mode: 'onChange' });
  const { register, handleSubmit, errors, formState, watch } = methods;
  const onSubmit = data => {
    let PARAMS = data;
    if (props.isMobile) PARAMS = { ...PARAMS, occupations: state.occupations };
    props.saveSelected(PARAMS);
    Router.push('/create');
  };
  const schema = {
    occupations: {
      required: true,
      validate: value => value.length === 3,
    },
    name: { required: true },
    age: { required: true },
  };

  useEffect(() => {
    setIsFormValid(formState.isValid);
  }, [watch()]);

  const next = () => {
    setState({ ...state, step: stepEnum.DETAIL, occupations: watch('occupations') });
  };

  return (
    <div>
      <div className="c-book-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          {props.isMobile ? (
            <div style={{ overflow: 'hidden' }}>
              <Card variant="shadow--bold">
                {state.step === stepEnum.OCCUPATIONS && (
                  <div key={1} className="c-book-form__container c-book-form__container__mobile">
                    <FieldOccupations
                      schema={schema.occupations}
                      register={register}
                      errors={errors.Occupations}
                      occupations={props.occupations}
                    />
                    <Button width="100%" disabled={!isFormValid} onClick={next}>
                      {props.t('next-button')}
                    </Button>
                  </div>
                )}
                {state.step === stepEnum.DETAIL && (
                  <div key={2} className="c-book-form__container c-book-form__container__mobile">
                    <div>
                      <FormTextField
                        label={props.t('name-label')}
                        name="name"
                        placeholder={props.t('name-placeholder')}
                        schema={schema.name}
                        register={register}
                        errors={errors.Name}
                        variant="full-width"
                      />
                      <FieldAge schema={schema.age} errors={errors.Age} />
                    </div>
                    <Button type="submit" width="100%" disabled={!isFormValid}>
                      {props.t('continue-button')}
                    </Button>
                  </div>
                )}
              </Card>
            </div>
          ) : (
            <Card variant="shadow--bold">
              <div className="c-book-form__container">
                <FieldOccupations
                  schema={schema.occupations}
                  errors={errors.Occupations}
                  isMobile={props.isMobile}
                  register={register}
                  occupations={props.occupations}
                />
                <div className="c-book-form__second-row">
                  <FormTextField
                    label={props.t('name-label')}
                    name="name"
                    placeholder={props.t('name-placeholder')}
                    schema={schema.name}
                    register={register}
                    errors={errors.Name}
                  />
                  <FieldAge schema={schema.age} errors={errors.Age} register={register} />
                  <Button type="submit" width="308px" disabled={!isFormValid}>
                    {props.t('continue-button')}
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </form>
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
