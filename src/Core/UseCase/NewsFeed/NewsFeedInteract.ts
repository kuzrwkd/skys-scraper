import { injectable, inject } from 'tsyringe'

@injectable()
export class NewsFeedInteract {
  constructor(
    @inject('NewsFeedEntity') private newsFeed: NewsFeed.INewsFeedEntity,
    @inject('NikkeiPreliminaryReportCrawlerRepository')
    private nikkeiPreliminaryReportCrawlerRepository: NewsFeed.INikkeiPreliminaryReportCrawlerRepository,
    @inject('NewsFeedRepository') private newsFeedRepository: NewsFeed.INewsFeedDBRepository,
    @inject('NewsFeedOutputPort') private newsFeedOutputPort: NewsFeed.INewsFeedOutputPort,
    @inject('NewsFeedInputPort') private newsFeedInputPort: NewsFeed.INewsFeedInputPort,
  ) {}

  /**
   * newsFeedのUseCase
   */
  async handle() {
    try {
      const name = this.newsFeedInputPort.getName
      const crawler = this.nikkeiPreliminaryReportCrawlerRepository.crawler()

      await crawler.then(async (crawlingData) => {
        const data: NewsFeed.Entity[] = []
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

            // レコードが存在する且つ、articleUpdateAtがnullの場合はレコードを更新する
            if (existsRecord != null && existsRecord.articleUpdatedAt == null) {
              await this.newsFeedRepository.update(item)
            }
          }
          this.newsFeed.setNewsFeed = data
        }
      })

      const insertData = this.newsFeed.getNewsFeed

      await this.newsFeedRepository.create(insertData)

      this.newsFeedOutputPort.setResult = 'result'
    } catch (e) {
      this.newsFeedOutputPort.setResult = 'failed'
    }
  }
}
