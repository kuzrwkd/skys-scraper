export interface ILog {
  startCrawling(url: string): StartCrawling;
  processCrawling();
  successCrawling(url: string, result: any, crawlingTime: string): SuccessCrawling;
  failedCrawling(url: string, result: any, crawlingTime: string, exception: any, stacktrace: any): FailedCrawling;
  startDbIo(): any;
  processDbIo(query);
  successDbIo(time);
  failedDbIo(time, exceptionClass, stacktrace);
  failed(exception: any, stacktrace: any): Failed;
  get createLogger(): Lib.Logger;
}

export type StartCrawling = {
  type: string;
  crawling_url: string;
};

export type SuccessCrawling = {
  type: string;
  crawling_url: string;
  crawling_result: string;
  crawling_time: string;
};

export type FailedCrawling = {
  type: string;
  crawling_url: string;
  crawling_result: string;
  crawling_time: string;
  exception_class: string;
  stacktrace: string;
};

export type Failed = {
  type: string;
  exception_class: string;
  stacktrace: string;
};
