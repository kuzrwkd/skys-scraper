/**
 * Lib
 */
import type { Logger as _Logger } from 'winston';

/**
 * Tools
 */
import type { IDateTool as _IDateTool } from '@/Tools/@types/Tools/Utility/Date';
import type { ILogTool as _ILogTool } from '@/Tools/@types/Tools/Utility/Log';
import type { IRegExpVerExTool as _IRegExpVerExTool } from '@/Tools/@types/Tools/Utility/RegExp';

/**
 * NewsFeed
 */
import type { INewsFeedDBRepository as _INewsFeedDBRepository } from '@/Tools/@types/Products/Driver/DB/NewsFeed';
import type {
  Entity as _Entity,
  INewsFeedEntity as _INewsFeedEntity,
  Organization as _Organization,
  Contents as _Contents,
} from '@/Tools/@types/Products/Core/Entity/NewsFeed';
import type {
  INewsFeedCrawlerIndex as _INewsFeedCrawlerIndex,
  INikkeiPreliminaryReportCrawlerRepository as _INikkeiPreliminaryReportCrawlerRepository,
  IBloombergJaPreliminaryReportCrawlerRepository as _IBloombergJaPreliminaryReportCrawlerRepository,
  NewsFeedCrawlerResult as _NewsFeedCrawlerResult,
} from '@/Tools/@types/Products/Driver/Crawler/NewsFeed';
import type {
  INewsFeedInteract as _INewsFeedInteract,
  INewsFeedInputPort as _INewsFeedInputPort,
  INewsFeedOutputPort as _INewsFeedOutputPort,
  RequestData as _RequestData,
  RequestDataParams as _RequestDataParams,
} from '@/Tools/@types/Products/Core/UseCase/NewsFeed';
import type { INewsFeedPresenter as _INewsFeedPresenter } from '@/Tools/@types/Products/Adapter/Presenter/NewsFeed';
import type { INewsFeedController as _INewsFeedController } from '@/Tools/@types/Products/Adapter/Controller/NewsFeed';

/**
 * Migration
 */
import { IMigration as _IMigration } from '@/Tools/@types/Products/Driver/DB/Migration/Schema';

declare global {
  /**
   * NodeJS global type
   */
  export type Global = typeof global;
  export interface CustomNodeJsGlobal extends Global {
    requestId: string;
  }

  /**
   * lib
   */
  namespace Lib {
    export type Logger = _Logger;
  }

  /**
   * Tools
   */
  namespace Tools {
    export type IDateTool = _IDateTool;
    export type ILogTool = _ILogTool;
    export type IRegExpVerExTool = _IRegExpVerExTool;
  }

  /**
   * NewsFeed
   */
  namespace NewsFeed {
    export type Entity = _Entity;
    export type INewsFeedDBRepository = _INewsFeedDBRepository;
    export type Organization = _Organization;
    export type Contents = _Contents;
    export type INewsFeedEntity = _INewsFeedEntity;
    export type INewsFeedCrawlerIndex = _INewsFeedCrawlerIndex;
    export type INikkeiPreliminaryReportCrawlerRepository = _INikkeiPreliminaryReportCrawlerRepository;
    export type IBloombergJaPreliminaryReportCrawlerRepository = _IBloombergJaPreliminaryReportCrawlerRepository;
    export type NewsFeedCrawlerResult = _NewsFeedCrawlerResult;
    export type INewsFeedInteract = _INewsFeedInteract;
    export type INewsFeedInputPort = _INewsFeedInputPort;
    export type INewsFeedOutputPort = _INewsFeedOutputPort;
    export type RequestData = _RequestData;
    export type RequestDataParams = _RequestDataParams;
    export type INewsFeedPresenter = _INewsFeedPresenter;
    export type INewsFeedController = _INewsFeedController;
  }

  /**
   * Migration
   */
  export type IMigration = _IMigration;
}
