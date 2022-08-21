import { Media } from '@kuzrwkd/skys-core/entities';
import { injectable, inject } from 'tsyringe';

import { INikkeiPreliminaryReportCrawlerRepository } from '@/repository/crawler/newsfeed/NikkeiPreliminaryReportCrawlerRepository';

export interface INewsfeedCrawlerIndex {
  handle(url: string, media: Media): Promise<Newsfeed.NewsfeedCrawlerResult[] | undefined>;
}

@injectable()
export class NewsfeedCrawlerIndex implements INewsfeedCrawlerIndex {
  constructor(
    @inject('NikkeiPreliminaryReportCrawlerRepository')
    private nikkeiPreliminaryReportCrawlerRepository: INikkeiPreliminaryReportCrawlerRepository,
  ) {}

  async handle(url: string, media: Media) {
    const { id } = media;
    switch (id) {
      case 1:
        return await this.nikkeiPreliminaryReportCrawlerRepository.handle(url, media);
    }
  }
}
