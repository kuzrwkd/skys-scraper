// Base
import {
  IBaseCrawlerRepository as _IBaseCrawlerRepository,
  CrawlerOptions as _CrawlerOptions,
} from './Driver/CrawlerRepository/Base';

// NewsFeed
import { INewsFeedDBRepository as _INewsFeedDBRepository } from './Driver/DBRepository/NewsFeed';
import { Entity as _Entity, INewsFeedEntity as _INewsFeedEntity } from './Core/Entity/NewsFeed';
import {
  INikkeiPreliminaryReportCrawlerRepository as _INikkeiPreliminaryReportCrawlerRepository,
  PreliminaryReport as _PreliminaryReport,
} from './Driver/CrawlerRepository/NewsFeed';
import {
  INewsFeedInteract as _INewsFeedInteract,
  IMockNewsFeedInteract as _IMockNewsFeedInteract,
  INewsFeedInputPort as _INewsFeedInputPort,
  INewsFeedOutputPort as _INewsFeedOutputPort,
  InputData as _InputData,
} from './Core/UseCase/NewsFeed';

declare global {
  /**
   * CrawlerBase
   */
  namespace CrawlerBase {
    export type IBaseCrawlerRepository = _IBaseCrawlerRepository;
    export type CrawlerOptions = _CrawlerOptions;
  }

  /**
   * NewsFeed
   */
  namespace NewsFeed {
    export type Entity = _Entity;
    export type INewsFeedDBRepository = _INewsFeedDBRepository;
    export type INewsFeedEntity = _INewsFeedEntity;
    export type INikkeiPreliminaryReportCrawlerRepository = _INikkeiPreliminaryReportCrawlerRepository;
    export type PreliminaryReport = _PreliminaryReport;
    export type INewsFeedInteract = _INewsFeedInteract;
    export type IMockNewsFeedInteract = _IMockNewsFeedInteract;
    export type INewsFeedInputPort = _INewsFeedInputPort;
    export type INewsFeedOutputPort = _INewsFeedOutputPort;
    export type InputData = _InputData;
  }
}
