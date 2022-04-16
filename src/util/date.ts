/**
 * Lib
 */
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { injectable } from 'tsyringe';

export const utcDayJs = dayjs.extend(utc);

@injectable()
export class DateUtil {
  getUtc() {
    return utcDayJs.utc().format('YYYY-MM-DDTHH:mm:ss:SSS[Z]');
  }

  processStartTime() {
    return new Date().getTime();
  }

  processEndTime(startTime: number) {
    return `${new Date().getTime() - startTime} ms`;
  }

  formatDate(date: string) {
    return dayjs(date).format('YYYY-MM-DDTHH:mm:ss:SSS[Z]');
  }

  formatMinutesNoZeroPadding(date: string) {
    return dayjs(date).format('m');
  }
}
