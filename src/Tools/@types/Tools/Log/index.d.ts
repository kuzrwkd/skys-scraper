export interface ILog {
  crawlingStart(url: string): CrawlingStart;
  crawlingSuccess(url: string, result: any): CrawlingSuccess;
  crawlingFailed(url: string, result: any): CrawlingFailed;
  get createLogger(): Lib.Logger;
}

export type CrawlingStart = {
  type: string;
  crawling_url: string;
  method: string;
};

export type CrawlingSuccess = {
  type: string;
  crawling_url: string;
  method: string;
  crawling_result: string;
  crawling_time: string;
};

export type CrawlingFailed = {
  type: string;
  crawling_url: string;
  method: string;
  crawling_result: string;
  crawling_time: string;
  exception_class: string;
  stacktrace: string;
};
