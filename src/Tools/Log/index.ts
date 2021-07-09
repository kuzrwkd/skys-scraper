import { createLogger, format, transports } from 'winston';
import { injectable } from 'tsyringe';
import os from 'os';
import { LOG_TYPE } from '@/Tools/Constants/Logger';

@injectable()
export class Log {
  logFormat = format((info) => {
    info.level = info.level.toUpperCase();
    return info;
  });

  crawlingStart(url) {
    return {
      type: LOG_TYPE.START_CRAWLING,
      crawling_url: url,
    };
  }

  crawlingSuccess(url, result, crawlingTime) {
    return {
      type: LOG_TYPE.SUCCESS_CRAWLING,
      crawling_url: url,
      crawling_result: result,
      crawling_time: crawlingTime,
    };
  }

  crawlingFailed(url, result, exception, stacktrace, crawlingTime) {
    return {
      type: LOG_TYPE.FAILED_CRAWLING,
      crawling_url: url,
      crawling_result: result,
      crawling_time: crawlingTime,
      exception_class: exception,
      stacktrace,
    };
  }

  failed(exception, stacktrace) {
    return {
      type: LOG_TYPE.FAILED,
      exception_class: exception,
      stacktrace,
    };
  }

  get createLogger() {
    return createLogger({
      format: format.combine(this.logFormat(), format.timestamp(), format.json()),
      defaultMeta: {
        hostname: os.hostname(),
      },
      transports: [new transports.Console()],
    });
  }
}
