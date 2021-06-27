// lib
import { injectable, inject } from 'tsyringe'

// type
import { INewsFeedEntity } from '@/Entity/NewsFeed/INewsFeedEntity'
import { InputData } from '@/UseCase/NewsFeed/Interface'
import { INewsFeedRepository } from '@/Adapter/Repository/Crawler/INewsFeedRepository'

@injectable()
export class NewsFeedInteract {
  constructor(
    @inject('NewsFeedEntity') private newsFeed: INewsFeedEntity,
    @inject('NikkeiCrawler') private nikkeiCrawler: INewsFeedRepository,
  ) {}

  handle(inputData: InputData) {
    const name = inputData.name
    console.log(name)
    const crawler = this.nikkeiCrawler.crawler()
    console.log(crawler)
    this.newsFeed.setNewsFeedEntity = {
      title: '',
      url: '',
      image: '',
      organization: {
        logo: '',
        name: '',
      },
      createdAt: '',
      updatedAt: '',
    }
    const test = this.newsFeed.getNewsFeedEntity
    console.log(JSON.stringify(test))
    return JSON.stringify(test)
  }
}
