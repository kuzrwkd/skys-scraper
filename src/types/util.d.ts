declare namespace Util {
  type StartCrawlingParams = {
    type: string;
    tracking_id: string;
  };

  type SuccessCrawlingParams<T = any> = {
    type: string;
    tracking_id: string;
    result: T;
    crawling_time: string;
  };

  type ProcessCrawlingParams = {
    type: string;
    tracking_id: string;
    crawling_url: string;
  };

  type FailedCrawlingParams = {
    type: string;
    tracking_id: string;
    crawling_url: string;
    exception_class: string;
    stacktrace: string;
  };

  type StartDbIoParams = {
    type: string;
    tracking_id: string;
  };

  type SuccessDbIoParams<T = any> = {
    type: string;
    tracking_id: string;
    time: string;
    result: T;
  };

  type ProcessDbIoParams = {
    type: string;
    tracking_id: string;
    query: string;
  };

  type FailedDbIoParams = {
    type: string;
    tracking_id: string;
    exception_class: string;
    stacktrace: string;
  };

  type StartParams<T = any> = {
    type: string;
    tracking_id: string;
    request_body: T;
  };

  type SuccessParams<T = any> = {
    type: string;
    tracking_id: string;
    time: string;
    response_body: T;
  };

  type ProcessParams = {
    type: string;
    tracking_id: string;
  };

  type FailedParams = {
    type: string;
    tracking_id: string;
    exception_class: string;
    stacktrace: string;
  };

  interface ILogUtil {
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
    getFailedDbIoParams(payload: {
      tracking_id: string;
      exception_class: string;
      stacktrace: string;
    }): FailedDbIoParams;
    getStartParams<T = any>(payload: { tracking_id: string; request_body: T }): StartParams<T>;
    getSuccessParams<T = any>(payload: { tracking_id: string; time: string; response_body: T }): SuccessParams<T>;
    getProcessParams(): ProcessParams;
    getFailedParams(payload: { tracking_id: string; exception: string; stacktrace: string }): FailedParams;
    createLogger(): Lib.Logger;
  }

  interface IDateUtil {
    getUtc(): string;
    processStartTime(): number;
    processEndTime(startTime: number): string;
    formatDate(date: string): string;
    formatMinutesNoZeroPadding(date: string): string;
  }

  interface IRegExpVerExUtil {
    urlRegExp(): RegExp;
  }
}
