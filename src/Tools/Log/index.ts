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

  /**
   * クローリング スタート
   * @param url
   */
  startCrawling(url) {
    return {
      type: LOG_TYPE.START_CRAWLING,
      crawling_url: url,
    };
  }

  /**
   * クローリング 実行
   */
  processCrawling() {
    return {
      type: LOG_TYPE.PROCESSING,
    };
  }

  /**
   * クローリング 成功
   * @param url
   * @param result
   * @param crawlingTime
   */
  successCrawling(url, result, crawlingTime) {
    return {
      type: LOG_TYPE.SUCCESS_CRAWLING,
      crawling_url: url,
      crawling_result: result,
      crawling_time: crawlingTime,
    };
  }

  /**
   * クローリング 失敗
   * @param url
   * @param result
   * @param exceptionClass
   * @param stacktrace
   * @param crawlingTime
   */
  failedCrawling(url, result, exceptionClass, stacktrace, crawlingTime) {
    return {
      type: LOG_TYPE.FAILED_CRAWLING,
      crawling_url: url,
      crawling_result: result,
      crawling_time: crawlingTime,
      exception_class: exceptionClass,
      stacktrace,
    };
  }

  /**
   * DB読み書き スタート
   */
  startDbIo() {
    return {
      type: LOG_TYPE.START_DB_IO,
    };
  }

  /**
   * DB読み書き 実行
   */
  processDbIo(query) {
    return {
      type: LOG_TYPE.PROCESSING,
      query,
    };
  }

  /**
   * DB読み書き 成功
   * @param time
   */
  successDbIo(time) {
    return {
      type: LOG_TYPE.SUCCESS_DB_IO,
      time,
    };
  }

  /**
   * DB読み書き 失敗
   * @param time
   * @param exceptionClass
   * @param stacktrace
   */
  failedDbIo(time, exceptionClass, stacktrace) {
    return {
      type: LOG_TYPE.FAILED_DB_IO,
      time,
      exception_class: exceptionClass,
      stacktrace,
    };
  }

  /**
   * 処理の失敗
   * @param exceptionClass
   * @param stacktrace
   */
  failed(exceptionClass, stacktrace) {
    return {
      type: LOG_TYPE.FAILED,
      exception_class: exceptionClass,
      stacktrace,
    };
  }

  /**
   * loggingインスタンスの作成
   */
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
