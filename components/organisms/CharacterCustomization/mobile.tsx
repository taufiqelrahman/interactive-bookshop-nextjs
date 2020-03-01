import Card from 'components/atoms/Card';
import { useForm } from 'react-hook-form';
import { useEffect, useState, Fragment } from 'react';
import { withTranslation, Router } from 'i18n';
import { toast } from 'react-toastify';
import FieldOccupations from 'components/molecules/FieldOccupations';
import FormTextField from 'components/molecules/FormTextField';
import FieldAge from 'components/molecules/FieldAge';
import FieldDob from 'components/molecules/FieldDob';
import FieldGender from 'components/molecules/FieldGender';
import FieldHair from 'components/molecules/FieldHair';
import FieldSkin from 'components/molecules/FieldSkin';
import FieldLanguage from 'components/molecules/FieldLanguage';
import FormTextArea from 'components/molecules/FormTextArea';
import Divider from 'components/atoms/Divider';
import Button from 'components/atoms/Button';
import { schema, showError, dummy } from './helper';
import DefaultLayout from 'components/layouts/Default';
import NavBar from 'components/organisms/NavBar/mobile';
import Sheet from 'components/atoms/Sheet';

const CharacterCustomization = (props: any) => {
  const stepEnum = {
    OCCUPATIONS: 0,
    NAME_DOB: 1,
    AGE: 2,
    GENDER: 3,
    HAIR: 4,
    SKIN: 5,
    LANGUAGE: 6,
    DEDICATION: 7,
  };
  const [charStep, setCharStep] = useState(0);
  const { register, unregister, handleSubmit, errors, setValue, triggerValidation, watch, formState } = useForm({
    mode: 'onChange',
  });
  const onSubmit = data => {
    if (charStep !== stepEnum.DEDICATION) {
      setCharStep(charStep + 1);
      return;
    }
    props.saveSelected(data);
    Router.push('/preview');
  };
  const cancel = () => {
    props.setSheet(true);
  };
  const onBack = () => {
    if (charStep === stepEnum.OCCUPATIONS) {
      Router.back();
      return;
    }
    if (charStep === stepEnum.NAME_DOB) unregister('dob');
    setCharStep(charStep - 1);
  };
  useEffect(() => {
    if (charStep === stepEnum.NAME_DOB) register({ name: 'dob' }, schema.dob);
  }, [charStep]);
  useEffect(() => {
    if (!formState.isValid) {
      showError(props.t('form-error'));
    }
  }, [errors]);
  const selected = props.state.cart.selected || dummy || {};
  const screenHeight = '100vh - 69px';
  return (
    <DefaultLayout
      {...props}
      navbar={
        <NavBar
          onBack={onBack}
          setSideNav={props.setSideNav}
          isSteps={true}
          title={props.t('character-customization')}
          step={1}
          totalSteps={2}
        />
      }
    >
      <form className="c-char-custom" style={{ minHeight: `calc(${screenHeight})` }} onSubmit={handleSubmit(onSubmit)}>
        <div>
          {charStep === stepEnum.OCCUPATIONS ? (
            <div className="u-container u-container__page">
              <FieldOccupations
                ref={register(schema.occupations)}
                errors={errors.occupations}
                defaultChecked={selected.occupations}
              />
              {watch('occupations') && (
                <div className="c-char-custom__message">
                  {errors.occupations ? props.t('occupations-invalid') : watch('occupations').join(',')}
                </div>
              )}
            </div>
          ) : (
            <div className="c-char-custom__with-preview" style={{ minHeight: `calc(${screenHeight} - 116px)` }}>
              <div className="u-container c-char-custom__preview">
                <div>
                  <img src="/static/images/dummy.png" />
                </div>
              </div>
              <div className="u-container c-char-custom__tab">
                {charStep === stepEnum.NAME_DOB && (
                  <Fragment>
                    <FormTextField
                      label={props.t('char-name-label')}
                      name="name"
                      placeholder={props.t('name-placeholder')}
                      ref={register(schema.name)}
                      errors={errors.name}
                      defaultValue={selected.name}
                      variant="full-width"
                    />
                    <FieldDob
                      name="dob"
                      setValue={setValue}
                      triggerValidation={triggerValidation}
                      errors={errors.dob}
                      style={{ marginTop: 12 }}
                    />
                  </Fragment>
                )}
                {charStep === stepEnum.AGE && (
                  <FieldAge ref={register(schema.age)} errors={errors.age} defaultChecked={selected.age} />
                )}
                {charStep === stepEnum.GENDER && <FieldGender ref={register(schema.gender)} errors={errors.gender} />}
                {charStep === stepEnum.SKIN && (
                  <FieldHair ref={register(schema.hair)} errors={errors.hair} type={watch('gender')} />
                )}
                {charStep === stepEnum.HAIR && <FieldSkin ref={register(schema.skin)} errors={errors.skin} />}
                {charStep === stepEnum.LANGUAGE && (
                  <FieldLanguage ref={register(schema.language)} errors={errors.language} />
                )}
                {charStep === stepEnum.DEDICATION && (
                  <FormTextArea
                    label={props.t('dedication-label')}
                    hint={props.t('dedication-hint')}
                    name="dedication"
                    placeholder={props.t('dedication-placeholder')}
                    ref={register(schema.dedication)}
                    errors={errors.dedication}
                  />
                )}
              </div>
            </div>
          )}
        </div>
        <div className="u-container">
          <Button type="submit" width="100%" style={{ margin: '18px 0' }}>
            {props.t('next-button')}
          </Button>
          <div onClick={cancel} className="c-char-custom__link">
            {props.t('cancel')}
          </div>
        </div>
      </form>
      <Sheet
        isOpen={props.state.default.isSheetOpen}
        content={<div>wew</div>}
        actions={
          <Fragment>
            <Button width="100%" onClick={() => props.setSheet(false)}>
              {props.t('cancel')}
            </Button>
          </Fragment>
        }
      />
      <style jsx>{`
        .c-char-custom {
          @apply flex flex-col justify-between;
          &__link {
            @apply font-semibold cursor-pointer text-sm text-center;
            margin-bottom: 18px;
            color: #445ca4;
          }
          &__message {
            @apply font-semibold text-sm text-center;
          }
          &__with-preview {
            @apply flex flex-col justify-between;
          }
          &__preview {
            @apply bg-light-grey flex justify-center;
            padding: 20px 0;
            flex: 100%;
            div {
              @apply flex items-center;
              img {
                width: 100px;
              }
            }
          }
          &__tab {
            border-top: 1px solid #efeef4;
            border-radius: 24px 24px 0px 0px;
            padding-top: 20px;
            min-height: 200px;
          }
        }
      `}</style>
    </DefaultLayout>
  );
};

export default withTranslation('form')(CharacterCustomization);
