import React, { memo } from 'react';

import Badge from 'components/atoms/Badge';
import TextField from 'components/atoms/TextField';

/**
 * Form validation error object structure
 */
interface FormError {
  type?: string;
  message?: string;
}

/**
 * Form field registration function type
 */
type RegisterFunction = (schema?: ValidationSchema) => (ref: HTMLInputElement | null) => void;

/**
 * Validation schema for form fields
 */
interface ValidationSchema {
  required?: boolean | string;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  validate?: (value: string) => boolean | string;
}

/**
 * Props interface for FormTextField component
 */
interface FormTextFieldProps {
  /** Custom CSS styles for the form wrapper */
  formStyle?: React.CSSProperties;
  /** CSS class name for the wrapper element */
  className?: string;
  /** Label text displayed above the input field */
  label?: string;
  /** Form validation errors for this field */
  errors?: FormError | FormError[] | null;
  /** Form registration function from react-hook-form */
  register: RegisterFunction;
  /** Validation schema for the form field */
  schema?: ValidationSchema;
  /** Field name for form submission and validation */
  name: string;
  /** Placeholder text for the input field */
  placeholder?: string;
  /** Default value for the input field */
  defaultValue?: string;
  /** Help text or hint displayed below the field */
  hint?: string;
  /** Custom CSS styles for the input field */
  style?: React.CSSProperties;
  /** Visual variant of the input field */
  variant?: string;
  /** Whether the field should be treated as a password input */
  isPassword?: boolean;
  /** HTML input type (text, email, number, etc.) */
  type?: string;
}

/**
 * FormTextField Component
 *
 * A reusable form field component that combines a label, input field, and error handling.
 * Integrates with react-hook-form for validation and registration.
 * Features responsive design and customizable styling.
 */
const FormTextField = memo((props: FormTextFieldProps) => {
  /** Determine if there are validation errors for this field */
  const hasErrors = Boolean(props.errors);

  /** Generate the form field reference for registration */
  const fieldRef = props.schema ? props.register(props.schema) : props.register;

  /** Extract TextField-specific props to avoid prop spreading issues */
  const textFieldProps = {
    name: props.name,
    placeholder: props.placeholder,
    defaultValue: props.defaultValue,
    hint: props.hint,
    style: props.style,
    variant: props.variant,
    isPassword: props.isPassword,
    type: props.type,
  };

  return (
    <div style={props.formStyle} className={props.className}>
      <div className="c-form-text-field">
        {/* Field label with error indicator */}
        <div className="c-form-text-field__label">
          {props.label}
          {hasErrors && <Badge aria-label="Field has validation errors">!</Badge>}
        </div>

        {/* Input field with form registration */}
        <TextField ref={fieldRef as any} {...textFieldProps} />
      </div>

      {/* Component-scoped styling with responsive design */}
      <style jsx>{`
        .c-form-text-field {
          @apply mb-5;

          /* Remove bottom margin on larger screens for tighter layouts */
          @screen md {
            @apply mb-0;
          }

          /* Label styling with flex layout for error indicator */
          &__label {
            @apply mb-3 flex text-base font-semibold;

            /* Consistent typography across screen sizes */
            @screen md {
              @apply text-base;
            }
          }
        }
      `}</style>
    </div>
  );
});

FormTextField.displayName = 'FormTextField';

export default FormTextField;
