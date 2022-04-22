import os from 'os';

import { v4 as uuidv4 } from 'uuid';
import { createLogger, format, transports } from 'winston';

import { LOW_CASE_WITH_NUMBER_CHARACTERS, LOG_TYPE } from '@/types/logger';

export const createRandomString = () => {
  const length = 5;
  let result = '';
  const characters = LOW_CASE_WITH_NUMBER_CHARACTERS;
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

/**
 * リクエスト単位でユニークIDをglobalへ保存
 */
export const setRequestId = () => {
  (global as Global).requestId = uuidv4();
};

/**
 * ユニークIDを取得
 */
export const getRequestId = () => {
  return (global as Global).requestId;
};

/**
 * クローリングスタート
 * @param payload
 */
export const getStartCrawlingParams = (payload: { tracking_id: string }) => {
  const { tracking_id } = payload;
  return {
    type: LOG_TYPE.START_CRAWLING,
    tracking_id,
  };
};

/**
 * クローリング成功
 * @param payload
 */
export const getSuccessCrawlingParams = <T = any>(payload: { time: string; result: T; tracking_id: string }) => {
  const { time, result, tracking_id } = payload;
  return {
    type: LOG_TYPE.SUCCESS_CRAWLING,
    tracking_id,
    time,
    result,
  };
};

/**
 * クローリング実行
 */
export const getProcessCrawlingParams = (payload: { url: string; tracking_id: string }) => {
  const { url, tracking_id } = payload;
  return {
    type: LOG_TYPE.PROCESS_CRAWLING,
    tracking_id,
    crawling_url: url,
  };
};

/**
 * クローリング失敗
 * @param payload
 */
export const getFailedCrawlingParams = (payload: {
  url: string;
  tracking_id: string;
  exception_class: string;
  stacktrace: string;
}) => {
  const { url, tracking_id, exception_class, stacktrace } = payload;
  return {
    type: LOG_TYPE.FAILED_CRAWLING,
    tracking_id,
    crawling_url: url,
    exception_class,
    stacktrace,
  };
};

/**
 * DB読み書きスタート
 */
export const getStartDbIoParams = (payload: { tracking_id: string }) => {
  const { tracking_id } = payload;
  return {
    type: LOG_TYPE.START_DB_IO,
    tracking_id,
  };
};

/**
 * DB読み書き成功
 * @param payload
 */
export const getSuccessDbIoParams = <T = any>(payload: { time: string; result: T; tracking_id: string }) => {
  const { time, result, tracking_id } = payload;
  return {
    type: LOG_TYPE.SUCCESS_DB_IO,
    tracking_id,
    time,
    result,
  };
};

/**
 * DB読み書き実行
 * @param payload
 */
export const getProcessDbIoParams = (payload: { tracking_id: string; query: string }) => {
  const { tracking_id, query } = payload;
  return {
    type: LOG_TYPE.PROCESS_DB_IO,
    tracking_id: tracking_id,
    query,
  };
};

/**
 * DB読み書き失敗
 * @param payload
 */
export const getFailedDbIoParams = (payload: { tracking_id: string; exception_class: string; stacktrace: string }) => {
  const { tracking_id, exception_class, stacktrace } = payload;
  return {
    type: LOG_TYPE.FAILED_DB_IO,
    tracking_id,
    exception_class,
    stacktrace,
  };
};

/**
 * 処理開始
 */
export const getStartParams = <T = any>(payload: { tracking_id: string; request_body: T }) => {
  const { tracking_id, request_body } = payload;
  return {
    type: LOG_TYPE.START,
    tracking_id,
    request_body,
  };
};

/**
 * 処理成功
 */
export const getSuccessParams = <T = any>(payload: { tracking_id: string; time: string; response_body: T }) => {
  const { tracking_id, time, response_body } = payload;
  return {
    type: LOG_TYPE.SUCCESS,
    tracking_id,
    time,
    response_body,
  };
};

/**
 * 処理実行中
 */
export const getProcessParams = (payload: { tracking_id: string }) => {
  const { tracking_id } = payload;
  return {
    type: LOG_TYPE.PROCESS,
    tracking_id,
  };
};

/**
 * 処理失敗
 * @param payload
 */
export const getFailedParams = (payload: { tracking_id: string; exception_class: string; stacktrace: string }) => {
  const { tracking_id, exception_class, stacktrace } = payload;
  return {
    type: LOG_TYPE.FAILED,
    tracking_id,
    exception_class,
    stacktrace,
  };
};

const logFormat = format((info) => {
  info.level = info.level.toUpperCase();
  return info;
});

const logger = (() => {
  return createLogger({
    level: 'info',
    format: format.combine(logFormat(), format.timestamp(), format.json()),
    defaultMeta: {
      hostname: os.hostname(),
    },
    transports: [new transports.Console()],
  });
})();

export default logger;
