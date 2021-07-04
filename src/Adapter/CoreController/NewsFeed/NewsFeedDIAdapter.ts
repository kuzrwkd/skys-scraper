import { container } from 'tsyringe'

/**
 * Entity
 */
import { NewsFeedEntity } from '@/Core/Entity/NewsFeed/NewsFeedEntity'

/**
 * UseCase
 */

// Logic
import { NewsFeedInteract } from '@/Core/UseCase/NewsFeed/NewsFeedInteract'
import { NewsFeedInputPort } from '@/Core/UseCase/NewsFeed/NewsFeedInputPort'
import { NewsFeedOutputPort } from '@/Core/UseCase/NewsFeed/NewsFeedOutputPort'
// Mock
import { MockNewsFeedInteract } from '@/Core/UseCase/NewsFeed/__Mock__/MockNewsFeedInteract'

/**
 * Repository
 */

// Base
import { BaseCrawlerRepository } from '@/Driver/Crawler/Base/BaseCrawlerRepository'
import { BaseDBRepository } from '@/Driver/DB/Base/BaseDBRepository'
// Logic
import { NikkeiPreliminaryReportCrawlerRepository } from '@/Driver/Crawler/Nikkei/NikkeiPreliminaryReportCrawlerRepository'
import { NewsFeedRepository } from '@/Driver/DB/NewsFeed/NewsFeedRepository'

/**
 * Controller
 */
import { NewsFeedController } from '@/Adapter/CoreController/NewsFeed/NewsFeedController'

/**
 * Presenter
 */
import { NewsFeedPresenter } from '@/Adapter/Presenter/NewsFeed/NewsFeedPresenter'

/**
 * Inject
 */
container.register('NewsFeedEntity', { useClass: NewsFeedEntity })
container.register('NewsFeedInteract', { useClass: NewsFeedInteract })
container.register('MockNewsFeedInteract', { useClass: MockNewsFeedInteract })
container.register('NewsFeedInputPort', { useClass: NewsFeedInputPort })
container.register('NewsFeedOutputPort', { useClass: NewsFeedOutputPort })
container.register('BaseCrawlerRepository', { useClass: BaseCrawlerRepository })
container.register('NikkeiPreliminaryReportCrawlerRepository', {
  useClass: NikkeiPreliminaryReportCrawlerRepository,
})
container.register('BaseDBRepository', { useClass: BaseDBRepository })
container.register('NewsFeedRepository', { useClass: NewsFeedRepository })
container.register('NewsFeedController', { useClass: NewsFeedController })
container.register('NewsFeedPresenter', { useClass: NewsFeedPresenter })

export { container }
