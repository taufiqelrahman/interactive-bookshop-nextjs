import { useTranslation } from 'next-i18next';
import React from 'react';

import Badge from 'components/atoms/Badge';
import Radio from 'components/atoms/Radio';

interface FieldAgeProps {
  fieldStyle?: React.CSSProperties;
  errors?: any;
  defaultCheckedValue?: any;
  register: (schema: any) => React.Ref<any>;
  schema?: any;
  [key: string]: any;
}

const FieldAge = (props: FieldAgeProps) => {
  const { t } = useTranslation('form');
  const ages = [
    { name: t('age-toddler'), code: 'toddler' },
    { name: t('age-kid'), code: 'kid' },
  ];
  return (
    <div style={props.fieldStyle}>
      <div className="c-field-age">
        <div className="c-field-age__header">
          {t('age-label')}
          {props.errors && <Badge>!</Badge>}
        </div>
        <div className="c-field-age__options">
          {ages.map((age) => (
            <Radio
              key={age.code}
              value={age.code}
              label={age.name}
              name="Age"
              style={{ height: 44, minWidth: 92 }}
              defaultChecked={props.defaultCheckedValue === age.code}
              ref={props.register(props.schema)}
              {...props}
            />
          ))}
        </div>
        {props.errors && <div className="c-field-age__error">{props.errors.message}</div>}
      </div>
      <style jsx>{`
        .c-field-age {
          @apply mb-4;
          @screen md {
            @apply mb-0;
          }
          &__header {
            @apply mb-3 flex font-semibold;
          }
          &__options {
            @apply flex flex-wrap;
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
FieldAge.displayName = 'FieldAge';

export default FieldAge;
