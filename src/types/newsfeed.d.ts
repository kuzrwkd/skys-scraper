declare namespace NewsFeed {
  type Entity = import('@/types/entity/newsFeedEntity').Entity;
  type INewsFeedDB = import('@/types/repository/db/newsFeedDB').INewsFeedDB;
  type Organization = import('@/types/entity/newsFeedEntity').Organization;
  type INewsFeedEntity = import('@/types/entity/newsFeedEntity').INewsFeedEntity;
  type INewsFeedCrawlerIndex = import('@/types/repository/crawler/newsFeedCrawler').INewsFeedCrawlerIndex;
  type INikkeiPreliminaryReportCrawlerRepository =
    import('@/types/repository/crawler/newsFeedCrawler').INikkeiPreliminaryReportCrawlerRepository;
  type IBloombergJaPreliminaryReportCrawlerRepository =
    import('@/types/repository/crawler/newsFeedCrawler').IBloombergJaPreliminaryReportCrawlerRepository;
  type NewsFeedCrawlerResult = import('@/types/repository/crawler/newsFeedCrawler').NewsFeedCrawlerResult;
  type INewsFeedInteract = import('@/types/useCase/newsFeedUseCase').INewsFeedInteract;
  type RequestData = import('@/types/useCase/newsFeedUseCase').RequestData;
  type RequestDataParams = import('@/types/useCase/newsFeedUseCase').RequestDataParams;
  type INewsFeedController = import('@/types/controller/newsFeedController').INewsFeedController;
}
