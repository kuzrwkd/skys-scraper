export interface INikkeiPreliminaryReportCrawlerRepository {
  handle(
    url: string,
    organization: NewsFeed.Organization,
    tracking_id: string,
  ): Promise<NewsFeedCrawlerResult[] | undefined>;
}

export interface IBloombergJaPreliminaryReportCrawlerRepository {
  handle(
    url: string,
    organization: NewsFeed.Organization,
    tracking_id: string,
  ): Promise<NewsFeedCrawlerResult[] | undefined>;
}

export interface INewsFeedCrawlerIndex {
  handle(
    url: string,
    organization: NewsFeed.Organization,
    tracking_id: string,
  ): Promise<NewsFeedCrawlerResult[] | undefined>;
}

export interface NewsFeedCrawlerResult {
  id: string;
  title: string;
  url: string;
  article_created_at: string;
  article_updated_at?: string;
}
