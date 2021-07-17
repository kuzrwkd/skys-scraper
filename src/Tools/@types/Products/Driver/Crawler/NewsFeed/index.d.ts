export interface INikkeiPreliminaryReportCrawlerRepository {
  crawler(url: string, organization: NewsFeed.Organization): Promise<NewsFeedCrawlerResult[] | null>;
}

export interface IBloombergJaPreliminaryReportCrawlerRepository {
  crawler(url: string, organization: NewsFeed.Organization): Promise<NewsFeedCrawlerResult[] | null>;
}

export interface INewsFeedCrawlerIndex {
  handle(url: string, organization: NewsFeed.Organization): Promise<NewsFeedCrawlerResult[] | null>;
}

export interface NewsFeedCrawlerResult {
  title: string;
  url: string;
  articleCreatedAt: string;
  articleUpdatedAt: string | null;
}
