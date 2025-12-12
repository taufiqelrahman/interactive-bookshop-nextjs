import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Button from 'components/atoms/Button';
import NavBar from 'components/organisms/NavBar/mobile';

import { CharacterPreview } from './components/CharacterPreview';
import { MobileStepContent } from './components/MobileStepContent';
import { QuitConfirmationSheet } from './components/QuitConfirmationSheet';
import { loadImg } from './helper';
import { usePreviewImage } from './hooks/usePreviewImage';
import { STEP_ENUM, CharacterFormData, StepType } from './types';

const DefaultLayout = dynamic(() => import('components/layouts/Default'));
const FieldOccupations = dynamic(() => import('components/molecules/FieldOccupations'));

interface MobileViewProps {
  methods: any;
  onSubmit: (data: CharacterFormData) => void;
  selected: any;
  t: (key: string) => string;
}

export const MobileView: React.FC<MobileViewProps> = ({ methods, onSubmit, selected, t }) => {
  const router = useRouter();
  const { register, unregister, handleSubmit, errors, setValue, triggerValidation, watch, formState } = methods;
  const [charStep, setCharStep] = useState<StepType>(STEP_ENUM.NAME_GENDER);
  const [showSheet, setShowSheet] = useState(false);

  const previewImgUrl = usePreviewImage(selected, watch, true);

  const screenHeight = '100vh - 69px';

  useEffect(() => {
    const { Name, Gender } = selected;
    if (!router.query.edit && Name && Gender) {
      setCharStep(STEP_ENUM.AGE);
    }
    if (typeof selected.Occupations === 'string') {
      selected.Occupations = selected.Occupations.split(',');
    }
  }, [router.query.edit, selected]);

  useEffect(() => {
    const ageCheck = charStep === STEP_ENUM.AGE;
    const skinCheck = charStep === STEP_ENUM.SKIN;
    const langCheck = charStep === STEP_ENUM.LANGUAGE;

    if (ageCheck || skinCheck || langCheck) {
      loadImg(previewImgUrl);
    }

    if (charStep === STEP_ENUM.OCCUPATIONS) {
      register({ name: 'Occupations' }, { required: true });
      if (selected.Occupations) setValue('Occupations', selected.Occupations);
    }

    if (charStep === STEP_ENUM.LANGUAGE) {
      unregister('Occupations');
    }
  }, [charStep, previewImgUrl, register, selected.Occupations, setValue, unregister]);

  const handleBack = () => {
    if (charStep === STEP_ENUM.NAME_GENDER) {
      router.back();
      return;
    }
    if (charStep === STEP_ENUM.OCCUPATIONS) unregister('Occupations');
    setCharStep((charStep - 1) as StepType);
  };

  const handleQuit = () => {
    setShowSheet(false);
    router.push('/');
  };

  return (
    <DefaultLayout
      navbar={
        <NavBar
          onBack={handleBack}
          isSteps={true}
          title={t('common:character-customization')}
          step={1}
          totalSteps={2}
        />
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
            </div>
          ) : (
            <div className="c-char-custom__with-preview" style={{ minHeight: `calc(${screenHeight} - 116px)` }}>
              <CharacterPreview isMobile={true} />
              <MobileStepContent
                charStep={charStep}
                selected={selected}
                register={register}
                unregister={unregister}
                errors={errors}
                watch={watch}
                t={t}
              />
            </div>
          )}
        </div>

        <div className="u-container">
          <Button type="submit" width="100%" style={{ margin: '18px 0' }}>
            {t('next-button')}
          </Button>
          <div onClick={() => setShowSheet(true)} className="c-char-custom__link">
            {t('cancel-button')}
          </div>
        </div>
      </form>

      <QuitConfirmationSheet isOpen={showSheet} onClose={() => setShowSheet(false)} onConfirm={handleQuit} t={t} />

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
