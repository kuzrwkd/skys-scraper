import { container as newsFeedContainer } from 'tsyringe';

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
newsFeedContainer.register<NewsFeedEntity>('NewsFeedEntity', { useClass: NewsFeedEntity });
newsFeedContainer.register<NewsFeedInteract>('NewsFeedInteract', { useClass: NewsFeedInteract });
newsFeedContainer.register<NewsFeedCrawlerIndex>('NewsFeedCrawlerIndex', { useClass: NewsFeedCrawlerIndex });
newsFeedContainer.register<NikkeiPreliminaryReportCrawlerRepository>('NikkeiPreliminaryReportCrawlerRepository', {
  useClass: NikkeiPreliminaryReportCrawlerRepository,
});
newsFeedContainer.register<BloombergJaPreliminaryReportCrawlerRepository>(
  'BloombergJaPreliminaryReportCrawlerRepository',
  {
    useClass: BloombergJaPreliminaryReportCrawlerRepository,
  },
);
newsFeedContainer.register<NewsFeedDB>('NewsFeedDB', { useClass: NewsFeedDB });
newsFeedContainer.register<NewsFeedController>('NewsFeedController', { useClass: NewsFeedController });

export default newsFeedContainer;
