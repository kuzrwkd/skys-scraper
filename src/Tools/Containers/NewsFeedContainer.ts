import { container as newsFeedContainer } from 'tsyringe';

/**
 * Entity
 */
import { NewsFeedEntity } from '@/Products/Core/Entity/NewsFeedEntity';

/**
 * UseCase
 */
import { NewsFeedInteract } from '@/Products/Core/UseCase/NewsFeedInteract';

/**
 * Repository
 */
import { NewsFeedCrawlerIndex } from '@/Products/Driver/Crawler/Index/NewsFeedCrawlerIndex';
import { NikkeiPreliminaryReportCrawlerRepository } from '@/Products/Driver/Crawler/Repository/NikkeiPreliminaryReportCrawlerRepository';
import { BloombergJaPreliminaryReportCrawlerRepository } from '@/Products/Driver/Crawler/Repository/BloombergJaPreliminaryReportCrawlerRepository';
import { NewsFeedDBRepository } from '@/Products/Driver/DB/Repository/NewsFeedDBRepository';

/**
 * Controller
 */
import { NewsFeedController } from '@/Products/Adapter/Controller/NewsFeedController';

/**
 * Presenter
 */
import { NewsFeedPresenter } from '@/Products/Adapter/Presenter/NewsFeedPresenter';

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
newsFeedContainer.register<NewsFeedDBRepository>('NewsFeedDBRepository', { useClass: NewsFeedDBRepository });
newsFeedContainer.register<NewsFeedController>('NewsFeedController', { useClass: NewsFeedController });
newsFeedContainer.register<NewsFeedPresenter>('NewsFeedPresenter', { useClass: NewsFeedPresenter });

export default newsFeedContainer;
