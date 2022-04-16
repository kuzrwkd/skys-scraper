export interface ILogUtil {
  createRandomString(): string;
  getRequestId(): string;
  setRequestId(): void;
  getStartCrawlingParams(payload: { tracking_id: string }): StartCrawlingParams;
  getSuccessCrawlingParams<T = any>(payload: {
    tracking_id: string;
    time: string;
    result: T;
  }): SuccessCrawlingParams<T>;
  getProcessCrawlingParams(payload: { tracking_id: string; url: string }): ProcessCrawlingParams;
  getFailedCrawlingParams(payload: {
    tracking_id: string;
    url: string;
    exception: string;
    stacktrace: string;
  }): FailedCrawlingParams;
  getStartDbIoParams(payload: { tracking_id: string }): StartDbIoParams;
  getSuccessDbIoParams<T = any>(payload: { tracking_id: string; time: string; result: T }): SuccessDbIoParams<T>;
  getProcessDbIoParams(payload: { tracking_id: string; query: string }): ProcessDbIoParams;
  getFailedDbIoParams(payload: { tracking_id: string; exception_class: string; stacktrace: string }): FailedDbIoParams;
  getStartParams<T = any>(payload: { tracking_id: string; request_body: T }): StartParams<T>;
  getSuccessParams<T = any>(payload: { tracking_id: string; time: string; response_body: T }): SuccessParams<T>;
  getProcessParams(): ProcessParams;
  getFailedParams(payload: { tracking_id: string; exception: string; stacktrace: string }): FailedParams;
  createLogger(): Lib.Logger;
}

export type StartCrawlingParams = {
  type: string;
  tracking_id: string;
};

export type SuccessCrawlingParams<T = any> = {
  type: string;
  tracking_id: string;
  result: T;
  crawling_time: string;
};

export type ProcessCrawlingParams = {
  type: string;
  tracking_id: string;
  crawling_url: string;
};

export type FailedCrawlingParams = {
  type: string;
  tracking_id: string;
  crawling_url: string;
  exception_class: string;
  stacktrace: string;
};

export type StartDbIoParams = {
  type: string;
  tracking_id: string;
};

export type SuccessDbIoParams<T = any> = {
  type: string;
  tracking_id: string;
  time: string;
  result: T;
};

export type ProcessDbIoParams = {
  type: string;
  tracking_id: string;
  query: string;
};

export type FailedDbIoParams = {
  type: string;
  tracking_id: string;
  exception_class: string;
  stacktrace: string;
};

export type StartParams<T = any> = {
  type: string;
  tracking_id: string;
  request_body: T;
};

export type SuccessParams<T = any> = {
  type: string;
  tracking_id: string;
  time: string;
  response_body: T;
};

export type ProcessParams = {
  type: string;
  tracking_id: string;
};

export type FailedParams = {
  type: string;
  tracking_id: string;
  exception_class: string;
  stacktrace: string;
};
