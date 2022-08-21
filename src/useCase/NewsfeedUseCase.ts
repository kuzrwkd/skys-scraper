import { container as newsFeedUseCase } from 'tsyringe';

import { NewsfeedCrawlerIndex } from '@/crawler/newsfeed/NewsfeedCrawlerIndex';
import { NikkeiPreliminaryReportCrawlerRepository } from '@/crawler/newsfeed/NikkeiPreliminaryReportCrawlerRepository';
import { NewsfeedInteract } from '@/useCase/interact/NewsfeedInteract';

newsFeedUseCase.register<NewsfeedInteract>('NewsfeedInteract', { useClass: NewsfeedInteract });
newsFeedUseCase.register<NewsfeedCrawlerIndex>('NewsfeedCrawlerIndex', { useClass: NewsfeedCrawlerIndex });
newsFeedUseCase.register<NikkeiPreliminaryReportCrawlerRepository>('NikkeiPreliminaryReportCrawlerRepository', {
  useClass: NikkeiPreliminaryReportCrawlerRepository,
});

export default newsFeedUseCase;
