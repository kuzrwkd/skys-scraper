import { MediaSchema } from '@kuzrwkd/skys-core/entities';
import { injectable } from 'tsyringe';

import newsfeedCrawlerUseCase, {
  INikkeiPreliminaryReportCrawler,
  NewsfeedCrawlerResultItem,
} from '@/useCase/NewsfeedCrawlerUseCase';
export interface ICrawlerIndexForNewsfeed {
  builder(url: string, media: MediaSchema): Promise<NewsfeedCrawlerResultItem[] | undefined>;
}

@injectable()
export class CrawlerIndexForNewsfeed implements ICrawlerIndexForNewsfeed {
  private nikkeiPreliminaryReportCrawler: INikkeiPreliminaryReportCrawler;
  constructor() {
    this.nikkeiPreliminaryReportCrawler = newsfeedCrawlerUseCase.resolve<INikkeiPreliminaryReportCrawler>(
      'NikkeiPreliminaryReportCrawler',
    );
  }

  async builder(url: string, media: MediaSchema) {
    const { id } = media;
    switch (id) {
      case 1:
        return await this.nikkeiPreliminaryReportCrawler.handle(url, media);
    }
  }
}
