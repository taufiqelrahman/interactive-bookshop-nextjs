import React from 'react';
import { withTranslation } from 'i18n';
import Radio from 'components/atoms/Radio';
import Badge from 'components/atoms/Badge';

const FieldAge = (props: any) => {
  const ages = [
    { name: props.t('age-toddler'), code: 'toddler' },
    { name: props.t('age-kid'), code: 'kid' },
  ];
  return (
    <div>
      <div className="c-field-age">
        <div className="c-field-age__header">
          {props.t('age-label')}
          {props.errors && <Badge>!</Badge>}
        </div>
        <div className="c-field-age__options">
          {ages.map(age => (
            <Radio
              key={age.code}
              value={age.code}
              label={age.name}
              name="Age"
              style={{ height: 44, minWidth: 92 }}
              defaultChecked={props.defaultChecked === age.code}
              ref={props.register(props.schema)}
              {...props}
            />
          ))}
        </div>
      </div>
      <style jsx>{`
        .c-field-age {
          @apply mb-4;
          @screen md {
            @apply mb-0;
          }
          &__header {
            @apply font-semibold mb-3 flex;
          }
          &__options {
            @apply flex flex-wrap;
          }
        }
      `}</style>
    </div>
  );
};
FieldAge.displayName = 'FieldAge';

export default withTranslation('form', { withRef: true })<any>(FieldAge);
