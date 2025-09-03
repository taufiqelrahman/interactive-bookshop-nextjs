import React, { CSSProperties, ReactNode, ChangeEvent } from 'react';

interface ToggleProps {
  value: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  style?: CSSProperties;
  children?: ReactNode;
}

const Toggle: React.FC<ToggleProps> = (props) => {
  return (
    <div>
      <label className="c-toggle" style={props.style}>
        <input type="checkbox" checked={props.value} onChange={props.onChange} />
        <span className="c-toggle__slider">{props.children}</span>
      </label>
      <style jsx>{`
        /* The switch - the box around the slider */
        .c-toggle {
          @apply relative inline-block;
          width: 104px;
          height: 34px;
          border: 1px solid #efeef4;
          border-radius: 4px;

          /* Hide default HTML checkbox */
          input {
            @apply h-0 w-0 opacity-0;
          }

          /* The slider */
          &__slider {
            @apply absolute inset-0 cursor-pointer;
            -webkit-transition: 0.4s;
            transition: 0.4s;

            &:before {
              @apply absolute bg-dark-grey;
              content: '';
              height: 28px;
              width: 48px;
              left: 2px;
              bottom: 2px;
              -webkit-transition: 0.4s;
              transition: 0.4s;
              border-radius: 4px;

              input:checked + & {
                -webkit-transform: translateX(50px);
                -ms-transform: translateX(50px);
                transform: translateX(50px);
              }
            }

            input:checked + & {
              @apply bg-transparent;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default Toggle;
