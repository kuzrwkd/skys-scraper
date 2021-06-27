import { container } from 'tsyringe'

// Entity
import { NewsFeedEntity } from '@/Entity/NewsFeed/NewsFeedEntity'

// UseCase
import { NewsFeedInteract } from '@/UseCase/NewsFeed/NewsFeedInteract'
import { NewsFeedInputPort } from '@/UseCase/NewsFeed/NewsFeedInputPort'

// Repository
import { NikkeiCrawler } from '@/Driver/Crawler/NikkeiCrawler'

// Controller
import { NewsFeedController } from '@/Adapter/Controller/NewsFeed/NewsFeedController'

// Inject
container.register('NewsFeedEntity', { useClass: NewsFeedEntity })
container.register('NewsFeedInteract', { useClass: NewsFeedInteract })
container.register('NewsFeedInputPort', { useClass: NewsFeedInputPort })
container.register('NikkeiCrawler', { useClass: NikkeiCrawler })
container.register('NewsFeedController', { useClass: NewsFeedController })

export { container }
