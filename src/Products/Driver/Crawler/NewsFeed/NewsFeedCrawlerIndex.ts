/**
 * Lib
 */
import { injectable, inject } from 'tsyringe';

@injectable()
export class NewsFeedCrawlerIndex {
  constructor(
    @inject('NikkeiPreliminaryReportCrawlerRepository')
    private nikkeiPreliminaryReportCrawlerRepository: NewsFeed.INikkeiPreliminaryReportCrawlerRepository,
    @inject('BloombergJaPreliminaryReportCrawlerRepository')
    private bloombergJaPreliminaryReportCrawlerRepository: NewsFeed.IBloombergJaPreliminaryReportCrawlerRepository,
  ) {}

  async handle(url: string, organization: NewsFeed.Organization) {
    const id = organization.id;
    switch (id) {
      case 1:
        return await this.nikkeiPreliminaryReportCrawlerRepository.crawler(url, organization);
      case 2:
        return await this.bloombergJaPreliminaryReportCrawlerRepository.crawler(url, organization);
    }
  }
}
