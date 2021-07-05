// NewsFeed
import { INewsFeedDBRepository as _INewsFeedDBRepository } from '@/Tools/@types/Products/Driver/DBRepository/NewsFeed';
import { Entity as _Entity, INewsFeedEntity as _INewsFeedEntity } from '@/Tools/@types/Products/Core/Entity/NewsFeed';
import {
  INikkeiPreliminaryReportCrawlerRepository as _INikkeiPreliminaryReportCrawlerRepository,
  PreliminaryReport as _PreliminaryReport,
} from '@/Tools/@types/Products/Driver/CrawlerRepository/NewsFeed';
import {
  INewsFeedInteract as _INewsFeedInteract,
  IMockNewsFeedInteract as _IMockNewsFeedInteract,
  INewsFeedInputPort as _INewsFeedInputPort,
  INewsFeedOutputPort as _INewsFeedOutputPort,
  InputData as _InputData,
} from '@/Tools/@types/Products/Core/UseCase/NewsFeed';

declare global {
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
