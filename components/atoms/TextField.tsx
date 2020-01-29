import React from 'react';

const TextField = React.forwardRef((props: any, ref: any) => (
  <div className={`c-text-field ${props.errors ? 'c-text-field--error' : ''}`}>
    <input type="text" name={props.name} placeholder={props.placeholder} ref={ref} />
    <style jsx>{`
      .c-text-field {
        @apply mb-4;
        @screen md {
          @apply mb-0;
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
));
TextField.displayName = 'TextField';

export default TextField;
