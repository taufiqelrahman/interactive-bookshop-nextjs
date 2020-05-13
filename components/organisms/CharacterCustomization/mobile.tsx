import { useForm } from 'react-hook-form';
import { useEffect, useState, Fragment } from 'react';
import { withTranslation, Router } from 'i18n';
import FieldOccupations from 'components/molecules/FieldOccupations';
import FormTextField from 'components/molecules/FormTextField';
import FieldAge from 'components/molecules/FieldAge';
// import FieldDob from 'components/molecules/FieldDob';
import FieldGender from 'components/molecules/FieldGender';
import FieldHair from 'components/molecules/FieldHair';
import FieldSkin from 'components/molecules/FieldSkin';
import FieldLanguage from 'components/molecules/FieldLanguage';
import FormTextArea from 'components/molecules/FormTextArea';
import Button from 'components/atoms/Button';
import { schema, showError, previewImg, getJobIds, loadImg } from './helper';
import DefaultLayout from 'components/layouts/Default';
import NavBar from 'components/organisms/NavBar/mobile';
import Sheet from 'components/atoms/Sheet';
import { useRouter } from 'next/router';

const CharacterCustomization = (props: any) => {
  const router = useRouter();
  const stepEnum = {
    NAME_GENDER: 0,
    AGE: 1,
    // DOB: 3,
    HAIR: 2,
    SKIN: 3,
    OCCUPATIONS: 4,
    LANGUAGE: 5,
    DEDICATION: 6,
  };
  const [charStep, setCharStep] = useState(0);
  const [showSheet, setShowSheet] = useState(false);
  const methods = useForm({ mode: 'onChange' });
  const { register, unregister, handleSubmit, errors, setValue, triggerValidation, watch, formState } = methods;
  const cancel = () => {
    setShowSheet(true);
  };
  const quit = () => {
    props.setSheet(false);
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
  const selected = props.state.cart.selected || {
    // Occupations: ['Teacher', 'Pilot', 'Police'],
    // Name: 'Kalilist',
    // Age: 'kid',
    // Gender: 'girl',
    // Skin: 'light',
    // Language: 'english',
    // Dedication:
    //   '“Aku yakin kamu pasti akan menjadi guru yang sangat baik,” kata wanita berambut kuning itu. “I believe that you will be an excellent one,” said the yellow-haired woman.',
    // 'Date of Birth': '03-01-2019',
    // Hair: 'short',
  };
  const registerOccupations = () => {
    // setTimeout(() => {
    register({ name: 'Occupations' }, schema(props).occupations);
    if (selected.Occupations) setValue('Occupations', selected.Occupations);
    // }, 500);
  };
  const { occupations } = props.state.master;
  const onSubmit = data => {
    let PARAMS = { ...selected, ...data };
    if (charStep === stepEnum.OCCUPATIONS) {
      const jobIds = getJobIds(data.Occupations, occupations);
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
    if ([stepEnum.AGE, stepEnum.SKIN, stepEnum.LANGUAGE].includes(charStep)) {
      loadImg(previewImg(selected, watch, true));
    }
    if (charStep === stepEnum.OCCUPATIONS) registerOccupations();
    if (charStep === stepEnum.LANGUAGE) unregister('Occupations');
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
        />
      }
    >
      <form className="c-char-custom" style={{ height: `calc(${screenHeight})` }} onSubmit={handleSubmit(onSubmit)}>
        <div>
          {charStep === stepEnum.OCCUPATIONS ? (
            <div className="u-container u-container__page">
              <FieldOccupations
                setValue={setValue}
                triggerValidation={triggerValidation}
                register={register}
                errors={errors.Occupations}
                defaultValue={selected.Occupations}
                occupations={occupations}
                isMobile={props.isMobile}
                formState={formState}
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
