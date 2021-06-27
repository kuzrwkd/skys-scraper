import { injectable } from 'tsyringe'

@injectable()
export class NikkeiCrawler {
  crawler() {
    return 'nikkei'
  }
}
