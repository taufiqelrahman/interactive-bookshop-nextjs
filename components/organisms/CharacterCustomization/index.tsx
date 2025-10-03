import detectIt from 'detect-it';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import NavBar from 'components/organisms/NavBar/mobile';
import * as gtag from 'lib/gtag';
import { useResponsive } from 'lib/hooks/useResponsive';
import { RootState } from 'store';
import actions from 'store/actions';
import { CartItem, Character } from 'store/cart/types';

import { schema, showError, previewImg, getJobIds, loadImg } from './helper';

// import Card from 'components/atoms/Card';
// import FieldDob from 'components/molecules/FieldDob';
// import DefaultLayout from 'components/layouts/Default';

const DefaultLayout = dynamic(() => import('components/layouts/Default'));
const Card = dynamic(() => import('components/atoms/Card'));
const FieldOccupations = dynamic(() => import('components/molecules/FieldOccupations'));
const FormTextField = dynamic(() => import('components/molecules/FormTextField'));
const FieldAge = dynamic(() => import('components/molecules/FieldAge'));
const FieldGender = dynamic(() => import('components/molecules/FieldGender'));
const FieldHair = dynamic(() => import('components/molecules/FieldHair'));
const FieldSkin = dynamic(() => import('components/molecules/FieldSkin'));
const FieldLanguage = dynamic(() => import('components/molecules/FieldLanguage'));
const FormTextArea = dynamic(() => import('components/molecules/FormTextArea'));
const Button = dynamic(() => import('components/atoms/Button'));
const Divider = dynamic(() => import('components/atoms/Divider'));
const Stepper = dynamic(() => import('components/atoms/Stepper'));

// mobile
const Sheet = dynamic(() => import('components/atoms/Sheet'));

const STEP_ENUM = {
  NAME_GENDER: 0,
  AGE: 1,
  // DOB: 3,
  HAIR: 2,
  SKIN: 3,
  OCCUPATIONS: 4,
  LANGUAGE: 5,
  DEDICATION: 6,
};

