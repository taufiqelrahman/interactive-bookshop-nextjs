import React from 'react';

import Badge from 'components/atoms/Badge';
import TextArea from 'components/atoms/TextArea';

interface FormTextAreaProps {
  style?: React.CSSProperties;
  label?: string;
  hint?: string;
  name: string;
  placeholder?: string;
  register: (schema: any) => (ref: HTMLTextAreaElement | null) => void;
  schema: any;
  errors?: any;
  defaultValue?: string;
}

const FormTextArea = (props: FormTextAreaProps) => (
  <div style={props.style}>
    <div className="c-form-text-area">
      <div className="c-form-text-area__label">
        {props.label}
        {props.errors && <Badge>!</Badge>}
      </div>
      <div className="c-form-text-area__hint">{props.hint}</div>
      <TextArea
        name={props.name}
        placeholder={props.placeholder}
        ref={props.register(props.schema)}
        errors={props.errors}
        defaultValue={props.defaultValue}
      />
    </div>
    <style jsx>{`
      .c-form-text-area {
        @apply mb-4;
        @screen md {
          @apply mb-0;
        }
        &__label {
          @apply mb-2 flex text-sm font-semibold;
          @screen md {
            @apply text-base;
          }
        }
        &__hint {
          @apply mb-3 text-sm;
          line-height: 19px;
          @screen md {
            @apply text-xs;
          }
        }
        &__options {
          @apply flex flex-wrap;
        }
      }
    `}</style>
  </div>
);
FormTextArea.displayName = 'FormTextArea';

export default FormTextArea;
