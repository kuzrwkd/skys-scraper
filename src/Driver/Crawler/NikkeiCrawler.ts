import { injectable } from 'tsyringe'
import { INewsFeedRepository } from '@/Adapter/Repository/Crawler/INewsFeedRepository'

@injectable()
export class NikkeiCrawler implements INewsFeedRepository {
  crawler() {
    return 'nikkei'
  }
}
