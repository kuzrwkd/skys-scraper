export namespace ExceptionUtil {
  /**
   * ValidationError
   * @param message - string
   */
  export class ValidationError extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'ValidationError';
    }
  }

  /**
   * DBCreateError
   * @param message - string
   */
  export class DBCreateError extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'DBCreateError';
    }
  }

  /**
   * DBReadError
   * @param message - string
   */
  export class DBReadError extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'DBReadError';
    }
  }

  /**
   * DBUpdateError
   * @param message - string
   */
  export class DBUpdateError extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'DBUpdateError';
    }
  }

  /**
   * DBDeleteError
   * @param message - string
   */
  export class DBDeleteError extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'DBDeleteError';
    }
  }

  /**
   * CrawlingError
   * @param message - string
   */
  export class CrawlingError extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'CrawlingError';
    }
  }
}
