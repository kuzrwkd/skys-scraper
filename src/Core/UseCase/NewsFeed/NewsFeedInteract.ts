// lib
import { injectable, inject } from 'tsyringe'

// type
import { INewsFeedEntity, Entity } from '@/Core/Entity/NewsFeed/INewsFeedEntity'
import { InputData } from '@/Core/UseCase/NewsFeed/INewsFeedUseCase'
import { INikkeiPreliminaryReportCrawlerRepository } from '@/Adapter/CrawlerGateway/Nikkei/INikkeiPreliminaryReportCrawlerRepository'
import { INewsFeedRepository } from '@/Adapter/DBGateway/INewsFeedRepository'

@injectable()
export class NewsFeedInteract {
  constructor(
    @inject('NewsFeedEntity') private newsFeed: INewsFeedEntity,
    @inject('NikkeiPreliminaryReportCrawlerRepository')
    private nikkeiPreliminaryReportCrawlerRepository: INikkeiPreliminaryReportCrawlerRepository,
    @inject('NewsFeedRepository') private newsFeedRepository: INewsFeedRepository,
  ) {}

  /**
   * newsFeedのUseCase
   * @param inputData
   */
  async handle(inputData: InputData) {
    try {
      const name = inputData.name
      const crawler = this.nikkeiPreliminaryReportCrawlerRepository.crawler()

      await crawler.then(async (crawlingData) => {
        const data: Entity[] = []
        if (crawlingData != null) {
          for (const item of crawlingData) {
            const existsRecord = (await this.newsFeedRepository.read(item.url)) ?? null

            if (existsRecord == null) {
              data.push({
                ...item,
                organizationName: name,
                articleCreatedAt: item.articleCreatedAt,
                articleUpdatedAt: item.articleUpdatedAt,
              })
            }

            // レコードが存在する且つ、articleUpdateAtがnullの場合レコードを更新する
            if (existsRecord != null && existsRecord.articleUpdatedAt == null) {
              await this.newsFeedRepository.update(item)
            }
          }
          this.newsFeed.setNewsFeed = data
        }
      })

      const insertData = this.newsFeed.getNewsFeed

      await this.newsFeedRepository.create(insertData)
      return 'success'
    } catch (e) {
      return 'failed'
    }
  }
}
