import { injectable, inject } from 'tsyringe';

@injectable()
export class NewsFeedCrawlerIndex {
  constructor(
    @inject('NikkeiPreliminaryReportCrawlerRepository')
    private nikkeiPreliminaryReportCrawlerRepository: NewsFeed.INikkeiPreliminaryReportCrawlerRepository,
    @inject('BloombergJaPreliminaryReportCrawlerRepository')
    private bloombergJaPreliminaryReportCrawlerRepository: NewsFeed.IBloombergJaPreliminaryReportCrawlerRepository,
  ) {}

  async handle(url: string, media: NewsFeed.Media, tracking_id: string) {
    const { id } = media;
    switch (id) {
      case 1:
        return await this.nikkeiPreliminaryReportCrawlerRepository.handle(url, media, tracking_id);
      case 2:
        return await this.bloombergJaPreliminaryReportCrawlerRepository.handle(url, media, tracking_id);
    }
  }
}
