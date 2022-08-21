import { MediaSchema } from '@kuzrwkd/skys-core/entities';
import { injectable, inject } from 'tsyringe';

import { INikkeiPreliminaryReportCrawlerRepository, NewsfeedCrawlerResultItem } from '@/useCase/NewsfeedUseCase';
export interface INewsfeedCrawlerIndex {
  handle(url: string, media: MediaSchema): Promise<NewsfeedCrawlerResultItem[] | undefined>;
}

@injectable()
export class NewsfeedCrawlerIndex implements INewsfeedCrawlerIndex {
  constructor(
    @inject('NikkeiPreliminaryReportCrawlerRepository')
    private nikkeiPreliminaryReportCrawlerRepository: INikkeiPreliminaryReportCrawlerRepository,
  ) {}

  async handle(url: string, media: MediaSchema) {
    const { id } = media;
    switch (id) {
      case 1:
        return await this.nikkeiPreliminaryReportCrawlerRepository.handle(url, media);
    }
  }
}
