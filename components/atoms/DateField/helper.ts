export const customStyles = {
  menu: (provided) => ({
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
  option: (provided) => ({
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

const padNumber = (number: number): string => {
  let s = String(number);
  while (s.length < 2) {
    s = `0${s}`;
  }
  return s;
};

export interface Option {
  value: string;
  label: string;
}

const generateNumberOpts = (range: number): Option[] => {
  const numbers = Array.from({ length: range + 1 }, (_, i) => i);
  numbers.shift();
  return numbers.map((num) => ({ value: padNumber(num), label: padNumber(num) }));
};

export const dates = (month: Option | null): Option[] => {
  const selectedMonth = month ? Number(month.value) : 1;
  let range: number;
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

export const months: Option[] = generateNumberOpts(12);

export const years = (): Option[] => {
  const now = new Date().getUTCFullYear();
  return Array.from({ length: 20 }, (_, idx) => {
    const year = now - idx;
    return { value: String(year), label: String(year) };
  });
};
