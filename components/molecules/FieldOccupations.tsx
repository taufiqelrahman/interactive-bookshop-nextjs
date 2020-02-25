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
        {['Astronaut', 'Doctor', 'Ballerina', 4, 5, 6, 7, 8, 9].map(job => (
          <div key={job} className="c-field-occupations__options__box">
            <Checkbox ref={ref} value={job} name="occupations" errors={props.errors} inset={true}>
              <span>{job}</span>
            </Checkbox>
          </div>
        ))}
      </div>
      {/* {props.errors && 'Requires 3 occupations'} */}
    </div>
    <style jsx>{`
      .c-field-occupations {
        &__header {
          @apply font-semibold mb-6 flex justify-center;
          @screen md {
            @apply justify-start;
          }
        }
        &__options {
          @apply flex flex-wrap;
          margin-bottom: 30px;
          @screen md {
            @apply mb-0;
          }
          &__box {
            @apply mb-2 flex justify-center;
            flex: 1 0 33%;
            @screen md {
              margin-right: 3%;
              flex: unset;
            }
            span {
              @apply flex justify-center font-bold text-xs;
              margin-top: 4px;
              line-height: 16px;
            }
          }
        }
      }
    `}</style>
    <style jsx global>{`
      input:checked + label > span {
        color: #445ca4;
      }
    `}</style>
  </div>
));
FieldOccupations.displayName = 'FieldOccupations';

export default withTranslation('form', { withRef: true })<any>(FieldOccupations);
