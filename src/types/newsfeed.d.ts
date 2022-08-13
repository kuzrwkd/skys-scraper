declare namespace NewsFeed {
  type RequestData = {
    data: RequestDataParams[];
  };

  type RequestDataParams = {
    mediaId: number;
    url: string;
  };

  type Entity = {
    id: string;
    title: string;
    url: string;
    media: Media;
    article_created_at: string;
    article_updated_at?: string;
  };

  type Media = {
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

  interface INewsFeedDB {
    processLogging(): void;
    getMedia(media_id: number, tracking_id: string): Promise<NewsFeed.Media>;
    create(data: NewsFeed.Entity, tracking_id: string): Promise<void>;
    read(url: string, media: NewsFeed.Media, tracking_id: string): Promise<NewsFeed.Entity & CreateAndUpdateColumn>;
    update(data: NewsFeed.Entity & CreateAndUpdateColumn, tracking_id: string): Promise<void>;
  }

  interface INikkeiPreliminaryReportCrawlerRepository {
    handle(url: string, media: NewsFeed.Media, tracking_id: string): Promise<NewsFeedCrawlerResult[] | undefined>;
  }

  interface IBloombergJaPreliminaryReportCrawlerRepository {
    handle(url: string, media: NewsFeed.Media, tracking_id: string): Promise<NewsFeedCrawlerResult[] | undefined>;
  }

  interface INewsFeedCrawlerIndex {
    handle(url: string, media: NewsFeed.Media, tracking_id: string): Promise<NewsFeedCrawlerResult[] | undefined>;
  }

  interface NewsFeedCrawlerResult {
    id: string;
    title: string;
    url: string;
    article_created_at: string;
    article_updated_at?: string;
  }
}
