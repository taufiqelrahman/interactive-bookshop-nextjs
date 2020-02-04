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

  const padNumber = number => {
    let s = String(number);
    while (s.length < 2) {
      s = `0${s}`;
    }
    return s;
  };

  const generateNumberOpts = (range: any) => {
    const numbers = [...(Array(range + 1) as any).keys()];
    numbers.shift();
    return numbers.map(num => ({ value: padNumber(num), label: padNumber(num) }));
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
  const years = () => {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 20))
      .fill('')
      .map((_v, idx) => ({ value: now - idx, label: now - idx }));
  };
  const customStyles = {
    menu: provided => ({
      ...provided,
      marginTop: 0,
      border: '2px solid #333',
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
      borderTop: 'none',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    option: provided => ({
      ...provided,
      '&:hover': {
        background: '#333',
        color: 'white',
      },
    }),
    control: (provided, state) => ({
      ...provided,
      borderWidth: 2,
      borderType: 'solid',
      borderColor: state.isFocused ? '#333' : '#e1e0e7',
      borderBottomRightRadius: state.isFocused ? 0 : provided.borderBottomRightRadius,
      borderBottomLeftRadius: state.isFocused ? 0 : provided.borderBottomLeftRadius,
      paddingLeft: 6,
      '.c-date-field--error &': {
        border: '2px solid #de3636',
      },
    }),
  };
  return (
    <div className={`c-date-field ${props.errors ? 'c-date-field--error' : ''}`}>
      <Select
        styles={customStyles}
        className="c-date-field__date"
        instanceId="DD"
        placeholder="DD"
        value={date}
        options={dates()}
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
