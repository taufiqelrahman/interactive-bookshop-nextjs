import React from 'react';
import Radio from 'components/atoms/Radio';
import Badge from 'components/atoms/Badge';
import { withTranslation } from 'i18n';

const FieldGender = (props: any) => {
  const genders = [
    // { name: 'boy', image: 'boy' },
    // { name: 'girl', image: 'girl' },
    { name: props.t('gender-boy'), code: 'boy' },
    { name: props.t('gender-girl'), code: 'girl' },
  ];
  return (
    <div style={props.style}>
      <div className="c-field-gender">
        <div className="c-field-gender__header">
          {props.t('gender-label')}
          {props.errors && <Badge>!</Badge>}
        </div>
        <div className="c-field-gender__options">
          {/* dummy */}
          {genders.map(gender => (
            <Radio
              key={gender.name}
              ref={props.register(props.schema)}
              value={gender.code}
              label={gender.name}
              name="Gender"
              errors={props.errors}
              style={{ height: 44, width: 84 }}
              // imageUrl={gender.image}
              // type="image"
              // variant={props.isMobile ? 'box' : ''}
              defaultChecked={props.defaultChecked === gender.name.toLowerCase()}
            />
          ))}
        </div>
      </div>
      <style jsx>{`
        .c-field-gender {
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
FieldGender.displayName = 'FieldGender';

export default withTranslation('form', { withRef: true })<any>(FieldGender);
