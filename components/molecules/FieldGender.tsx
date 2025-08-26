import { useTranslation } from 'next-i18next/dist/types/appWithTranslation';
import React from 'react';

import Badge from 'components/atoms/Badge';
import Radio from 'components/atoms/Radio';

const FieldGender = (props: any) => {
  const { t } = useTranslation('form');
  const genders = [
    // { name: 'boy', image: 'boy' },
    // { name: 'girl', image: 'girl' },
    { name: t('gender-boy'), code: 'boy' },
    { name: t('gender-girl'), code: 'girl' },
  ];
  return (
    <div style={props.style} className={props.className}>
      <div className="c-field-gender">
        <div className="c-field-gender__header">
          {t('gender-label')}
          {props.errors && <Badge>!</Badge>}
        </div>
        <div className="c-field-gender__options">
          {/* dummy */}
          {genders.map((gender) => (
            <Radio
              key={gender.name}
              ref={props.register(props.schema)}
              value={gender.code}
              label={gender.name}
              name="Gender"
              errors={props.errors}
              style={{ height: 44, width: 106 }}
              // imageUrl={gender.image}
              // type="image"
              // variant={props.isMobile ? 'box' : ''}
              defaultChecked={props.defaultChecked === gender.code.toLowerCase()}
            />
          ))}
        </div>
        {props.errors && <div className="c-field-gender__error">{props.errors.message}</div>}
      </div>
      <style jsx>{`
        .c-field-gender {
          @apply mb-5;
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
FieldGender.displayName = 'FieldGender';

export default FieldGender;
