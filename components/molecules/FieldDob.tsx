import React from 'react';
import { withTranslation } from 'i18n';
import DateField from 'components/atoms/DateField';
import Badge from 'components/atoms/Badge';

const FieldDob = React.forwardRef((props: any, ref) => {
  return (
    <div style={props.style} className="c-field-dob">
      <div className="c-field-dob__header">
        {props.t('dob-label')}
        {props.errors && <Badge>!</Badge>}
      </div>
      <DateField name="dob" ref={ref} errors={props.errors} />
      <style jsx>{`
        .c-field-dob {
          &__header {
            @apply font-semibold mb-3 flex;
          }
        }
      `}</style>
    </div>
  );
});
FieldDob.displayName = 'FieldDob';

export default withTranslation('form', { withRef: true })<any>(FieldDob);
