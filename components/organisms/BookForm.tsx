import { withTranslation, Router } from 'i18n';
import { useForm } from 'react-hook-form';
import Card from 'components/atoms/Card';
import Button from 'components/atoms/Button';
// import FieldOccupations from 'components/molecules/FieldOccupations';
import FormTextField from 'components/molecules/FormTextField';
// import FieldAge from 'components/molecules/FieldAge';
import { useState, useEffect } from 'react';
import FieldGender from 'components/molecules/FieldGender';

const BookForm = (props: any) => {
  const [isFormValid, setIsFormValid] = useState(false);
  // const stepEnum = { OCCUPATIONS: 0, DETAIL: 1 };
  // const [state, setState] = useState({
  //   step: stepEnum.OCCUPATIONS,
  //   occupations: [],
  // });
  const methods = useForm({ mode: 'onChange' });
  const { register, handleSubmit, errors, formState, watch } = methods;
  const schema = {
    // occupations: {
    //   required: { value: true, message: props.t('occupations-invalid') },
    //   validate: value => value.length === 3 || props.t('occupations-invalid'),
    // },
    name: { required: { value: true, message: `${props.t('name-label')} ${props.t('required-error')}` } },
    // age: { required: true },
    gender: { required: { value: true, message: `${props.t('gender-label')} ${props.t('required-error')}` } },
  };

  useEffect(() => {
    setIsFormValid(formState.isValid);
  }, [watch()]);
  // useEffect(() => {
  //   if (state.step === stepEnum.OCCUPATIONS) {
  //     unregister('Occupations');
  //   }
  // }, [state.step]);
  // useEffect(() => {
  //   register({ name: 'Occupations' }, schema.occupations);
  // }, []);

  // const next = async () => {
  //   const valid = await triggerValidation();
  //   setIsFormValid(valid);
  //   if (valid) {
  //     setState({ ...state, step: stepEnum.DETAIL, occupations: watch('occupations') });
  //   }
  // };
  const onSubmit = data => {
    // if (props.isMobile && state.step === stepEnum.OCCUPATIONS) {
    //   next();
    //   return;
    // }
    // let PARAMS = data;
    // if (props.isMobile) PARAMS = { ...PARAMS, occupations: state.occupations };
    props.saveSelected(data);
    Router.push('/create');
  };

  return (
    <div>
      <div className="c-book-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          {props.isMobile ? (
            <div style={{ overflow: 'hidden' }}>
              <Card variant="shadow--bold">
                {/* {state.step === stepEnum.OCCUPATIONS && (
                  <div key={1} className="c-book-form__container c-book-form__container__mobile">
                    <FieldOccupations
                      setValue={setValue}
                      triggerValidation={triggerValidation}
                      register={register}
                      errors={errors.Occupations}
                      isMobile={props.isMobile}
                      occupations={props.occupations}
                      formState={formState}
                    />
                    <Button type="submit" width="100%" disabled={!isFormValid}>
                      {props.t('next-button')}
                    </Button>
                  </div>
                )} */}
                {/* {state.step === stepEnum.DETAIL && ( */}
                <div key={2} className="c-book-form__container c-book-form__container__mobile">
                  <div>
                    <FormTextField
                      label={props.t('name-label')}
                      name="Name"
                      placeholder={props.t('name-placeholder')}
                      schema={schema.name}
                      register={register}
                      errors={errors.Name}
                      variant="full-width"
                    />
                    <FieldGender schema={schema.gender} register={register} errors={errors.Gender} isMobile={true} />
                    {/* <FieldAge schema={schema.age} errors={errors.Age} register={register} /> */}
                  </div>
                  <Button type="submit" width="100%" disabled={!isFormValid}>
                    {props.t('continue-button')}
                  </Button>
                </div>
                {/* )} */}
              </Card>
            </div>
          ) : (
            <Card variant="shadow--bold">
              <div className="c-book-form__container">
                {/* <FieldOccupations
                  setValue={setValue}
                  triggerValidation={triggerValidation}
                  errors={errors.Occupations}
                  isMobile={props.isMobile}
                  register={register}
                  occupations={props.occupations}
                  formState={formState}
                /> */}
                <div className="c-book-form__second-row">
                  <div className="c-book-form__second-row__inputs">
                    <FormTextField
                      label={props.t('name-label')}
                      name="Name"
                      placeholder={props.t('name-placeholder')}
                      schema={schema.name}
                      register={register}
                      errors={errors.Name}
                      variant="full-width"
                      className="c-book-form__item"
                    />
                    <FieldGender
                      schema={schema.gender}
                      register={register}
                      errors={errors.Gender}
                      isMobile={false}
                      className="c-book-form__item"
                    />
                    {/* <FieldAge schema={schema.age} errors={errors.Age} register={register} /> */}
                  </div>
                  <div className="c-book-form__second-row__button">
                    <Button width="100%" type="submit" disabled={!isFormValid} style={{ marginTop: 24 }}>
                      {props.t('continue-button')}
                    </Button>
                  </div>
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
            }
          }
          &__second-row {
            @apply flex flex-col;
            @screen lg {
              @apply items-start justify-between flex-row;
            }
            &__inputs {
              @apply flex flex-col w-full;
              @screen md {
                @apply items-start justify-between flex-row;
              }
              @screen lg {
                @apply w-2/3;
              }
            }
            &__button {
              @apply w-full;
              @screen lg {
                @apply w-1/3;
              }
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
        .c-book-form__item {
          @apply w-1/2 pr-1;
          &:last-child {
            @apply p-0;
          }
        }
      `}</style>
    </div>
  );
};

export default withTranslation('form')(BookForm);