const CharacterCustomization = () => {
  const { t } = useTranslation('form');
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const master = useSelector((state: RootState) => state.master);
  const router = useRouter();
  const [isSticky, setSticky] = useState(false);
  const methods = useForm({ mode: 'onChange' });
  const { register, unregister, handleSubmit, errors, setValue, triggerValidation, watch, formState } = methods;
  useEffect(() => {
    if (!formState.isValid) {
      showError(t('form-error'));
    }
  }, [errors]);
  const isDev = process.env.NODE_ENV === 'development';
  const defaultSelected: Character = isDev
    ? {
        Occupations: ['Teacher', 'Pilot', 'Police'],
        Name: 'Fatimah',
        Age: 'kid',
        Gender: 'girl',
        Skin: 'light',
        Language: 'english',
        Dedication:
          '“Aku yakin kamu pasti akan menjadi guru yang sangat baik,” kata wanita berambut kuning itu. “I believe that you will be an excellent one,” said the yellow-haired woman.',
        'Date of Birth': '03-01-2019',
        Hair: 'short',
      }
    : ({} as Character);
  const { occupations } = master;
  const { isMobile } = useResponsive();
  const onSubmit = (data) => {
    if (!router.query.edit) {
      gtag.event({
        action: 'click_create',
        category: 'engagement',
        label: '/create',
      });
    }
    let jobIds: string[] = [];
    if (isMobile) {
      if (charStep === STEP_ENUM.OCCUPATIONS) {
        let PARAMS = { ...selected, ...data };
        jobIds = getJobIds(data.Occupations, occupations);
        PARAMS = { ...PARAMS, jobIds };
        dispatch(actions.saveSelected(PARAMS));
        if (charStep !== STEP_ENUM.DEDICATION) {
          setCharStep(charStep + 1);
          return;
        }
      }
    } else {
      jobIds = getJobIds(data.Occupations, occupations);
      dispatch(actions.saveSelected({ ...selected, ...data, jobIds }));
    }

    router.push({
      pathname: '/preview',
      query: jobIds.length ? { jobIds: jobIds.join(',') } : {}, // save jobids in url query
    });
  };

  const ref = useRef<HTMLInputElement>(null);
  const handleScroll = () => {
    if (ref && ref.current) {
      setSticky(ref.current.getBoundingClientRect().top < 100);
    }
  };
  const stickyClassName = () => {
    return isSticky ? 'c-char-custom__char--sticky' : '';
  };
  useEffect(() => {
    // setTimeout(() => {
    //   register({ name: 'Date of Birth' }, schema(t).dob);
    router.prefetch('/preview');
    register({ name: 'Occupations' }, schema(t).occupations);
    if (selected.Occupations) setValue('Occupations', selected.Occupations);
    // }, 500);
    window.addEventListener('scroll', handleScroll, detectIt.passiveEvents ? { passive: true } : false);
    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);
  const selected = cart.selected || (defaultSelected as CartItem);
  const previewImgUrl = useMemo(() => previewImg(selected, watch), [selected, watch]);
  useEffect(() => {
    loadImg(previewImgUrl);
  }, [previewImgUrl]);
  const containerWidth = window.innerWidth > 1023 ? window.innerWidth * 0.75 : (window.innerWidth * 11) / 12;
  const containerMargin = (window.innerWidth - containerWidth) / 2;
  const charWidth = containerWidth * 0.3 - containerWidth * 0.08;

  // mobile
  const [charStep, setCharStep] = useState(0);
  const [showSheet, setShowSheet] = useState(false);
  const cancel = () => {
    setShowSheet(true);
  };
  const quit = () => {
    setShowSheet(false);
    router.push('/');
  };
  const onBack = () => {
    if (charStep === STEP_ENUM.NAME_GENDER) {
      router.back();
      return;
    }
    // if (charStep === stepEnum.DOB) unregister('Date of Birth');
    if (charStep === STEP_ENUM.OCCUPATIONS) unregister('Occupations');
    setCharStep(charStep - 1);
  };

  const registerOccupations = () => {
    // setTimeout(() => {
    register({ name: 'Occupations' }, schema(t).occupations);
    if (selected.Occupations) setValue('Occupations', selected.Occupations);
    // }, 500);
  };
  // const pickedJobs = () => {
  //   const array = watch('Occupations').map(job => (i18n.language === 'en' ? job : t(`common:${job}`)));
  //   return array.join(', ');
  // };
  const previewImgUrlMobile = useMemo(() => previewImg(selected, watch, true), [selected, watch]);
  useEffect(() => {
    // if (charStep === stepEnum.OCCUPATIONS) return;
    loadImg(previewImgUrlMobile);
  }, [previewImgUrlMobile]);
  useEffect(() => {
    if ([STEP_ENUM.AGE, STEP_ENUM.SKIN, STEP_ENUM.LANGUAGE].includes(charStep)) {
      loadImg(previewImgUrlMobile);
    }
    if (charStep === STEP_ENUM.OCCUPATIONS) registerOccupations();
    if (charStep === STEP_ENUM.LANGUAGE) unregister('Occupations');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charStep, previewImgUrlMobile]);
  useEffect(() => {
    const { Name, Gender } = selected;
    if (!router.query.edit && Name && Gender) {
      setCharStep(STEP_ENUM.AGE);
    }
    if (typeof selected.Occupations === 'string') {
      selected.Occupations = (selected.Occupations as string).split(',');
    }
    router.prefetch('/preview');
  }, []);
  useEffect(() => {
    if (!formState.isValid) showError(t('form-error'));
  }, [errors]);
  const screenHeight = '100vh - 69px';

  if (isMobile) {
    return (
      <DefaultLayout
        navbar={
          <NavBar onBack={onBack} isSteps={true} title={t('common:character-customization')} step={1} totalSteps={2} />
        }
      >
        <form className="c-char-custom" style={{ height: `calc(${screenHeight})` }} onSubmit={handleSubmit(onSubmit)}>
          <div className="c-char-custom__container">
            {charStep === STEP_ENUM.OCCUPATIONS ? (
              <div className="u-container u-container__page">
                <FieldOccupations
                  setValue={setValue}
                  triggerValidation={triggerValidation}
                  register={register}
                  errors={errors.Occupations}
                  defaultValue={selected.Occupations}
                  isMobile={true}
                  formState={formState}
                  gender={watch('Gender') || selected.Gender}
                />
                {/* {watch('Occupations') && (
                <div className="c-char-custom__message">
                  <div className="c-char-custom__message__jobs">{pickedJobs()}</div>
                  {errors.Occupations && t('occupations-invalid')}
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
                  {charStep === STEP_ENUM.NAME_GENDER && (
                    <Fragment>
                      <FormTextField
                        label={t('nickname-label')}
                        name="Name"
                        placeholder={t('name-placeholder')}
                        schema={schema(t).name}
                        register={register}
                        errors={errors.Name}
                        defaultValue={selected.Name}
                        variant="full-width"
                      />
                      <FieldGender
                        schema={schema(t).gender}
                        register={register}
                        errors={errors.Gender}
                        isMobile={true}
                        defaultChecked={selected.Gender}
                      />
                    </Fragment>
                  )}
                  {charStep === STEP_ENUM.AGE && (
                    <FieldAge
                      schema={schema(t).age}
                      register={register}
                      errors={errors.Age}
                      defaultCheckedValue={selected.Age}
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
                  />
                )} */}
                  {charStep === STEP_ENUM.HAIR && (
                    <FieldHair
                      schema={schema(t).hair}
                      register={register}
                      unregister={unregister}
                      errors={errors.Hair}
                      type={watch('Gender') || selected.Gender}
                      age={watch('Age') || selected.Age}
                      isMobile={true}
                      defaultChecked={selected.Hair}
                    />
                  )}
                  {charStep === STEP_ENUM.SKIN && (
                    <FieldSkin
                      schema={schema(t).skin}
                      errors={errors.Skin}
                      isMobile={true}
                      defaultChecked={selected.Skin}
                      register={register}
                    />
                  )}
                  {charStep === STEP_ENUM.LANGUAGE && (
                    <FieldLanguage
                      schema={schema(t).language}
                      register={register}
                      errors={errors.Language}
                      isMobile={true}
                      defaultChecked={selected.Language}
                    />
                  )}
                  {charStep === STEP_ENUM.DEDICATION && (
                    <FormTextArea
                      label={t('dedication-label')}
                      hint={t('dedication-hint')}
                      name="Dedication"
                      placeholder={t('dedication-placeholder')}
                      schema={schema(t).dedication}
                      register={register}
                      errors={errors.Dedication}
                      defaultValue={selected.Dedication}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="u-container">
            <Button type="submit" width="100%" style={{ margin: '18px 0' }}>
              {t('next-button')}
            </Button>
            <div onClick={cancel} className="c-char-custom__link">
              {t('cancel-button')}
            </div>
          </div>
        </form>
        <Sheet
          name="quit-sheet"
          isOpen={showSheet}
          closeSheet={() => setShowSheet(false)}
          content={
            <Fragment>
              <h1 className="c-char-custom__sheet__title">{t('quit-customizing')}</h1>
              <div className="c-char-custom__sheet__content">{t('quit-confirmation')}</div>
            </Fragment>
          }
          actions={
            <Fragment>
              <Button width="100%" onClick={quit} style={{ marginBottom: 12 }}>
                {t('yes-quit')}
              </Button>
              <Button width="100%" onClick={() => setShowSheet(false)} variant="outline" color="black">
                {t('cancel-button')}
              </Button>
            </Fragment>
          }
        />
        <style jsx>{`
          .c-char-custom {
            @apply flex flex-col justify-between;
            &__container {
              @apply overflow-auto;
            }
            &__link {
              @apply cursor-pointer text-center text-sm font-semibold;
              margin-bottom: 18px;
              color: #445ca4;
            }
            &__message {
              @apply text-center text-sm font-semibold;
              &__jobs {
                margin-bottom: 8px;
              }
            }
            &__with-preview {
              @apply flex flex-col justify-between;
            }
            &__preview {
              @apply flex justify-center bg-light-grey;
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
  }
  return (
    <DefaultLayout>
      <div className="u-container u-container__page--large">
        <Stepper step={1} totalSteps={2} title={t('common:character-customization')} style={{ marginBottom: 30 }} />
        <div className="c-char-custom">
          <div className="c-char-custom__left">
            <Card variant="border">
              <form className="c-char-custom__left__container" onSubmit={handleSubmit(onSubmit)}>
                <FormTextField
                  label={t('nickname-label')}
                  name="Name"
                  placeholder={t('name-placeholder')}
                  schema={schema(t).name}
                  register={register}
                  errors={errors.Name}
                  defaultValue={selected.Name}
                />
                <FieldGender
                  schema={schema(t).gender}
                  register={register}
                  errors={errors.Gender}
                  style={{ marginTop: 24 }}
                  defaultChecked={selected.Gender}
                />
                <FieldAge
                  schema={schema(t).age}
                  register={register}
                  errors={errors.Age}
                  fieldStyle={{ marginTop: 24 }}
                  defaultCheckedValue={selected.Age}
                />
                {/* <FieldDob
                  name="Date of Birth"
                  setValue={setValue}
                  triggerValidation={triggerValidation}
                  errors={errors['Date of Birth']}
                  style={{ marginTop: 24 }}
                  defaultValue={selected['Date of Birth'] || null}
                /> */}
                {!!watch('Gender') && (
                  <FieldHair
                    schema={schema(t).hair}
                    register={register}
                    unregister={unregister}
                    errors={errors.Hair}
                    style={{ marginTop: 24 }}
                    type={watch('Gender')}
                    age={watch('Age') || selected.Age}
                    defaultChecked={selected.Hair}
                  />
                )}
                <FieldSkin
                  schema={schema(t).skin}
                  register={register}
                  errors={errors.Skin}
                  style={{ marginTop: 24, marginBottom: 24 }}
                  defaultChecked={selected.Skin}
                />
                <Divider />
                <FieldOccupations
                  setValue={setValue}
                  triggerValidation={triggerValidation}
                  register={register}
                  errors={errors.Occupations}
                  style={{ maxWidth: 550, marginBottom: 24 }}
                  defaultValue={selected.Occupations}
                  formState={formState}
                  gender={watch('Gender')}
                />
                <Divider />
                <FieldLanguage
                  schema={schema(t).language}
                  register={register}
                  errors={errors.Language}
                  style={{ marginTop: 24 }}
                  defaultChecked={selected.Language}
                />
                <FormTextArea
                  label={t('dedication-label')}
                  hint={t('dedication-hint')}
                  name="Dedication"
                  placeholder={t('dedication-placeholder')}
                  schema={schema(t).dedication}
                  register={register}
                  errors={errors.Dedication}
                  style={{ marginTop: 24, marginBottom: 24 }}
                  defaultValue={selected.Dedication}
                />
                <Divider />
                <Button type="submit" width="100%" style={{ marginTop: 24 }}>
                  {t('save-button')}
                </Button>
              </form>
            </Card>
          </div>
          <div className={`c-char-custom__right ${stickyClassName()}`} ref={ref}>
            <div className="c-char-custom__char">
              <img id="preview-char" src="/static/images/empty.png" alt="character preview" />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .c-char-custom {
          @apply flex w-full flex-col;
          @screen md {
            @apply flex-row;
          }
          &__left {
            @apply w-full;
            @screen md {
              width: 70%;
            }
            &__container {
              padding: 36px;
            }
          }
          &__right {
            @apply hidden;
            @screen md {
              padding: 0 0 0 5%;
              width: 30%;
              @apply block;
            }
            @screen lg {
              padding: 0 0 0 8%;
            }
            @screen xl {
              padding: 0 0 0 10%;
            }
            img {
              @apply w-full object-contain;
              background: url('/static/images/loading.gif') 50% no-repeat;
              min-height: 330px;
            }
          }
          &__char {
            .c-char-custom__char--sticky & {
              @apply fixed;
              top: 100px;
              right: ${containerMargin}px;
              width: ${charWidth}px;
            }
          }
          &__name_gender {
            @apply flex flex-col;
            @screen lg {
              @apply flex-row;
            }
          }
        }
      `}</style>
      <style jsx global>{`
        .c-char-custom__name_gender {
          .c-field-gender {
            margin-top: 24px;
            @screen lg {
              @apply mt-0;
            }
          }
        }
      `}</style>
    </DefaultLayout>
  );
};

export default CharacterCustomization;
