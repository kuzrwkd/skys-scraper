/**
 * Lib
 */
import { injectable, inject } from 'tsyringe';
import puppeteer from 'puppeteer';

/**
 * Tools
 */
import { options } from '@/Tools/Utility/CrawlerOptions';

@injectable()
export class BloombergJaPreliminaryReportCrawlerRepository {
  private logger: Lib.Logger;
  private crawlingErrorObject!: any;

  constructor(
    @inject('LogTool') private logTool: Tools.ILogTool,
    @inject('DateTool') private dateTool: Tools.IDateTool,
  ) {
    this.logger = logTool.createLogger();
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
