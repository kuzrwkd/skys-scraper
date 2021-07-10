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

/**
 * Repository
 */
import { NikkeiPreliminaryReportCrawlerRepository } from '@/Products/Driver/Crawler/NewsFeed/NikkeiPreliminaryReportCrawlerRepository';
import { NewsFeedRepository } from '@/Products/Driver/DB/NewsFeed/NewsFeedRepository';

/**
 * Controller
 */
import { NewsFeedController } from '@/Products/Adapter/Controller/NewsFeed/NewsFeedController';

/**
 * Presenter
 */
import { NewsFeedPresenter } from '@/Products/Adapter/Presenter/NewsFeed/NewsFeedPresenter';

/**
 * Inject
 */
container.register<NewsFeedEntity>('NewsFeedEntity', { useClass: NewsFeedEntity });
container.register<NewsFeedInteract>('NewsFeedInteract', { useClass: NewsFeedInteract });
container.register<NewsFeedInputPort>('NewsFeedInputPort', { useClass: NewsFeedInputPort });
container.register<NewsFeedOutputPort>('NewsFeedOutputPort', { useClass: NewsFeedOutputPort });
container.register<NikkeiPreliminaryReportCrawlerRepository>('NikkeiPreliminaryReportCrawlerRepository', {
  useClass: NikkeiPreliminaryReportCrawlerRepository,
});
container.register<NewsFeedRepository>('NewsFeedRepository', { useClass: NewsFeedRepository });
container.register<NewsFeedController>('NewsFeedController', { useClass: NewsFeedController });
container.register<NewsFeedPresenter>('NewsFeedPresenter', { useClass: NewsFeedPresenter });

export { container };
