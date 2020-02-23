import React from 'react';

const Radio = React.forwardRef((props: any, ref: any) => (
  <div className="c-radio">
    <input type="radio" name={props.name} ref={ref} value={props.value} id={`${props.name}-${props.value}`} />
    <label htmlFor={`${props.name}-${props.value}`}>
      <div className={`c-radio__button ${props.errors ? 'c-radio__button--error' : ''}`} style={props.style}>
        {props.type === 'image' ? <img src={props.imageUrl} /> : props.type !== 'plain' && props.value}
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
          &--error {
            border: 2px solid #de3636;
          }
          input:checked + label > & {
            @apply text-white;
            background: ${!props.type && '#445ca4'};
            box-shadow: ${props.type && (props.inset ? 'inset 0 0 0px 8px #445ca4' : 'inset 0 0 0px 2px white')};
            border: ${props.type && (props.inset ? '2px solid #445ca4' : '6px solid #445ca4')};
          }
        }
      }
    `}</style>
  </div>
));
Radio.displayName = 'Radio';

export default Radio;
