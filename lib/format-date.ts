import dayjs from 'dayjs';

export const date = (date, format = 'dddd, DD MMMM YYYY') => {
  return dayjs(date).format(format);
};

export default { date };
