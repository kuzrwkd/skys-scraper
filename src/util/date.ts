import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

export const utcDayJs = dayjs.extend(utc);

export const getUtc = () => {
  return utcDayJs.utc().format('YYYY-MM-DDTHH:mm:ss:SSS[Z]');
};

export const processStartTime = () => {
  return new Date().getTime();
};

export const processEndTime = (startTime: number) => {
  return `${new Date().getTime() - startTime} ms`;
};

export const formatDate = (date: string) => {
  return dayjs(date).format('YYYY-MM-DDTHH:mm:ss:SSS[Z]');
};

export const formatMinutesNoZeroPadding = (date: string) => {
  return dayjs(date).format('m');
};
