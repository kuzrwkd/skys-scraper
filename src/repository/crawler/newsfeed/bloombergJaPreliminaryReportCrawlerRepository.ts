import { injectable } from 'tsyringe';

@injectable()
export class BloombergJaPreliminaryReportCrawlerRepository {
  async handle(url: string, media: NewsFeed.Media) {
    try {
      console.log(url, media);
      return true;
    } catch (e) {
      return false;
    }
  }
}
