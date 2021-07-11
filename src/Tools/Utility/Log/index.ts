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
   * クローリングスタート
   */
  startCrawling() {
    return {
      type: LOG_TYPE.START_CRAWLING,
    };
  }

  /**
   * クローリング成功
   * @param result
   * @param time
   */
  successCrawling<T>(result: T, time: string) {
    return {
      type: LOG_TYPE.SUCCESS_CRAWLING,
      result,
      time,
    };
  }

  /**
   * クローリング実行
   */
  processCrawling(url: string) {
    return {
      type: LOG_TYPE.PROCESS_CRAWLING,
      crawling_url: url,
    };
  }

  /**
   * クローリング失敗
   * @param url
   * @param result
   * @param exceptionClass
   * @param stacktrace
   * @param time
   */
  failedCrawling<T>(result: T, url: string, exceptionClass: string, stacktrace: string, time: string) {
    return {
      type: LOG_TYPE.FAILED_CRAWLING,
      crawling_url: url,
      result,
      time,
      exception_class: exceptionClass,
      stacktrace,
    };
  }

  /**
   * DB読み書きスタート
   */
  startDbIo() {
    return {
      type: LOG_TYPE.START_DB_IO,
    };
  }

  /**
   * DB読み書き成功
   * @param time
   */
  successDbIo(time: string) {
    return {
      type: LOG_TYPE.SUCCESS_DB_IO,
      time,
    };
  }

  /**
   * DB読み書き実行
   */
  processDbIo(query: string) {
    return {
      type: LOG_TYPE.PROCESS_DB_IO,
      query,
    };
  }

  /**
   * DB読み書き失敗
   * @param time
   * @param exceptionClass
   * @param stacktrace
   */
  failedDbIo(time: string, exceptionClass: string, stacktrace: string) {
    return {
      type: LOG_TYPE.FAILED_DB_IO,
      time,
      exception_class: exceptionClass,
      stacktrace,
    };
  }

  /**
   * 処理開始
   */
  start() {
    return {
      type: LOG_TYPE.START,
    };
  }

  /**
   * 処理成功
   */
  success(time: string) {
    return {
      type: LOG_TYPE.SUCCESS,
      time,
    };
  }

  /**
   * 処理実行中
   */
  process() {
    return {
      type: LOG_TYPE.PROCESS,
    };
  }

  /**
   * 処理失敗
   * @param exceptionClass
   * @param stacktrace
   */
  failed(exceptionClass: string, stacktrace: string) {
    return {
      type: LOG_TYPE.FAILED,
      exception_class: exceptionClass,
      stacktrace,
    };
  }

  /**
   * loggingインスタンスの作成
   */
  createLogger() {
    return createLogger({
      format: format.combine(this.logFormat(), format.timestamp(), format.json()),
      defaultMeta: {
        hostname: os.hostname(),
      },
      transports: [new transports.Console()],
    });
  }
}
