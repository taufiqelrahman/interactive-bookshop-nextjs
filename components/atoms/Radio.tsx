import React from 'react';
import { ConnectForm } from 'lib/form-connect';

const Radio = (props: any) => {
  const errorClass = props.errors ? 'c-radio__button--error' : '';
  const variantClass = props.variant ? `c-radio__button--${props.variant}` : '';
  return (
    <div className="c-radio">
      <ConnectForm>
        {({ register }) => (
          <input
            type="radio"
            name={props.name}
            ref={register(props.schema)}
            value={props.value}
            id={`${props.name}-${props.value}`}
            defaultChecked={props.defaultChecked}
          />
        )}
      </ConnectForm>
      <label htmlFor={`${props.name}-${props.value}`}>
        <div className={`c-radio__button ${variantClass} ${errorClass}`} style={props.style}>
          {props.type === 'image' ? <img src={props.imageUrl} /> : props.type !== 'plain' && props.label}
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
            background: #e1e0e7;
            border-radius: 6px;
            &--box {
              height: 100px;
              width: 100px;
              box-shadow: inset 0 0 0px 8px #fff;
            }
            &--error {
              border: 2px solid #de3636;
            }
            input:checked + label > & {
              @apply text-white;
              background: ${!props.type && '#445ca4'};
              box-shadow: none;
              border: ${props.type && (props.inset ? '2px solid #445ca4' : '10px solid #445ca4')};
              @screen md {
                border: ${props.type && (props.inset ? '2px solid #445ca4' : '6px solid #445ca4')};
                box-shadow: ${props.type && (props.inset ? 'inset 0 0 0px 8px #445ca4' : 'inset 0 0 0px 2px white')};
              }
            }
          }
        }
      `}</style>
    </div>
  );
};
Radio.displayName = 'Radio';

export default Radio;
