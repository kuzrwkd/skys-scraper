/**
 * Lib
 */
import { injectable, inject } from 'tsyringe';
import puppeteer from 'puppeteer';

/**
 * Options
 */
import { options } from '@/Products/Driver/Crawler/config';

/**
 * Tools
 */
import { Exception } from '@/Tools/Utility/Exceptions';

@injectable()
export class BloombergJaPreliminaryReportCrawlerRepository {
  private logger: Lib.Logger;
  private crawlingErrorObject;

  constructor(@inject('Log') private log: Tools.ILog, @inject('DayJs') private dayjs: Tools.IDayJs) {
    this.logger = log.createLogger();
  }

  async crawler(url: string, organization: NewsFeed.Organization) {
    const organizationName = organization.name;

    try {
      console.log(url, organization);
      return true;
    } catch (e) {
      return false;
    }
  }
}
