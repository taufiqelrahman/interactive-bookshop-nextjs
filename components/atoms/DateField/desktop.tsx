import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { customStyles, dates, months, years } from './helper';

const DateField = (props: any) => {
  const [date, setDate]: any = useState(null);
  const [month, setMonth]: any = useState(null);
  const [year, setYear]: any = useState(null);
  const setFullDate = () => {
    if (!date || !month || !year) return;
    props.setValue(props.name, `${(date as any).value}-${(month as any).value}-${(year as any).value}`);
    props.triggerValidation(props.name);
  };
  const setDefaultDate = () => {
    const parsed = props.defaultValue.split('-');
    if (parsed.length !== 3) return;
    setDate({ label: parsed[0], value: parsed[0] });
    setMonth({ label: parsed[1], value: parsed[1] });
    setYear({ label: parsed[2], value: parsed[2] });
  };
  const handleChange = (selectedOption, setter) => {
    setter(selectedOption);
  };
  useEffect(() => {
    setFullDate();
  }, [date, month, year]);
  useEffect(() => {
    setTimeout(() => {
      if (props.defaultValue) setDefaultDate();
    }, 1000);
  }, []);
  return (
    <div className={`c-date-field ${props.errors ? 'c-date-field--error' : ''}`}>
      <Select
        styles={customStyles}
        className="c-date-field__date"
        instanceId="DD"
        placeholder="DD"
        value={date}
        options={dates(month)}
        onChange={e => handleChange(e, setDate)}
      />
      <Select
        styles={customStyles}
        className="c-date-field__month"
        instanceId="MM"
        placeholder="MM"
        value={month}
        options={months}
        onChange={e => handleChange(e, setMonth)}
      />
      <Select
        styles={customStyles}
        className="c-date-field__year"
        instanceId="YYYY"
        placeholder="YYYY"
        value={year}
        options={years()}
        onChange={e => handleChange(e, setYear)}
      />
      <style jsx>{`
        .c-date-field {
          @apply mb-4 flex;
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
      <style jsx global>{`
        .c-date-field {
          &__date,
          &__month {
            width: 82px;
            margin-right: 6px;
          }
          &__year {
            width: 102px;
          }
        }
      `}</style>
    </div>
  );
};
DateField.displayName = 'DateField';

export default DateField;
