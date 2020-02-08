import React from 'react';

const TextField = React.forwardRef((props: any, ref: any) => {
  const variantClass = props.variant ? `c-text-field--${props.variant}` : '';
  return (
    <div className={`c-text-field ${props.errors ? 'c-text-field--error' : ''} ${variantClass}`}>
      <input
        type={props.isPassword ? 'password' : 'text'}
        name={props.name}
        placeholder={props.placeholder}
        ref={ref}
      />
      <div className="c-text-field__message">{props.errors ? props.errors.message : props.hint}</div>
      <style jsx>{`
        .c-text-field {
          @apply mb-4;
          @screen md {
            @apply mb-0;
          }
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
          &__message {
            @apply text-sm text-left;
            margin-top: 7px;
            .c-text-field--error & {
              @apply text-red-600;
            }
          }
        }
      `}</style>
    </div>
  );
});
TextField.displayName = 'TextField';

export default TextField;
