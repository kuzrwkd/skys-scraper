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
    handle(data: RequestDataParams[]): Promise<boolean>;
  }

  interface INewsFeedDB {
    processLogging(): void;
    getMedia(media_id: number): Promise<NewsFeed.Media>;
    create(data: NewsFeed.Entity): Promise<void>;
    read(url: string, media: NewsFeed.Media): Promise<NewsFeed.Entity & CreateAndUpdateColumn>;
    update(data: NewsFeed.Entity & CreateAndUpdateColumn): Promise<void>;
  }

  interface INikkeiPreliminaryReportCrawlerRepository {
    handle(url: string, media: NewsFeed.Media): Promise<NewsFeedCrawlerResult[] | undefined>;
  }

  interface IBloombergJaPreliminaryReportCrawlerRepository {
    handle(url: string, media: NewsFeed.Media): Promise<NewsFeedCrawlerResult[] | undefined>;
  }

  interface INewsFeedCrawlerIndex {
    handle(url: string, media: NewsFeed.Media): Promise<NewsFeedCrawlerResult[] | undefined>;
  }

  interface NewsFeedCrawlerResult {
    id: string;
    title: string;
    url: string;
    article_created_at: string;
    article_updated_at?: string;
  }
}
