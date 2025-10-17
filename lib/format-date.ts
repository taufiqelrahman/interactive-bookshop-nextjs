import dayjs from 'dayjs';

export const date = (date, format = 'dddd, DD MMMM YYYY') => {
  return dayjs(date).format(format);
};

export const fullDate = (date, format = 'DD MMM YYYY, HH:mm WIB') => {
  if (!date) return '';
  return dayjs(date).format(format);
};

const formatDate = { date, fullDate };
export default formatDate;
