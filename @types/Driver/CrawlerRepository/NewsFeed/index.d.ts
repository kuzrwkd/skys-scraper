export interface INikkeiPreliminaryReportCrawlerRepository {
  crawler(): Promise<PreliminaryReport[] | null>
}

export interface PreliminaryReport {
  title: string
  url: string
  articleCreatedAt: string
  articleUpdatedAt: string | null
}
