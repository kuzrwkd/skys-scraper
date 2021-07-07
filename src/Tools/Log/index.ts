import winston from 'winston';
import { injectable } from 'tsyringe';

@injectable()
export class Log {
  get createLogger() {
    return winston.createLogger({
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
      transports: [new winston.transports.Console()],
    });
  }
}
