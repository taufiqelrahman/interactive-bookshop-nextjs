import React from 'react';
import { withTranslation } from 'i18n';
import TextField from 'components/atoms/TextField';
import Badge from 'components/atoms/Badge';

const FieldName: any = React.forwardRef((props: any, ref: any) => (
  <div>
    <div className="c-field-name">
      <div className="c-field-name__header">
        {props.t('name-label')}
        {props.errors && <Badge>!</Badge>}
      </div>
      <TextField name="name" placeholder={props.t('name-placeholder')} ref={ref} errors={props.errors} />
    </div>
    <style jsx>{`
      .c-field-name {
        @apply mb-4;
        @screen md {
          @apply mb-0;
        }
        &__header {
          @apply font-semibold mb-3 flex;
        }
      }
    `}</style>
  </div>
));
FieldName.displayName = 'FieldName';

export default withTranslation('form', { withRef: true })<any>(FieldName);
