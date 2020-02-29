import React from 'react';
import { withTranslation } from 'i18n';
import TextField from 'components/atoms/TextField';
import Badge from 'components/atoms/Badge';

const FormTextField: any = React.forwardRef((props: any, ref: any) => (
  <div style={props.style}>
    <div className="c-form-text-field">
      <div className="c-form-text-field__label">
        {props.label}
        {props.errors && <Badge>!</Badge>}
      </div>
      <TextField ref={ref} {...props} />
    </div>
    <style jsx>{`
      .c-form-text-field {
        @apply mb-4;
        @screen md {
          @apply mb-0;
        }
        &__label {
          @apply font-semibold mb-3 flex text-sm;
          @screen md {
            @apply text-base;
          }
        }
      }
    `}</style>
  </div>
));
FormTextField.displayName = 'FormTextField';

export default withTranslation('form', { withRef: true })<any>(FormTextField);
