import { Options } from '@/Adapter/Gateway/Crawler/Base/IBaseCrawlerRepository'

export class BaseCrawlerRepository {
  private args: string[]
  private headless: boolean

  constructor() {
    this.args = ['--no-sandbox', '--disable-setuid-sandbox']
    this.headless = true
  }

  get getOptions(): Options {
    return {
      args: this.args,
      headless: this.headless,
    }
  }

  set setOptions(options: Options) {
    this.args = options.args ?? this.args
    this.headless = options.headless ?? this.headless
  }
}
