import { useTranslation } from 'next-i18next';
import React from 'react';

import DateField from 'components/atoms/DateField/desktop';
import DateFieldMobile from 'components/atoms/DateField/mobile';

interface FieldDobProps {
  style?: React.CSSProperties;
  isMobile?: boolean;
  errors?: { message?: string } | null;
  name?: string;
  setValue: (field: string, value: string) => void;
  triggerValidation: (field: string) => void;
  defaultValue: string;
}

const FieldDob = (props: FieldDobProps) => {
  const { t } = useTranslation('form');
  return (
    <div style={props.style} className="c-field-dob">
      <div className="c-field-dob__header">
        {t('dob-label')}
        {/* {props.errors && <Badge>!</Badge>} */}
      </div>
      {props.isMobile ? <DateFieldMobile name="dob" {...props} /> : <DateField name="dob" {...props} />}
      {props.errors && <div className="c-field-dob__error">{props.errors.message}</div>}
      <style jsx>{`
        .c-field-dob {
          &__header {
            @apply mb-3 flex text-sm font-semibold;
            @screen md {
              @apply text-base;
            }
          }
          &__error {
            @apply mt-2 flex justify-start text-sm;
            color: #de3636;
          }
        }
      `}</style>
    </div>
  );
};
FieldDob.displayName = 'FieldDob';

export default FieldDob;
