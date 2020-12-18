import React from 'react';
import { withTranslation } from 'i18n';
import TextField from 'components/atoms/TextField';
import Badge from 'components/atoms/Badge';

interface Props {
  formStyle: React.CSSProperties;
  className: string;
  label: string;
  errors: Error[];
  schema: any;
  register: any;
}
const FormTextField: React.FC<Props> = (props: Props) => {
  return (
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
            @apply font-semibold mb-3 flex text-sm;
            @screen md {
              @apply text-base;
            }
          }
        }
      `}</style>
    </div>
  );
};
FormTextField.displayName = 'FormTextField';

export default withTranslation('form', { withRef: true })<any>(FormTextField);
