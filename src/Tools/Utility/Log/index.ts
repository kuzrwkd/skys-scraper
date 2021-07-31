/**
 * Node
 */
import os from 'os';

/**
 * Lib
 */
import { v4 as uuidv4 } from 'uuid';
import { createLogger, format, transports } from 'winston';
import { injectable } from 'tsyringe';

/**
 * Tool
 */
import { LOG_TYPE } from '@/Tools/Constants/Logger';

@injectable()
export class LogTool {
  private logFormat = format((info) => {
    info.level = info.level.toUpperCase();
    return info;
  });

  /**
   * リクエスト単位でユニークIDをglobalへ保存
   */
  setRequestId() {
    (global as CustomNodeJsGlobal).requestId = uuidv4();
  }

  /**
   * ユニークIDを取得
   */
  getRequestId() {
    return (global as CustomNodeJsGlobal).requestId;
  }

  /**
   * クローリングスタート
   */
  getStartCrawlingParams() {
    return {
      type: LOG_TYPE.START_CRAWLING,
      request_id: this.getRequestId(),
    };
  }

  /**
   * クローリング成功
   * @param result
   * @param time
   */
  getSuccessCrawlingParams<T = any>(time: string, result: T) {
    return {
      type: LOG_TYPE.SUCCESS_CRAWLING,
      request_id: this.getRequestId(),
      time,
      result,
    };
  }

  /**
   * クローリング実行
   */
  getProcessCrawlingParams(url: string) {
    return {
      type: LOG_TYPE.PROCESS_CRAWLING,
      request_id: this.getRequestId(),
      crawling_url: url,
    };
  }

  /**
   * クローリング失敗
   * @param url
   * @param exceptionClass
   * @param stacktrace
   */
  getFailedCrawlingParams(url: string, exceptionClass: string, stacktrace: string) {
    return {
      type: LOG_TYPE.FAILED_CRAWLING,
      request_id: this.getRequestId(),
      crawling_url: url,
      exception_class: exceptionClass,
      stacktrace,
    };
  }

  /**
   * DB読み書きスタート
   */
  getStartDbIoParams() {
    return {
      type: LOG_TYPE.START_DB_IO,
      request_id: this.getRequestId(),
    };
  }

  /**
   * DB読み書き成功
   * @param time
   * @param result
   */
  getSuccessDbIoParams<T = any>(time: string, result: T) {
    return {
      type: LOG_TYPE.SUCCESS_DB_IO,
      request_id: this.getRequestId(),
      time,
      result,
    };
  }

  /**
   * DB読み書き実行
   */
  getProcessDbIoParams(query: string) {
    return {
      type: LOG_TYPE.PROCESS_DB_IO,
      request_id: this.getRequestId(),
      query,
    };
  }

  /**
   * DB読み書き失敗
   * @param exceptionClass
   * @param stacktrace
   */
  getFailedDbIoParams(exceptionClass: string, stacktrace: string) {
    return {
      type: LOG_TYPE.FAILED_DB_IO,
      request_id: this.getRequestId(),
      exception_class: exceptionClass,
      stacktrace,
    };
  }

  /**
   * 処理開始
   */
  getStartParams<T = any>(requestBody: T) {
    return {
      type: LOG_TYPE.START,
      request_id: this.getRequestId(),
      request_body: requestBody,
    };
  }

  /**
   * 処理成功
   */
  getSuccessParams<T = any>(time: string, responseBody: T) {
    return {
      type: LOG_TYPE.SUCCESS,
      request_id: this.getRequestId(),
      time,
      response_body: responseBody,
    };
  }

  /**
   * 処理実行中
   */
  getProcessParams() {
    return {
      type: LOG_TYPE.PROCESS,
      request_id: this.getRequestId(),
    };
  }

  /**
   * 処理失敗
   * @param exceptionClass
   * @param stacktrace
   */
  getFailedParams(exceptionClass: string, stacktrace: string) {
    return {
      type: LOG_TYPE.FAILED,
      request_id: this.getRequestId(),
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
