// Base
import { IBaseDBRepository as _IBaseDBRepository } from './Driver/DBRepository/Base'
import {
  IBaseCrawlerRepository as _IBaseCrawlerRepository,
  CrawlerOptions as _CrawlerOptions,
} from './Driver/CrawlerRepository/Base'

// NewsFeed
import { INewsFeedDBRepository as _INewsFeedDBRepository } from './Driver/DBRepository/NewsFeed'
import { Entity as _Entity, INewsFeedEntity as _INewsFeedEntity } from './Core/Entity/NewsFeed'
import { INikkeiPreliminaryReportCrawlerRepository as _INikkeiPreliminaryReportCrawlerRepository } from './Driver/CrawlerRepository/NewsFeed'
import {
  INewsFeedInteract as _INewsFeedInteract,
  INewsFeedInputPort as _INewsFeedInputPort,
  InputData as _InputData,
} from './Core/UseCase/NewsFeed'

declare global {
  namespace DBBase {
    export type IBaseDBRepository = _IBaseDBRepository
  }

  namespace CrawlerBase {
    export type IBaseCrawlerRepository = _IBaseCrawlerRepository
    export type CrawlerOptions = _CrawlerOptions
  }

  namespace NewsFeed {
    export type Entity = _Entity
    export type INewsFeedDBRepository = _INewsFeedDBRepository
    export type INewsFeedEntity = _INewsFeedEntity
    export type INikkeiPreliminaryReportCrawlerRepository = _INikkeiPreliminaryReportCrawlerRepository
    export type INewsFeedInteract = _INewsFeedInteract
    export type INewsFeedInputPort = _INewsFeedInputPort
    export type InputData = _InputData
  }
}
