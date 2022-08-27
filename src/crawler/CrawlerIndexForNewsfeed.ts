import { MediaSchema } from '@kuzrwkd/skys-core/entities';
import { injectable, inject } from 'tsyringe';

import { INikkeiPreliminaryReportCrawler, NewsfeedCrawlerResultItem } from '@/useCase/NewsfeedCrawlerUseCase';
export interface ICrawlerIndexForNewsfeed {
  handle(url: string, media: MediaSchema): Promise<NewsfeedCrawlerResultItem[] | undefined>;
}

@injectable()
export class CrawlerIndexForNewsfeed implements ICrawlerIndexForNewsfeed {
  constructor(
    @inject('NikkeiPreliminaryReportCrawler')
    private nikkeiPreliminaryReportCrawler: INikkeiPreliminaryReportCrawler,
  ) {}

  async handle(url: string, media: MediaSchema) {
    const { id } = media;
    switch (id) {
      case 1:
        return await this.nikkeiPreliminaryReportCrawler.handle(url, media);
    }
  }
}
