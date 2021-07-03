export interface IBaseCrawlerRepository {
  get getOptions(): CrawlerOptions
  set setOptions(Options: CrawlerOptions)
}

export type CrawlerOptions = {
  args: string[]
  headless: boolean
}
