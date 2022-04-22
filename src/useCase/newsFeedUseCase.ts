import { container as newsFeedUseCase } from 'tsyringe';

import { NewsFeedEntity } from '@/entity/newsFeedEntity';
import { BloombergJaPreliminaryReportCrawlerRepository } from '@/repository/crawler/newsfeed/bloombergJaPreliminaryReportCrawlerRepository';
import { NewsFeedCrawlerIndex } from '@/repository/crawler/newsfeed/newsFeedCrawlerIndex';
import { NikkeiPreliminaryReportCrawlerRepository } from '@/repository/crawler/newsfeed/nikkeiPreliminaryReportCrawlerRepository';
import { NewsFeedDB } from '@/repository/db/newsFeedDB';
import { NewsFeedInteract } from '@/useCase/interact/newsFeedInteract';

newsFeedUseCase.register<NewsFeedEntity>('NewsFeedEntity', { useClass: NewsFeedEntity });
newsFeedUseCase.register<NewsFeedInteract>('NewsFeedInteract', { useClass: NewsFeedInteract });
newsFeedUseCase.register<NewsFeedCrawlerIndex>('NewsFeedCrawlerIndex', { useClass: NewsFeedCrawlerIndex });
newsFeedUseCase.register<NikkeiPreliminaryReportCrawlerRepository>('NikkeiPreliminaryReportCrawlerRepository', {
  useClass: NikkeiPreliminaryReportCrawlerRepository,
});
newsFeedUseCase.register<BloombergJaPreliminaryReportCrawlerRepository>(
  'BloombergJaPreliminaryReportCrawlerRepository',
  {
    useClass: BloombergJaPreliminaryReportCrawlerRepository,
  },
);
newsFeedUseCase.register<NewsFeedDB>('NewsFeedDB', { useClass: NewsFeedDB });

export default newsFeedUseCase;
