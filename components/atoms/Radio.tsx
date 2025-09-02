import React, { forwardRef } from 'react';
// import { ConnectForm } from 'lib/form-connect';
// import { useFormContext } from 'react-hook-form';

interface RadioProps {
  name: string;
  value: string;
  defaultChecked?: boolean;
  label?: string;
  type?: string;
  imageUrl?: string;
  style?: React.CSSProperties;
  errors?: { message?: string } | null;
  inset?: boolean;
  children?: React.ReactNode;
  variant?: string;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  // const { register } = useFormContext();
  const errorClass = props.errors ? 'c-radio__button--error' : '';
  const variantClass = props.variant ? `c-radio__button--${props.variant}` : '';
  return (
    <div className="c-radio">
      <input
        type="radio"
        name={props.name}
        ref={ref}
        value={props.value}
        id={`${props.name}-${props.value}`}
        defaultChecked={props.defaultChecked}
      />
      <label htmlFor={`${props.name}-${props.value}`}>
        <div className={`c-radio__button ${variantClass} ${errorClass}`} style={props.style}>
          {props.type === 'image' ? (
            <img src={props.imageUrl} alt="radio button" />
          ) : (
            props.type !== 'plain' && props.label
          )}
        </div>
      </label>
      <style jsx>{`
        .c-radio {
          margin-right: 6px;
          &:last-child {
            margin-right: 0;
          }
          & input[type='radio'] {
            display: none;
          }
          &__button {
            @apply flex items-center justify-center font-bold;
            border: 2px solid #e1e0e7;
            border-radius: 6px;
            &:last-child {
              margin-right: 0 !important;
            }
            &--box {
              height: 100px;
              width: 100px;
              box-shadow: inset 0 0 0px 8px #fff;
              padding: 6px;
            }
            &--error {
              border: 2px solid #de3636;
            }
            input:checked + label > & {
              @apply text-white;
              background: ${!props.type && '#445ca4'};
              box-shadow: none;
              border: ${props.type && (props.inset ? '2px solid #445ca4' : '10px solid #445ca4')};
              box-shadow: ${props.type && (props.inset ? 'inset 0 0 0px 8px #445ca4' : 'inset 0 0 0px 2px white')};
              @screen md {
                border: ${props.type && (props.inset ? '2px solid #445ca4' : '6px solid #445ca4')};
              }
            }
          }
        }
      `}</style>
    </div>
  );
});
Radio.displayName = 'Radio';

export default Radio;
