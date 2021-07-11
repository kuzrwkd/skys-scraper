import { injectable, inject } from 'tsyringe';

@injectable()
export class NewsFeedCrawlerIndex {
  constructor(
    @inject('NikkeiPreliminaryReportCrawlerRepository')
    private nikkeiPreliminaryReportCrawlerRepository: NewsFeed.INikkeiPreliminaryReportCrawlerRepository,
  ) {}

  async handle(url: string, organization: NewsFeed.Organization) {
    const id = organization.id;
    switch (id) {
      case 1:
        return await this.nikkeiPreliminaryReportCrawlerRepository.crawler(url, organization);
    }
  }
}
