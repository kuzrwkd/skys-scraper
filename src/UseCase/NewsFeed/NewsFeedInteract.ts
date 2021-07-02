// lib
import { injectable, inject } from 'tsyringe'

// type
import { INewsFeedEntity } from '@/Entity/NewsFeed/INewsFeedEntity'
import { InputData } from '@/UseCase/NewsFeed/INewsFeedUseCase'
import { INikkeiPreliminaryReportCrawlerRepository } from '@/Adapter/Gateway/Crawler/Nikkei/INikkeiPreliminaryReportCrawlerRepository'
import { INewsFeedRepository } from '@/Adapter/Gateway/DB/INewsFeedRepository'

@injectable()
export class NewsFeedInteract {
  constructor(
    @inject('NewsFeedEntity') private newsFeed: INewsFeedEntity,
    @inject('NikkeiPreliminaryReportCrawlerRepository')
    private nikkeiPreliminaryReportCrawlerRepository: INikkeiPreliminaryReportCrawlerRepository,
    @inject('NewsFeedRepository') private newsFeedRepository: INewsFeedRepository,
  ) {}

  async handle(inputData: InputData) {
    try {
      const name = inputData.name
      const crawler = this.nikkeiPreliminaryReportCrawlerRepository.crawler()

      await crawler.then((data) => {
        if (data != null) {
          this.newsFeed.setNewsFeed = data.map((item) => {
            return {
              ...item,
              organizationName: name,
            }
          })
        }
      })

      const data = this.newsFeed.getNewsFeed
      await this.newsFeedRepository.create(data)
      return 'success'
    } catch (e) {
      return 'failed'
    }
  }
}
