// lib
import { injectable, inject } from 'tsyringe'

// type
import { INewsFeedEntity } from '@/Entity/NewsFeed/INewsFeedEntity'
import { INewsFeedInteract, InputData } from '@/UseCase/NewsFeed/Interface'
import { INewsFeedRepository } from '@/Adapter/Repository/Crawler/INewsFeedRepository'

@injectable()
export class NewsFeedInteract implements INewsFeedInteract {
  constructor(
    @inject('NewsFeedEntity') private newsFeed: INewsFeedEntity,
    @inject('NikkeiCrawler') private nikkeiCrawler: INewsFeedRepository,
  ) {}

  handle(inputData: InputData) {
    const name = inputData.name
    console.log(name)
    const crawler = this.nikkeiCrawler.crawler()
    console.log(crawler)
    this.newsFeed.getNewsFeed()
    return 'getTest'
  }
}
