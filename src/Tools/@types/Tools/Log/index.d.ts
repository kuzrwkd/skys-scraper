export interface ILog {
  crawlingStart(url: string): CrawlingStart;
  crawlingSuccess(url: string, result: any, crawlingTime: string): CrawlingSuccess;
  crawlingFailed(url: string, result: any, crawlingTime: string, exception: any, stacktrace: any): CrawlingFailed;
  failed(exception: any, stacktrace: any): Failed;
  get createLogger(): Lib.Logger;
}

export type CrawlingStart = {
  type: string;
  crawling_url: string;
};

export type CrawlingSuccess = {
  type: string;
  crawling_url: string;
  crawling_result: string;
  crawling_time: string;
};

export type CrawlingFailed = {
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
