import dynamic from 'next/dynamic';
import { Fragment } from 'react';
import { FieldErrors } from 'react-hook-form';

import { schema } from '../helper';
import { CharacterFormData, STEP_ENUM } from '../types';

const FormTextField = dynamic(() => import('components/molecules/FormTextField'));
const FieldGender = dynamic(() => import('components/molecules/FieldGender'));
const FieldAge = dynamic(() => import('components/molecules/FieldAge'));
const FieldHair = dynamic(() => import('components/molecules/FieldHair'));
const FieldSkin = dynamic(() => import('components/molecules/FieldSkin'));
const FieldLanguage = dynamic(() => import('components/molecules/FieldLanguage'));
const FormTextArea = dynamic(() => import('components/molecules/FormTextArea'));

interface MobileStepContentProps {
  charStep: number;
  selected: any;
  register: any;
  unregister: any;
  errors: FieldErrors<CharacterFormData>;
  watch: any;
  t: (key: string) => string;
}

export const MobileStepContent: React.FC<MobileStepContentProps> = ({
  charStep,
  selected,
  register,
  unregister,
  errors,
  watch,
  t,
}) => {
  const formSchema = schema(t);

  return (
    <div className="u-container c-char-custom__tab">
      {charStep === STEP_ENUM.NAME_GENDER && (
        <Fragment>
          <FormTextField
            label={t('nickname-label')}
            name="Name"
            placeholder={t('name-placeholder')}
            schema={formSchema.name}
            register={register}
            errors={errors.Name}
            defaultValue={selected.Name}
            variant="full-width"
          />
          <FieldGender
            schema={formSchema.gender}
            register={register}
            errors={errors.Gender}
            isMobile={true}
            defaultChecked={selected.Gender}
          />
        </Fragment>
      )}

      {charStep === STEP_ENUM.AGE && (
        <FieldAge schema={formSchema.age} register={register} errors={errors.Age} defaultCheckedValue={selected.Age} />
      )}

      {charStep === STEP_ENUM.HAIR && (
        <FieldHair
          schema={formSchema.hair}
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
          schema={formSchema.skin}
          errors={errors.Skin}
          isMobile={true}
          defaultChecked={selected.Skin}
          register={register}
        />
      )}

      {charStep === STEP_ENUM.LANGUAGE && (
        <FieldLanguage
          schema={formSchema.language}
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
          schema={formSchema.dedication}
          register={register}
          errors={errors.Dedication}
          defaultValue={selected.Dedication}
        />
      )}
    </div>
  );
};
