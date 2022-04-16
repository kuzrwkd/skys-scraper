/**
 * Lib
 */
import { injectable, inject } from 'tsyringe';
import puppeteer from 'puppeteer';

/**
 * Utils
 */
import { options } from '@/util/crawlerOptions';

@injectable()
export class BloombergJaPreliminaryReportCrawlerRepository {
  private logger: Lib.Logger;
  private crawlingErrorObject!: any;

  constructor(@inject('LogUtil') private logUtil: Util.ILogUtil, @inject('DateUtil') private dateUtil: Util.IDateUtil) {
    this.logger = logUtil.createLogger();
  }

  async handle(url: string, organization: NewsFeed.Organization) {
    const organizationName = organization.name;

    try {
      console.log(url, organization);
      return true;
    } catch (e) {
      return false;
    }
  }
}
