import React from 'react';

const TextArea = React.forwardRef((props: any, ref: any) => (
  <div className={`c-text-area ${props.errors ? 'c-text-area--error' : ''}`}>
    <textarea name={props.name} placeholder={props.placeholder} rows={3} ref={ref} />
    <style jsx>{`
      .c-text-area {
        @apply mb-4;
        @screen md {
          @apply mb-0;
        }
        textarea {
          @apply px-3 w-full;
          padding: 16px;
          height: 104px;
          border: 2px solid #e1e0e7;
          border-radius: 6px;
          line-height: 25px;
          &::placeholder {
            color: #e1e1e1;
          }
        }
        &--error textarea {
          border: 2px solid #de3636;
        }
      }
    `}</style>
  </div>
));
TextArea.displayName = 'TextArea';

export default TextArea;
