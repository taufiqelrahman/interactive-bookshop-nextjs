import React from 'react';
import { withTranslation } from 'i18n';
import Checkbox from 'components/atoms/Checkbox';
import Badge from 'components/atoms/Badge';

const FieldOccupations = React.forwardRef((props: any, ref: any) => (
  <div style={props.style}>
    <div className="c-field-occupations">
      <div className="c-field-occupations__header">
        {props.t('occupations-label')}
        {props.errors && <Badge>!</Badge>}
      </div>
      <div className="c-field-occupations__options">
        {/* dummy */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(job => (
          <div key={job} className="c-field-occupations__options__box">
            <Checkbox ref={ref} value={job} name="occupations" errors={props.errors} />
          </div>
        ))}
      </div>
      {/* {props.errors && 'Requires 3 occupations'} */}
    </div>
    <style jsx>{`
      .c-field-occupations {
        &__header {
          @apply font-semibold mb-6 flex;
        }
        &__options {
          @apply flex flex-wrap;
          &__box {
            @apply mb-2;
            margin-right: 2%;
          }
        }
      }
    `}</style>
  </div>
));
FieldOccupations.displayName = 'FieldOccupations';

export default withTranslation('form', { withRef: true })<any>(FieldOccupations);
