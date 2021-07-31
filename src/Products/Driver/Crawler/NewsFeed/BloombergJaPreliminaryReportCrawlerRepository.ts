/**
 * Lib
 */
import { injectable, inject } from 'tsyringe';
import puppeteer from 'puppeteer';

/**
 * Options
 */
import { options } from '@/Products/Driver/Crawler/config';

@injectable()
export class BloombergJaPreliminaryReportCrawlerRepository {
  private logger: Lib.Logger;
  private crawlingErrorObject!: any;

  constructor(@inject('Log') private logTool: Tools.ILogTool, @inject('DateTool') private dateTool: Tools.IDateTool) {
    this.logger = logTool.createLogger();
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
