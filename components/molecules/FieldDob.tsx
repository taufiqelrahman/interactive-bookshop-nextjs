import React from 'react';
import { withTranslation } from 'i18n';
import DateField from 'components/atoms/DateField/desktop';
import DateFieldMobile from 'components/atoms/DateField/mobile';
// import Badge from 'components/atoms/Badge';

const FieldDob = (props: any) => {
  return (
    <div style={props.style} className="c-field-dob">
      <div className="c-field-dob__header">
        {props.t('dob-label')}
        {/* {props.errors && <Badge>!</Badge>} */}
      </div>
      {props.isMobile ? <DateFieldMobile name="dob" {...props} /> : <DateField name="dob" {...props} />}
      {props.errors && <div className="c-field-dob__error">{props.errors.message}</div>}
      <style jsx>{`
        .c-field-dob {
          &__header {
            @apply font-semibold mb-3 flex text-sm;
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

export default withTranslation('form')(FieldDob);
