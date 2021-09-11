import { Selected } from './desktop';

export const customStyles = {
  menu: (provided: any) => ({
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
  option: (provided: any) => ({
    ...provided,
    '&:hover': {
      background: '#333',
      color: 'white',
    },
  }),
  control: (provided: any, state: any) => ({
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

const padNumber = (number: number) => {
  let s = String(number);
  while (s.length < 2) {
    s = `0${s}`;
  }
  return s;
};

const generateNumberOpts = (range: any): any => {
  const numbers = [...(Array(range + 1) as any).keys()];
  numbers.shift();
  return numbers.map(num => ({ value: padNumber(num), label: padNumber(num) }));
};

export const dates = (month: Selected | null) => {
  const selectedMonth = month ? month.value : 1;
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

export const months = generateNumberOpts(12);

export const years = (): any => {
  const now = new Date().getUTCFullYear();
  return Array(now - (now - 20))
    .fill('')
    .map((_v, idx) => ({ value: now - idx, label: now - idx }));
};
