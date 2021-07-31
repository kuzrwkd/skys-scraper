export interface ILogTool {
  getRequestId(): string;
  setRequestId(): void;
  getStartCrawlingParams(): StartCrawlingParams;
  getSuccessCrawlingParams<T = any>(time: string, result: T): SuccessCrawlingParams<T>;
  getProcessCrawlingParams(url: string): ProcessCrawlingParams;
  getFailedCrawlingParams(url: string, exception: string, stacktrace: string): FailedCrawlingParams;
  getStartDbIoParams(): StartDbIoParams;
  getSuccessDbIoParams<T = any>(time: string, result: T): SuccessDbIoParams<T>;
  getProcessDbIoParams(query: string): ProcessDbIoParams;
  getFailedDbIoParams(exceptionClass: string, stacktrace: string): FailedDbIoParams;
  getStartParams<T = any>(requestBody: T): StartParams<T>;
  getSuccessParams<T = any>(time: string, responseBody: T): SuccessParams<T>;
  getProcessParams(): ProcessParams;
  getFailedParams(exception: string, stacktrace: string): FailedParams;
  createLogger(): Lib.Logger;
}

export type StartCrawlingParams = {
  type: string;
  request_id: string;
};

export type SuccessCrawlingParams<T = any> = {
  type: string;
  request_id: string;
  result: T;
  crawling_time: string;
};

export type ProcessCrawlingParams = {
  type: string;
  request_id: string;
  crawling_url: string;
};

export type FailedCrawlingParams = {
  type: string;
  request_id: string;
  crawling_url: string;
  exception_class: string;
  stacktrace: string;
};

export type StartDbIoParams = {
  type: string;
  request_id: string;
};

export type SuccessDbIoParams<T = any> = {
  type: string;
  request_id: string;
  time: string;
  result: T;
};

export type ProcessDbIoParams = {
  type: string;
  request_id: string;
  query: string;
};

export type FailedDbIoParams = {
  type: string;
  request_id: string;
  exception_class: string;
  stacktrace: string;
};

export type StartParams<T = any> = {
  type: string;
  request_id: string;
  request_body: T;
};

export type SuccessParams<T = any> = {
  type: string;
  request_id: string;
  time: string;
  response_body: T;
};

export type ProcessParams = {
  type: string;
  request_id: string;
};

export type FailedParams = {
  type: string;
  request_id: string;
  exception_class: string;
  stacktrace: string;
};
