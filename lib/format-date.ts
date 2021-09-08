import dayjs from 'dayjs';

export const date = (date: dayjs.ConfigType, format = 'dddd, DD MMMM YYYY') => {
  return dayjs(date).format(format);
};

export const fullDate = (date: dayjs.ConfigType, format = 'DD MMM YYYY, HH:mm WIB') => {
  if (!date) return '';
  return dayjs(date).format(format);
};

export default { date, fullDate };
