import React from 'react';

import Badge from 'components/atoms/Badge';
import TextField from 'components/atoms/TextField';

interface FormTextFieldProps {
  formStyle?: React.CSSProperties;
  className?: string;
  label?: string;
  errors?: any;
  register: (schema?: any) => (ref: HTMLInputElement | null) => void;
  schema?: any;
  name: string;
  placeholder?: string;
  defaultValue?: string;
  hint?: string;
  style?: React.CSSProperties;
  variant?: string;
  isPassword?: boolean;
  type?: string;
}

const FormTextField = (props: FormTextFieldProps) => (
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
          @apply mb-3 flex text-base font-semibold;
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
