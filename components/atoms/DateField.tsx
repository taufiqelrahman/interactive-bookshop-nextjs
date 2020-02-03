import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const DateField = (props: any) => {
  const [date, setDate] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const setFullDate = () => {
    if (!date || !month || !year) return;
    props.setValue(props.name, `${(date as any).value}-${(month as any).value}-${(year as any).value}`);
    props.triggerValidation(props.name);
  };

  const generateNumberOpts = (range: any) => {
    const numbers = [...(Array(range + 1) as any).keys()];
    numbers.shift();
    return numbers.map(num => ({ value: num, label: num }));
  };

  const handleChange = (selectedOption, setter) => {
    setter(selectedOption);
  };
  useEffect(() => {
    setFullDate();
  }, [date, month, year]);
  const dates = () => {
    const selectedMonth = month ? (month as any).value : 1;
    let range;
    if (selectedMonth % 2 === 1) {
      range = 31;
    } else {
      if (selectedMonth === 2) {
        range = 28;
      } else {
        range = 30;
      }
    }
    return generateNumberOpts(range);
  };
  const months = generateNumberOpts(12);
  return (
    <div className={`c-date-field ${props.errors ? 'c-date-field--error' : ''}`}>
      <Select
        instanceId="DD"
        placeholder="DD"
        value={date}
        options={dates()}
        onChange={e => handleChange(e, setDate)}
      />
      <Select
        instanceId="MM"
        placeholder="MM"
        value={month}
        options={months}
        onChange={e => handleChange(e, setMonth)}
      />
      <Select
        instanceId="YYYY"
        placeholder="YYYY"
        value={year}
        options={months}
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
    </div>
  );
};
DateField.displayName = 'DateField';

export default DateField;
