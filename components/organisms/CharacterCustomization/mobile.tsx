import { useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { useEffect, useState, Fragment } from 'react';
import { withTranslation, Router } from 'i18n';
import {
  schema,
  showError,
  previewImg,
  getJobIds,
  loadImg,
  addDedicationToLS,
  retrieveDedication,
  CharacterCustomizationProps,
} from './helper';
import { useRouter } from 'next/router';
import * as gtag from 'lib/gtag';
// import FieldDob from 'components/molecules/FieldDob';
import DefaultLayout from 'components/layouts/Default';
import NavBar from 'components/organisms/NavBar/mobile';
import { CustomAttributes } from 'store/cart/types';
import { cartItem } from '_mocks/cartItem';

const FieldOccupations = dynamic(() => import('components/molecules/FieldOccupations'));
const FormTextField = dynamic(() => import('components/molecules/FormTextField'));
const FieldAge = dynamic(() => import('components/molecules/FieldAge'));
const FieldGender = dynamic(() => import('components/molecules/FieldGender'));
const FieldHair = dynamic(() => import('components/molecules/FieldHair'));
const FieldSkin = dynamic(() => import('components/molecules/FieldSkin'));
const FieldLanguage = dynamic(() => import('components/molecules/FieldLanguage'));
const FormTextArea = dynamic(() => import('components/molecules/FormTextArea'));
const Button = dynamic(() => import('components/atoms/Button'));
const Sheet = dynamic(() => import('components/atoms/Sheet'));

const CharacterCustomization = (props: CharacterCustomizationProps) => {
  const router = useRouter();
  const stepEnum = {
    NAME_GENDER: 0,
    AGE: 1,
    // DOB: 3,
    HAIR: 2,
    SKIN: 3,
    OCCUPATIONS: 4,
    PARENTS: 5,
    LANGUAGE: 6,
    DEDICATION: 7,
  };
  const [charStep, setCharStep] = useState(0);
  const [showSheet, setShowSheet] = useState(false);
  const [showSheetOccupations, setShowSheetOccupations] = useState(false);
  const methods = useForm({ mode: 'onChange' });
  const { register, unregister, handleSubmit, errors, setValue, triggerValidation, watch, formState } = methods;
  const cancel = () => {
    setShowSheet(true);
  };
  const quit = () => {
    setShowSheet(false);
    Router.push('/');
  };
  const onBack = () => {
    if (charStep === stepEnum.NAME_GENDER) {
      Router.back();
      return;
    }
    // if (charStep === stepEnum.DOB) unregister('Date of Birth');
    if (charStep === stepEnum.OCCUPATIONS) unregister('Occupations');
    setCharStep(charStep - 1);
  };

  const isDev = process.env.NODE_ENV === 'development';
  const defaultSelected = isDev
    ? cartItem
    : {
        Dedication: retrieveDedication(),
      };
  const selected = props.state.cart.selected || (defaultSelected as CustomAttributes);
  const registerOccupations = () => {
    // setTimeout(() => {
    register({ name: 'Occupations' } as any, schema(props).occupations as any);
    if (selected.Occupations) setValue('Occupations', selected.Occupations);
    // }, 500);
  };
  const { occupations } = props.state.master;
  const onSubmit = (data: any) => {
    let PARAMS = { ...selected, ...data };
    if (charStep === stepEnum.OCCUPATIONS) {
      const jobIds = getJobIds(data.Occupations, occupations || []);
      PARAMS = { ...PARAMS, jobIds };
    }
    // if (charStep === stepEnum.AGE && !router.query.edit) {
    //   const jobIds = getJobIds(selected.Occupations, occupations);
    //   PARAMS = { ...PARAMS, jobIds };
    // }
    props.saveSelected(PARAMS);
    if (charStep !== stepEnum.DEDICATION) {
      setCharStep(charStep + 1);
      return;
    }
    if (!router.query.edit) {
      gtag.event({
        action: 'click_create',
        category: 'engagement',
        label: '/create',
      });
    }
    addDedicationToLS(data.Dedication);
    Router.push('/preview');
  };
  // const pickedJobs = () => {
  //   const array = watch('Occupations').map(job => (i18n.language === 'en' ? job : props.t(`common:${job}`)));
  //   return array.join(', ');
  // };
  useEffect(() => {
    // if (charStep === stepEnum.OCCUPATIONS) return;
    loadImg(previewImg(selected, watch, true));
  }, [previewImg(selected, watch, true)]);
  useEffect(() => {
    if ([stepEnum.AGE, stepEnum.SKIN, stepEnum.PARENTS].includes(charStep)) {
      loadImg(previewImg(selected, watch, true));
    }
    if (charStep === stepEnum.OCCUPATIONS) registerOccupations();
    if (charStep === stepEnum.PARENTS) unregister('Occupations');
  }, [charStep]);
  useEffect(() => {
    const { Name, Gender } = selected;
    if (!router.query.edit && Name && Gender) {
      setCharStep(stepEnum.AGE);
    }
    Router.prefetch('/preview');
  }, []);
  useEffect(() => {
    if (!formState.isValid) showError(props.t('form-error'));
  }, [errors]);
  const screenHeight = '100vh - 69px';
  return (
    <DefaultLayout
      {...props}
      navbar={
        <NavBar
          onBack={onBack}
          isSteps={true}
          title={props.t('common:character-customization')}
          step={1}
          totalSteps={2}
          actionRight={
            charStep === stepEnum.OCCUPATIONS ? (
              <span className="icon-info" onClick={() => setShowSheetOccupations(true)} />
            ) : null
          }
        />
      }
    >
      <form className="c-char-custom" style={{ height: `calc(${screenHeight})` }} onSubmit={handleSubmit(onSubmit)}>
        <div className="c-char-custom__container">
          {charStep === stepEnum.OCCUPATIONS ? (
            <div className="u-container u-container__page">
              <FieldOccupations
                setValue={setValue}
                triggerValidation={triggerValidation}
                register={register}
                errors={errors.Occupations}
                defaultValue={selected.Occupations}
                occupations={occupations}
                isMobile={true}
                formState={formState}
                gender={watch('Gender') || selected.Gender}
              />
              {/* {watch('Occupations') && (
                <div className="c-char-custom__message">
                  <div className="c-char-custom__message__jobs">{pickedJobs()}</div>
                  {errors.Occupations && props.t('occupations-invalid')}
                </div>
              )} */}
            </div>
          ) : (
            <div className="c-char-custom__with-preview" style={{ minHeight: `calc(${screenHeight} - 116px)` }}>
              <div className="u-container c-char-custom__preview">
                <div>
                  <img id="preview-char" src="/static/images/empty.png" alt="character preview" />
                </div>
              </div>
              <div className="u-container c-char-custom__tab">
                {charStep === stepEnum.NAME_GENDER && (
                  <Fragment>
                    <FormTextField
                      label={props.t('nickname-label')}
                      name="Name"
                      placeholder={props.t('name-placeholder')}
                      schema={schema(props).name}
                      register={register}
                      errors={errors.Name}
                      defaultValue={selected.Name}
                      variant="full-width"
                    />
                    <FieldGender
                      schema={schema(props).gender}
                      register={register}
                      errors={errors.Gender}
                      isMobile={true}
                      defaultChecked={selected.Gender}
                    />
                  </Fragment>
                )}
                {charStep === stepEnum.AGE && (
                  <FieldAge
                    schema={schema(props).age}
                    register={register}
                    errors={errors.Age}
                    defaultChecked={selected.Age}
                  />
                )}
                {/* {charStep === stepEnum.DOB && (
                  <FieldDob
                    name="Date of Birth"
                    setValue={setValue}
                    triggerValidation={triggerValidation}
                    errors={errors['Date of Birth']}
                    style={{ marginTop: 12 }}
                    defaultValue={selected['Date of Birth']}
                    {...props}
                  />
                )} */}
                {charStep === stepEnum.HAIR && (
                  <FieldHair
                    schema={schema(props).hair}
                    register={register}
                    unregister={unregister}
                    errors={errors.Hair}
                    type={watch('Gender') || selected.Gender}
                    age={watch('Age') || selected.Age}
                    isMobile={true}
                    defaultChecked={selected.Hair}
                  />
                )}
                {charStep === stepEnum.SKIN && (
                  <FieldSkin
                    schema={schema(props).skin}
                    errors={errors.Skin}
                    isMobile={true}
                    defaultChecked={selected.Skin}
                    register={register}
                  />
                )}
                {charStep === stepEnum.PARENTS && (
                  <Fragment>
                    <FormTextField
                      label={props.t('daddy-label')}
                      name="Daddy"
                      placeholder={props.t('daddy-placeholder')}
                      schema={schema(props).daddy}
                      register={register}
                      errors={errors.Daddy}
                      defaultValue={selected.Daddy}
                      variant="full-width"
                    />
                    <FormTextField
                      label={props.t('mommy-label')}
                      name="Mommy"
                      placeholder={props.t('mommy-placeholder')}
                      schema={schema(props).mommy}
                      register={register}
                      errors={errors.Mommy}
                      defaultValue={selected.Mommy}
                      variant="full-width"
                    />
                  </Fragment>
                )}
                {charStep === stepEnum.LANGUAGE && (
                  <FieldLanguage
                    schema={schema(props).language}
                    register={register}
                    errors={errors.Language}
                    isMobile={true}
                    defaultChecked={selected.Language}
                  />
                )}
                {charStep === stepEnum.DEDICATION && (
                  <FormTextArea
                    label={props.t('dedication-label')}
                    hint={props.t('dedication-hint')}
                    name="Dedication"
                    placeholder={props.t('dedication-placeholder')}
                    schema={schema(props).dedication}
                    register={register}
                    errors={errors.Dedication}
                    defaultValue={selected.Dedication}
                    clear={() => setValue('Dedication', '')}
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
            {props.t('cancel-button')}
          </div>
        </div>
      </form>
      <Sheet
        name="quit-sheet"
        isOpen={showSheet}
        closeSheet={() => setShowSheet(false)}
        content={
          <Fragment>
            <h1 className="c-char-custom__sheet__title">{props.t('quit-customizing')}</h1>
            <div className="c-char-custom__sheet__content">{props.t('quit-confirmation')}</div>
          </Fragment>
        }
        actions={
          <Fragment>
            <Button width="100%" onClick={quit} style={{ marginBottom: 12 }}>
              {props.t('yes-quit')}
            </Button>
            <Button width="100%" onClick={() => setShowSheet(false)} variant="outline" color="black">
              {props.t('cancel-button')}
            </Button>
          </Fragment>
        }
      />
      <Sheet
        name="occupations-example"
        isOpen={showSheetOccupations}
        header
        title={props.t('info')}
        closeSheet={() => setShowSheetOccupations(false)}
        content={
          <>
            {`${props.t('occupations-info')}${props.t('example-below')}`}
            <img
              src="/static/images/occupations-example-sm.png"
              alt="sheet-image"
              style={{ marginTop: 18, width: '100%' }}
            />
          </>
        }
      />
      <style jsx>{`
        .c-char-custom {
          @apply flex flex-col justify-between;
          &__container {
            @apply overflow-auto;
          }
          &__link {
            @apply font-semibold cursor-pointer text-sm text-center;
            margin-bottom: 18px;
            color: #445ca4;
          }
          &__message {
            @apply font-semibold text-sm text-center;
            &__jobs {
              margin-bottom: 8px;
            }
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
                @apply object-contain;
                width: 100px;
                background: url('/static/images/loading.gif') 50% no-repeat;
                height: 185px;
              }
            }
          }
          &__tab {
            border-top: 1px solid #efeef4;
            border-radius: 24px 24px 0px 0px;
            padding-top: 20px;
            min-height: 200px;
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

export default withTranslation(['form', 'common'])(CharacterCustomization);
