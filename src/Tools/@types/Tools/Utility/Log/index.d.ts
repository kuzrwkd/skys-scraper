export interface ILogTool {
  startCrawling(): StartCrawling;
  processCrawling(url: string): ProcessCrawling;
  successCrawling<T>(result: T, crawlingTime: string): SuccessCrawling<T>;
  failedCrawling<T>(
    result: T,
    url: string,
    crawlingTime: string,
    exception: string,
    stacktrace: string,
  ): FailedCrawling<T>;
  startDbIo(): StartDbIo;
  processDbIo(query: string): ProcessDbIo;
  successDbIo(time: string): SuccessDbIo;
  failedDbIo(time: string, exceptionClass: string, stacktrace: string): FailedDbIo;
  start(): Start;
  success(time: string): Success;
  process(): Process;
  failed(exception: string, stacktrace: string): Failed;
  createLogger(): Lib.Logger;
}

export type StartCrawling = {
  type: string;
};

export type SuccessCrawling<T> = {
  type: string;
  result: T;
  crawling_time: string;
};

export type ProcessCrawling = {
  type: string;
  crawling_url: string;
};

export type FailedCrawling<T> = {
  type: string;
  crawling_url: string;
  result: T;
  crawling_time: string;
  exception_class: string;
  stacktrace: string;
};

export type StartDbIo = {
  type: string;
};

export type SuccessDbIo = {
  type: string;
  time: string;
};

export type ProcessDbIo = {
  type: string;
  query: string;
};

export type FailedDbIo = {
  type: string;
  time: string;
  exception_class: string;
  stacktrace: string;
};

export type Start = {
  type: string;
};

export type Success = {
  type: string;
  time: string;
};

export type Process = {
  type: string;
};

export type Failed = {
  type: string;
  exception_class: string;
  stacktrace: string;
};
