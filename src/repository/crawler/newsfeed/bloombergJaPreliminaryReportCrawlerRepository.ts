/**
 * Lib
 */
import { injectable } from 'tsyringe';
import puppeteer from 'puppeteer';

/**
 * Utils
 */
import { options } from '@/util/crawlerOptions';

@injectable()
export class BloombergJaPreliminaryReportCrawlerRepository {
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
