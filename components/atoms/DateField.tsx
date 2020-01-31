import React from 'react';

const DateField = React.forwardRef((props: any, ref: any) => {
  return (
    <div className={`c-date-field ${props.errors ? 'c-date-field--error' : ''}`}>
      <select name={props.name} ref={ref}>
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
      <style jsx>{`
        .c-date-field {
          @apply mb-4;
          @screen md {
            @apply mb-0;
          }
          select {
            @apply px-3;
            border-radius: 4px;
            height: 44px;
            border: 2px solid #e1e0e7;
            &::placeholder {
              color: #e1e1e1;
            }
          }
          &--error select {
            border: 2px solid #de3636;
          }
        }
      `}</style>
    </div>
  );
});
DateField.displayName = 'DateField';

export default DateField;
