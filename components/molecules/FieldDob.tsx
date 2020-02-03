import React from 'react';
import { withTranslation } from 'i18n';
import DateField from 'components/atoms/DateField';
import Badge from 'components/atoms/Badge';

const FieldDob = (props: any) => {
  return (
    <div style={props.style} className="c-field-dob">
      <div className="c-field-dob__header">
        {props.t('dob-label')}
        {props.errors && <Badge>!</Badge>}
      </div>
      <DateField name="dob" {...props} />
      <style jsx>{`
        .c-field-dob {
          &__header {
            @apply font-semibold mb-3 flex;
          }
        }
      `}</style>
    </div>
  );
};
FieldDob.displayName = 'FieldDob';

export default withTranslation('form')(FieldDob);
