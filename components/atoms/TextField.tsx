import React from 'react';
import NumberFormat from 'react-number-format';

const TextField = React.forwardRef((props: any, ref: any) => {
  const variantClass = props.variant ? `c-text-field--${props.variant}` : '';
  return (
    <div className={`c-text-field ${props.errors ? 'c-text-field--error' : ''} ${variantClass}`}>
      {props.name === 'phone' ? (
        <NumberFormat format="#### #### ####" name={props.name} placeholder={props.placeholder} getInputRef={ref} />
      ) : (
        <input
          type={props.isPassword ? 'password' : props.type || 'text'}
          name={props.name}
          placeholder={props.placeholder}
          ref={ref}
          defaultValue={props.defaultValue}
        />
      )}
      {(props.errors || props.hint) && (
        <div className="c-text-field__message">{props.errors ? props.errors.message : props.hint}</div>
      )}
      <style jsx>{`
        .c-text-field {
          @apply mb-4;
          @screen md {
            @apply mb-0;
          }
          &__message {
            @apply text-sm text-left;
            margin-top: 7px;
            .c-text-field--error & {
              @apply text-red-600;
            }
          }
        }
      `}</style>
      <style jsx global>{`
        .c-text-field {
          &--full-width {
            input {
              @apply w-full;
            }
          }
          input {
            @apply px-3;
            border-radius: 4px;
            height: 44px;
            border: 2px solid #e1e0e7;
            &::placeholder {
              color: #e1e1e1;
            }
          }
          &--error input {
            border: 2px solid #de3636;
          }
        }
      `}</style>
    </div>
  );
});
TextField.displayName = 'TextField';

export default TextField;
