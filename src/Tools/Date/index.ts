import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { injectable } from 'tsyringe';

export const utcDayJs = dayjs.extend(utc);

@injectable()
export class DayJs {
  get getUtc(): string {
    return utcDayJs.utc().format();
  }

  formatDate(date) {
    return dayjs(date).format('YYYY-MM-DDTHH:mm:ss:SSS');
  }
}
