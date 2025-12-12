import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';

import Button from 'components/atoms/Button';
import Card from 'components/atoms/Card';
import Divider from 'components/atoms/Divider';
import Stepper from 'components/atoms/Stepper';

import { CharacterPreview } from './components/CharacterPreview';
import { schema } from './helper';
import { usePreviewImage } from './hooks/usePreviewImage';
import { useStickyPreview } from './hooks/useStickyPreview';
import { CharacterFormData } from './types';

const DefaultLayout = dynamic(() => import('components/layouts/Default'));
const FieldOccupations = dynamic(() => import('components/molecules/FieldOccupations'));
const FormTextField = dynamic(() => import('components/molecules/FormTextField'));
const FieldAge = dynamic(() => import('components/molecules/FieldAge'));
const FieldGender = dynamic(() => import('components/molecules/FieldGender'));
const FieldHair = dynamic(() => import('components/molecules/FieldHair'));
const FieldSkin = dynamic(() => import('components/molecules/FieldSkin'));
const FieldLanguage = dynamic(() => import('components/molecules/FieldLanguage'));
const FormTextArea = dynamic(() => import('components/molecules/FormTextArea'));

interface DesktopViewProps {
  methods: any;
  onSubmit: (data: CharacterFormData) => void;
  selected: any;
  t: (key: string) => string;
}

export const DesktopView: React.FC<DesktopViewProps> = ({ methods, onSubmit, selected, t }) => {
  const { register, unregister, handleSubmit, errors, setValue, triggerValidation, watch, formState } = methods;
  const ref = useRef<HTMLDivElement>(null);
  const { getStickyClassName } = useStickyPreview();
  const formSchema = schema(t);

  usePreviewImage(selected, watch, false);

  useEffect(() => {
    register({ name: 'Occupations' }, formSchema.occupations);
    if (selected.Occupations) setValue('Occupations', selected.Occupations);
  }, [register, selected.Occupations, setValue, formSchema.occupations]);

  const containerWidth =
    typeof window !== 'undefined'
      ? window.innerWidth > 1023
        ? window.innerWidth * 0.75
        : (window.innerWidth * 11) / 12
      : 0;
  const containerMargin = typeof window !== 'undefined' ? (window.innerWidth - containerWidth) / 2 : 0;
  const charWidth = containerWidth * 0.3 - containerWidth * 0.08;

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
                  schema={formSchema.name}
                  register={register}
                  errors={errors.Name}
                  defaultValue={selected.Name}
                />

                <FieldGender
                  schema={formSchema.gender}
                  register={register}
                  errors={errors.Gender}
                  style={{ marginTop: 24 }}
                  defaultChecked={selected.Gender}
                />

                <FieldAge
                  schema={formSchema.age}
                  register={register}
                  errors={errors.Age}
                  fieldStyle={{ marginTop: 24 }}
                  defaultCheckedValue={selected.Age}
                />

                {!!watch('Gender') && (
                  <FieldHair
                    schema={formSchema.hair}
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
                  schema={formSchema.skin}
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
                  schema={formSchema.language}
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
                  schema={formSchema.dedication}
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

          <div className={`c-char-custom__right ${getStickyClassName()}`} ref={ref}>
            <CharacterPreview />
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
        }
      `}</style>
    </DefaultLayout>
  );
};
