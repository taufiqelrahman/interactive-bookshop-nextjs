import dayjs from 'dayjs';

type DateInput = string | number | Date | dayjs.Dayjs | null | undefined;

export const date = (date: DateInput, format: string = 'dddd, DD MMMM YYYY'): string => {
  return dayjs(date).format(format);
};

export const fullDate = (date: DateInput, format: string = 'DD MMM YYYY, HH:mm WIB'): string => {
  if (!date) return '';
  return dayjs(date).format(format);
};

const formatDate = { date, fullDate };
export default formatDate;
