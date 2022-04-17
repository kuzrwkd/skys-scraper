import { container as newsFeedUseCase } from 'tsyringe';

/**
 * Entity
 */
import { NewsFeedEntity } from '@/entity/newsFeedEntity';

/**
 * UseCase
 */
import { NewsFeedInteract } from '@/useCase/interact/newsFeedInteract';

/**
 * Repository
 */
import { NewsFeedCrawlerIndex } from '@/repository/crawler/newsfeed/newsFeedCrawlerIndex';
import { NikkeiPreliminaryReportCrawlerRepository } from '@/repository/crawler/newsfeed/nikkeiPreliminaryReportCrawlerRepository';
import { BloombergJaPreliminaryReportCrawlerRepository } from '@/repository/crawler/newsfeed/bloombergJaPreliminaryReportCrawlerRepository';
import { NewsFeedDB } from '@/repository/db/newsFeedDB';

/**
 * Controller
 */
import { NewsFeedController } from '@/controller/newsFeedController';

/**
 * Inject
 */
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
newsFeedUseCase.register<NewsFeedController>('NewsFeedController', { useClass: NewsFeedController });

export default newsFeedUseCase;
