import React from 'react';

import Badge from 'components/atoms/Badge';
import TextField from 'components/atoms/TextField';

const FormTextField = (props: any) => (
  <div style={props.formStyle} className={props.className}>
    <div className="c-form-text-field">
      <div className="c-form-text-field__label">
        {props.label}
        {props.errors && <Badge>!</Badge>}
      </div>
      <TextField ref={props.schema ? props.register(props.schema) : props.register} {...props} />
    </div>
    <style jsx>{`
      .c-form-text-field {
        @apply mb-5;
        @screen md {
          @apply mb-0;
        }
        &__label {
          @apply mb-3 flex text-sm font-semibold;
          @screen md {
            @apply text-base;
          }
        }
      }
    `}</style>
  </div>
);
FormTextField.displayName = 'FormTextField';

export default FormTextField;
