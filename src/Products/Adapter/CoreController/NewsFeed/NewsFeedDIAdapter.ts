import { container } from 'tsyringe';

/**
 * Entity
 */
import { NewsFeedEntity } from '@/Products/Core/Entity/NewsFeed/NewsFeedEntity';

/**
 * UseCase
 */

// Logic
import { NewsFeedInteract } from '@/Products/Core/UseCase/NewsFeed/NewsFeedInteract';
import { NewsFeedInputPort } from '@/Products/Core/UseCase/NewsFeed/NewsFeedInputPort';
import { NewsFeedOutputPort } from '@/Products/Core/UseCase/NewsFeed/NewsFeedOutputPort';
// Mock
import { MockNewsFeedInteract } from '@/Products/Core/UseCase/NewsFeed/__Mock__/MockNewsFeedInteract';

/**
 * Repository
 */
import { NikkeiPreliminaryReportCrawlerRepository } from '@/Products/Driver/Crawler/Nikkei/NikkeiPreliminaryReportCrawlerRepository';
import { NewsFeedRepository } from '@/Products/Driver/DB/NewsFeed/NewsFeedRepository';

/**
 * Controller
 */
import { NewsFeedController } from '@/Products/Adapter/CoreController/NewsFeed/NewsFeedController';

/**
 * Presenter
 */
import { NewsFeedPresenter } from '@/Products/Adapter/Presenter/NewsFeed/NewsFeedPresenter';

/**
 * Inject
 */
container.register('NewsFeedEntity', { useClass: NewsFeedEntity });
container.register('NewsFeedInteract', { useClass: NewsFeedInteract });
container.register('MockNewsFeedInteract', { useClass: MockNewsFeedInteract });
container.register('NewsFeedInputPort', { useClass: NewsFeedInputPort });
container.register('NewsFeedOutputPort', { useClass: NewsFeedOutputPort });
container.register('NikkeiPreliminaryReportCrawlerRepository', {
  useClass: NikkeiPreliminaryReportCrawlerRepository,
});
container.register('NewsFeedRepository', { useClass: NewsFeedRepository });
container.register('NewsFeedController', { useClass: NewsFeedController });
container.register('NewsFeedPresenter', { useClass: NewsFeedPresenter });

export { container };
