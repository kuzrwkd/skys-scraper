import { LaunchOptions } from 'puppeteer'

export interface IBaseCrawlerRepository {
  get getOptions(): LaunchOptions
  set setOptions(Options: LaunchOptions)
}

export type Options = {
  args: string[]
  headless: boolean
}
