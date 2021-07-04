export interface INikkeiPreliminaryReportCrawlerRepository {
  crawler(): Promise<PreliminaryReport[] | null>;
  sendCrawlingErrorMessage(msg: string): void;
}

export interface PreliminaryReport {
  title: string;
  url: string;
  articleCreatedAt: string;
  articleUpdatedAt: string | null;
}
