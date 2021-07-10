export interface INikkeiPreliminaryReportCrawlerRepository {
  crawler(url: string, organization: NewsFeed.Organization): Promise<PreliminaryReport[] | null>;
}

export interface PreliminaryReport {
  title: string;
  url: string;
  articleCreatedAt: string;
  articleUpdatedAt: string | null;
}
