export class CrawlingError extends Error {
  /**
   * CrawlingErrorコンストラクター
   * @param message
   */
  constructor(message?) {
    super(message)
    this.name = 'CrawlingError'
  }
}
