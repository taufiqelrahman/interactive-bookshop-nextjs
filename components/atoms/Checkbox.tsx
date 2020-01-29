import React from 'react';

const Checkbox = React.forwardRef((props: any, ref: any) => (
  <div className="c-checkbox">
    <input type="checkbox" name={props.name} ref={ref} value={props.value} id={`${props.name}-${props.value}`} />
    <label htmlFor={`${props.name}-${props.value}`}>
      <div className={`c-checkbox__box ${props.errors ? 'c-checkbox__box--error' : ''}`}>{props.value}</div>
    </label>
    <style jsx>{`
      .c-checkbox {
        @apply mb-2;
        margin-right: 20px;
        @screen lg {
          margin-right: 34px;
        }
        &:last-child {
          margin-right: 0;
        }
        & input[type='checkbox'] {
          display: none;
        }
        &__box {
          @apply flex items-center justify-center;
          height: 64px;
          width: 64px;
          border: 2px solid #e1e0e7;
          border-radius: 50%;
          &--error {
            border: 2px solid #de3636;
          }
          input:checked + label > & {
            border: 8px solid #445ca4;
          }
        }
      }
    `}</style>
  </div>
));
Checkbox.displayName = 'Checkbox';

export default Checkbox;
