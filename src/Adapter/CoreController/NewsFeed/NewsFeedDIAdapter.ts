import { container } from 'tsyringe'

// Entity
import { NewsFeedEntity } from '@/Core/Entity/NewsFeed/NewsFeedEntity'

// UseCase
import { NewsFeedInteract } from '@/Core/UseCase/NewsFeed/NewsFeedInteract'
import { NewsFeedInputPort } from '@/Core/UseCase/NewsFeed/NewsFeedInputPort'
import { NewsFeedOutputPort } from '@/Core/UseCase/NewsFeed/NewsFeedOutputPort'

// Repository
import { BaseCrawlerRepository } from '@/Driver/Crawler/Base/BaseCrawlerRepository'
import { NikkeiPreliminaryReportCrawlerRepository } from '@/Driver/Crawler/Nikkei/NikkeiPreliminaryReportCrawlerRepository'
import { BaseDBRepository } from '@/Driver/DB/Base/BaseDBRepository'
import { NewsFeedRepository } from '@/Driver/DB/NewsFeed/NewsFeedRepository'

// Controller
import { NewsFeedController } from '@/Adapter/CoreController/NewsFeed/NewsFeedController'

// Inject
container.register('NewsFeedEntity', { useClass: NewsFeedEntity })
container.register('NewsFeedInteract', { useClass: NewsFeedInteract })
container.register('NewsFeedInputPort', { useClass: NewsFeedInputPort })
container.register('NewsFeedOutputPort', { useClass: NewsFeedOutputPort })
container.register('BaseCrawlerRepository', { useClass: BaseCrawlerRepository })
container.register('NikkeiPreliminaryReportCrawlerRepository', {
  useClass: NikkeiPreliminaryReportCrawlerRepository,
})
container.register('BaseDBRepository', { useClass: BaseDBRepository })
container.register('NewsFeedRepository', { useClass: NewsFeedRepository })
container.register('NewsFeedController', { useClass: NewsFeedController })

export { container }
