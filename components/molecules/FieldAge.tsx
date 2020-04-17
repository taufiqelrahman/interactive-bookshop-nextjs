import React from 'react';
import { withTranslation } from 'i18n';
import Radio from 'components/atoms/Radio';
import Badge from 'components/atoms/Badge';

const FieldAge = React.forwardRef((props: any, ref: any) => (
  <div>
    <div className="c-field-age">
      <div className="c-field-age__header">
        {props.t('age-label')}
        {props.errors && <Badge>!</Badge>}
      </div>
      <div className="c-field-age__options">
        {/* dummy */}
        {ref &&
          [props.t('age-toddler'), props.t('age-kid')].map(age => (
            <Radio
              key={age}
              ref={ref}
              value={age.toLowerCase()}
              label={age}
              name="Age"
              errors={props.errors}
              style={{ height: 44, minWidth: 92 }}
              defaultChecked={props.defaultChecked === age.toLowerCase()}
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
));
FieldAge.displayName = 'FieldAge';

export default withTranslation('form', { withRef: true })<any>(FieldAge);
