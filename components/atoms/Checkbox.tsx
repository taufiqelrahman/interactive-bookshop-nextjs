import React from 'react';

const Checkbox = React.forwardRef((props: any, ref: any) => (
  <div className="c-checkbox">
    <input
      type="checkbox"
      name={props.name}
      ref={ref}
      value={props.value}
      id={`${props.name}-${props.value}`}
      defaultChecked={props.defaultChecked}
    />
    <label htmlFor={`${props.name}-${props.value}`}>
      <div className={`c-checkbox__box ${props.errors ? 'c-checkbox__box--error' : ''}`}>
        <img src={`/static/images/jobs/${props.value}`} />
      </div>
      {props.children}
    </label>
    <style jsx>{`
      .c-checkbox {
        &:last-child {
          margin-right: 0;
        }
        & input[type='checkbox'] {
          display: none;
        }
        &__box {
          @apply flex items-center justify-center;
          border: 2px solid #e1e0e7;
          height: 100px;
          width: 100px;
          border-radius: 6px;
          box-shadow: inset 0 0 0px 8px #fff;
          background: #e1e0e7;
          @screen md {
            @apply bg-transparent;
            box-shadow: none;
            height: 64px;
            width: 64px;
            border-radius: 50%;
          }
          &--error {
            border: 2px solid #de3636;
          }
          input:checked + label > & {
            box-shadow: ${props.inset && 'inset 0 0 0px 8px #445ca4'};
            border: ${props.inset ? '2px solid #445ca4' : '8px solid #445ca4'};
          }
        }
      }
    `}</style>
  </div>
));
Checkbox.displayName = 'Checkbox';

export default Checkbox;
