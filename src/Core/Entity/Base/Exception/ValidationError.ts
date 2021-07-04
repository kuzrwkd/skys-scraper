export class ValidationError extends Error {
  /**
   * ValidationErrorコンストラクター
   * @param message - string
   */
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}
