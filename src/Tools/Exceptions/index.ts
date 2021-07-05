export namespace Exception {
  /**
   * ValidationError
   * @param message - string
   */
  export class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = 'ValidationError';
    }
  }

  /**
   * CrawlingError
   * @param message - string
   */
  export class CrawlingError extends Error {
    constructor(message?) {
      super(message);
      this.name = 'CrawlingError';
    }
  }
}
