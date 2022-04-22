import { injectable, inject } from 'tsyringe';

@injectable()
export class NewsFeedCrawlerIndex {
  constructor(
    @inject('NikkeiPreliminaryReportCrawlerRepository')
    private nikkeiPreliminaryReportCrawlerRepository: NewsFeed.INikkeiPreliminaryReportCrawlerRepository,
    @inject('BloombergJaPreliminaryReportCrawlerRepository')
    private bloombergJaPreliminaryReportCrawlerRepository: NewsFeed.IBloombergJaPreliminaryReportCrawlerRepository,
  ) {}

  async handle(url: string, organization: NewsFeed.Organization, tracking_id: string) {
    const { id } = organization;
    switch (id) {
      case 1:
        return await this.nikkeiPreliminaryReportCrawlerRepository.handle(url, organization, tracking_id);
      case 2:
        return await this.bloombergJaPreliminaryReportCrawlerRepository.handle(url, organization, tracking_id);
    }
  }
}
