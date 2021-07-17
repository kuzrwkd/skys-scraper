/**
 * Lib
 */
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { injectable } from 'tsyringe';

export const utcDayJs = dayjs.extend(utc);

@injectable()
export class DayJs {
  getUtc() {
    return utcDayJs.utc().format();
  }

  processStartTime() {
    return new Date().getTime();
  }

  processEndTime(startTime) {
    return `${new Date().getTime() - startTime} ms`;
  }

  formatDate(date) {
    return dayjs(date).format('YYYY-MM-DDTHH:mm:ss:SSS[Z]');
  }
}
