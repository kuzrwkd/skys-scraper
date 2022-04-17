declare namespace NewsFeed {
  type RequestData = {
    data: RequestDataParams[];
  };

  type RequestDataParams = {
    organizationId: number;
    url: string;
  };

  type Entity = {
    id: string;
    title: string;
    url: string;
    organization: Organization;
    article_created_at: string;
    article_updated_at?: string;
  };

  type Organization = {
    id: number;
    name?: string;
  };

  type CreateAndUpdateColumn = {
    created_at: string;
    updated_at?: string;
  };

  interface INewsFeedEntity {
    set setNewsFeed(Entity: Entity[]);
    get getNewsFeed(): Entity[];
  }

  interface INewsFeedInteract {
    handle(data: RequestDataParams[], tracking_id: string): Promise<boolean>;
  }

  interface INewsFeedController {
    handle(data: NewsFeed.RequestData): Promise<boolean>;
  }

  interface INewsFeedDB {
    processLogging(): void;
    getOrganization(organization_id: number, tracking_id: string): Promise<NewsFeed.Organization>;
    create(data: NewsFeed.Entity, tracking_id: string): Promise<void>;
    read(
      url: string,
      organization: NewsFeed.Organization,
      tracking_id: string,
    ): Promise<NewsFeed.Entity & CreateAndUpdateColumn>;
    update(data: NewsFeed.Entity & CreateAndUpdateColumn, tracking_id: string): Promise<void>;
  }

  interface INikkeiPreliminaryReportCrawlerRepository {
    handle(
      url: string,
      organization: NewsFeed.Organization,
      tracking_id: string,
    ): Promise<NewsFeedCrawlerResult[] | undefined>;
  }

  interface IBloombergJaPreliminaryReportCrawlerRepository {
    handle(
      url: string,
      organization: NewsFeed.Organization,
      tracking_id: string,
    ): Promise<NewsFeedCrawlerResult[] | undefined>;
  }

  interface INewsFeedCrawlerIndex {
    handle(
      url: string,
      organization: NewsFeed.Organization,
      tracking_id: string,
    ): Promise<NewsFeedCrawlerResult[] | undefined>;
  }

  interface NewsFeedCrawlerResult {
    id: string;
    title: string;
    url: string;
    article_created_at: string;
    article_updated_at?: string;
  }
}
