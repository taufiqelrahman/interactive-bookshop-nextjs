import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useState, Fragment, useMemo } from 'react';
import { useForm } from 'react-hook-form';
// import FieldDob from 'components/molecules/FieldDob';
import { useDispatch, useSelector } from 'react-redux';

import DefaultLayout from 'components/layouts/Default';
import NavBar from 'components/organisms/NavBar/mobile';
import * as gtag from 'lib/gtag';
import { RootState } from 'store';
import actions from 'store/actions';
import { CartItem } from 'store/cart/types';

import { schema, showError, previewImg, getJobIds, loadImg } from './helper';

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
  const cart = useSelector((state: RootState) => state.cart);
  const master = useSelector((state: RootState) => state.master);
  const router = useRouter();
  const [charStep, setCharStep] = useState(0);
  const [showSheet, setShowSheet] = useState(false);
  const methods = useForm({ mode: 'onChange' });
  const { register, unregister, handleSubmit, errors, setValue, triggerValidation, watch, formState } = methods;
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

  const isDev = process.env.NODE_ENV === 'development';
  const defaultSelected = isDev
    ? {
        Occupations: ['Teacher', 'Pilot', 'Police'],
        Name: 'Kalilist',
        Age: 'kid',
        Gender: 'girl',
        Skin: 'light',
        Language: 'english',
        Dedication:
          '“Aku yakin kamu pasti akan menjadi guru yang sangat baik,” kata wanita berambut kuning itu. “I believe that you will be an excellent one,” said the yellow-haired woman.',
        'Date of Birth': '03-01-2019',
        Hair: 'short',
      }
    : {};
  const selected = cart.selected || (defaultSelected as CartItem);
  const registerOccupations = () => {
    // setTimeout(() => {
    register({ name: 'Occupations' }, schema(t).occupations);
    if (selected.Occupations) setValue('Occupations', selected.Occupations);
    // }, 500);
  };
  const { occupations } = master;
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    let PARAMS = { ...selected, ...data };
    if (charStep === STEP_ENUM.OCCUPATIONS) {
      const jobIds = getJobIds(data.Occupations, occupations);
      PARAMS = { ...PARAMS, jobIds };
    }
    // if (charStep === stepEnum.AGE && !router.query.edit) {
    //   const jobIds = getJobIds(selected.Occupations, occupations);
    //   PARAMS = { ...PARAMS, jobIds };
    // }
    dispatch(actions.saveSelected(PARAMS));
    if (charStep !== STEP_ENUM.DEDICATION) {
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
    router.push('/preview');
  };
  // const pickedJobs = () => {
  //   const array = watch('Occupations').map(job => (i18n.language === 'en' ? job : t(`common:${job}`)));
  //   return array.join(', ');
  // };
  const previewImgUrl = useMemo(() => previewImg(selected, watch, true), [selected, watch]);
  useEffect(() => {
    // if (charStep === stepEnum.OCCUPATIONS) return;
    loadImg(previewImgUrl);
  }, [previewImgUrl]);
  useEffect(() => {
    if ([STEP_ENUM.AGE, STEP_ENUM.SKIN, STEP_ENUM.LANGUAGE].includes(charStep)) {
      loadImg(previewImgUrl);
    }
    if (charStep === STEP_ENUM.OCCUPATIONS) registerOccupations();
    if (charStep === STEP_ENUM.LANGUAGE) unregister('Occupations');
  }, [charStep]);
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
};

export default CharacterCustomization;
