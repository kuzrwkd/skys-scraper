export interface INikkeiPreliminaryReportCrawlerRepository {
  crawler(url: string): Promise<PreliminaryReport[] | null>;
}

export interface PreliminaryReport {
  title: string;
  url: string;
  articleCreatedAt: string;
  articleUpdatedAt: string | null;
}
