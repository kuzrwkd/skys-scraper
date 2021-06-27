// lib
import { injectable, inject } from 'tsyringe'

// type
import { INewsFeedEntity } from '@/Entity/NewsFeed/INewsFeedEntity'
import { InputData } from '@/UseCase/NewsFeed/INewsFeedUseCase'
import { INikkeiCrawlerRepository } from '@/Adapter/Gateway/Crawler/INikkeiCrawlerRepository'

@injectable()
export class NewsFeedInteract {
  constructor(
    @inject('NewsFeedEntity') private newsFeed: INewsFeedEntity,
    @inject('NikkeiCrawler') private nikkeiCrawler: INikkeiCrawlerRepository,
  ) {}

  handle(inputData: InputData) {
    const name = inputData.name
    console.log(name)
    const crawler = this.nikkeiCrawler.crawler()
    console.log(crawler)
    this.newsFeed.setNewsFeed = {
      title: crawler,
      url: '',
      image: '',
      organization: {
        logo: '',
        name: name,
      },
      createdAt: '',
      updatedAt: '',
    }
    return this.newsFeed.getNewsFeed
  }
}
