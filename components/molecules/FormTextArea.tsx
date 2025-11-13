import React, { memo } from 'react';

import Badge from 'components/atoms/Badge';
import TextArea from 'components/atoms/TextArea';
import { ValidationRule } from 'lib/validation';

/**
 * Form validation error object structure
 */
interface FormError {
  type?: string;
  message?: string;
}

/**
 * Form field registration function type for textarea
 */
type TextAreaRegisterFunction = (schema: ValidationRule) => (ref: HTMLTextAreaElement | null) => void;

/**
 * Props interface for FormTextArea component
 */
interface FormTextAreaProps {
  /** Custom CSS styles for the form wrapper */
  style?: React.CSSProperties;
  /** Label text displayed above the textarea field */
  label?: string;
  /** Help text or hint displayed below the label */
  hint?: string;
  /** Field name for form submission and validation */
  name: string;
  /** Placeholder text for the textarea field */
  placeholder?: string;
  /** Form registration function from react-hook-form */
  register: TextAreaRegisterFunction;
  /** Validation schema for the form field */
  schema: ValidationRule;
  /** Form validation errors for this field */
  errors?: FormError | FormError[] | null;
  /** Default value for the textarea field */
  defaultValue?: string;
}

/**
 * FormTextArea Component
 *
 * A reusable form textarea component that combines a label, textarea field, hint text,
 * and error handling. Integrates with react-hook-form for validation and registration.
 * Features responsive design and customizable styling.
 */
const FormTextArea = memo((props: FormTextAreaProps) => {
  /** Determine if there are validation errors for this field */
  const hasErrors = Boolean(props.errors);

  /** Extract the first error message for display in TextArea component */
  const errorMessage = Array.isArray(props.errors) ? props.errors[0]?.message : props.errors?.message;

  /** Generate the form field reference for registration */
  const fieldRef = props.register(props.schema);

  /** Prepare error object compatible with TextArea component */
  const textAreaErrors = errorMessage ? { message: errorMessage } : undefined;

  return (
    <div style={props.style}>
      <div className="c-form-text-area">
        {/* Field label with error indicator */}
        <div className="c-form-text-area__label">
          {props.label}
          {hasErrors && <Badge aria-label="Field has validation errors">!</Badge>}
        </div>

        {/* Help text or instructions for the field */}
        {props.hint && <div className="c-form-text-area__hint">{props.hint}</div>}

        {/* Textarea field with form registration */}
        <TextArea
          name={props.name}
          placeholder={props.placeholder}
          ref={fieldRef as any}
          errors={textAreaErrors}
          defaultValue={props.defaultValue}
        />
      </div>

      {/* Component-scoped styling with responsive design */}
      <style jsx>{`
        .c-form-text-area {
          @apply mb-4;

          /* Remove bottom margin on larger screens for tighter layouts */
          @screen md {
            @apply mb-0;
          }

          /* Label styling with flex layout for error indicator */
          &__label {
            @apply mb-2 flex text-sm font-semibold;

            /* Larger text on desktop for better readability */
            @screen md {
              @apply text-base;
            }
          }

          /* Hint text styling with responsive typography */
          &__hint {
            @apply mb-3 text-sm;
            line-height: 19px;

            /* Smaller text on desktop to conserve space */
            @screen md {
              @apply text-xs;
            }
          }

          /* Options container for future extensibility */
          &__options {
            @apply flex flex-wrap;
          }
        }
      `}</style>
    </div>
  );
});

FormTextArea.displayName = 'FormTextArea';

export default FormTextArea;
