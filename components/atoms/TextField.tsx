import React, { Fragment, useState } from 'react';
import NumberFormat from 'react-number-format';

const TextField = React.forwardRef((props: any, ref: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const variantClass = () => {
    if (!props.variant) return '';
    const variants = props.variant.split(',');
    return variants.map(variant => `c-text-field--${variant}`).join(' ');
  };
  return (
    <div className={`c-text-field ${props.errors ? 'c-text-field--error' : ''} ${variantClass()}`} style={props.style}>
      {props.name === 'phone' ? (
        <NumberFormat
          format="#### #### ####"
          name={props.name}
          placeholder={props.placeholder}
          getInputRef={ref}
          defaultValue={props.defaultValue}
        />
      ) : (
        <Fragment>
          <input
            type={props.isPassword && !showPassword ? 'password' : props.type || 'text'}
            name={props.name}
            placeholder={props.placeholder}
            ref={ref}
            defaultValue={props.defaultValue}
          />
          {props.isPassword && (
            <span
              onClick={togglePassword}
              className={`c-text-field__show-password ${showPassword ? 'icon-eye-show' : 'icon-eye_hide'}`}
            />
          )}
        </Fragment>
      )}
      {(props.errors || props.hint) && (
        <div className="c-text-field__message">{props.errors ? props.errors.message : props.hint}</div>
      )}
      <style jsx>{`
        .c-text-field {
          @apply mb-4 relative;
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
          &__show-password {
            @apply absolute cursor-pointer;
            right: 30px;
            transform: translateY(90%);
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
          &--large {
            width: 400px;
            input {
              width: 400px;
            }
          }
          &--open-sans {
            input {
              @apply font-opensans;
            }
          }
          input {
            @apply px-3 text-sm;
            border-radius: 4px;
            height: 44px;
            border: 2px solid #e1e0e7;
            @screen md {
              @apply text-base;
            }
            &::placeholder {
              @apply text-sm;
              color: #e1e1e1;
              @screen md {
                @apply text-base;
              }
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
