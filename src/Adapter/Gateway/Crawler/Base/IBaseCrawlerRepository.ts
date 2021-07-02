export interface IBaseCrawlerRepository {
  get getOptions(): Options
  set setOptions(Options: Options)
}

export type Options = {
  args: string[]
  headless: boolean
}
