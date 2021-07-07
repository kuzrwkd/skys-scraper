import _dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { injectable } from 'tsyringe';

export const dayjs = _dayjs.extend(utc);

@injectable()
export class Date {
  get getUtc(): string {
    return dayjs.utc().format();
  }
}
