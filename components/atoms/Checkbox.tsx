import React from 'react';
import { useRouter } from 'next/router';

const Checkbox = (props: any) => {
  const router = useRouter();
  const isIndexPage = router.pathname === '/';
  const checkboxClass = () => {
    let className = 'c-checkbox__box';
    if (props.errors) className += ' c-checkbox__box--error';
    if (isIndexPage) className += ' c-checkbox__box--desktop';
    return className;
  };
  return (
    <div className="c-checkbox" style={props.value === 'President' ? { opacity: 0 } : {}}>
      {props.value !== 'President' && (
        <input
          type="checkbox"
          name={props.name}
          value={props.value}
          id={`${props.name}-${props.value}`}
          checked={props.checked}
          onChange={props.handleCheck}
        />
      )}
      <label htmlFor={`${props.name}-${props.value}`}>
        <div className={checkboxClass()}>
          <img src={`/static/images/jobs/${(props.value || '').toLowerCase()}.png`} />
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
            padding: 12px;
            @screen md {
              @apply bg-transparent;
              box-shadow: none;
              height: 64px;
              width: 64px;
              border-radius: 50%;
            }
            &--desktop {
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
  );
};
Checkbox.displayName = 'Checkbox';

export default Checkbox;
