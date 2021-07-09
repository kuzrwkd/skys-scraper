/**
 * Lib
 */
import { injectable, inject } from 'tsyringe';

@injectable()
export class NewsFeedInteract {
  constructor(
    @inject('NewsFeedEntity') private newsFeed: NewsFeed.INewsFeedEntity,
    @inject('NikkeiPreliminaryReportCrawlerRepository')
    private nikkeiPreliminaryReportCrawlerRepository: NewsFeed.INikkeiPreliminaryReportCrawlerRepository,
    @inject('NewsFeedRepository') private newsFeedRepository: NewsFeed.INewsFeedDBRepository,
    @inject('NewsFeedInputPort') private newsFeedInputPort: NewsFeed.INewsFeedInputPort,
  ) {}

  /**
   * newsFeedのUseCase
   */
  async handle(inputData: NewsFeed.InputData) {
    try {
      const organizationId = inputData.organizationId;
      const url = inputData.url;

      for (const u of url) {
        const crawler = this.nikkeiPreliminaryReportCrawlerRepository.crawler(u);

        await crawler.then(async (crawlingData) => {
          const data: NewsFeed.Entity[] = [];
          if (crawlingData != null) {
            for (const item of crawlingData) {
              const existsRecord = (await this.newsFeedRepository.read(item.url)) ?? null;

              if (existsRecord == null) {
                data.push({
                  ...item,
                  organizationId,
                  articleCreatedAt: item.articleCreatedAt,
                  articleUpdatedAt: item.articleUpdatedAt,
                });
              }

              // レコードが存在する且つ、articleUpdateAtがnullの場合はレコードを更新する
              if (existsRecord != null && existsRecord.articleUpdatedAt == null) {
                Object.assign(item, { organizationId });
                await this.newsFeedRepository.update(item as NewsFeed.Entity);
              }
            }
            this.newsFeed.setNewsFeed = data;
          }
        });

        const insertData = this.newsFeed.getNewsFeed;

        await this.newsFeedRepository.create(insertData);
      }

      return true;
    } catch (e) {
      return false;
    }
  }
}
