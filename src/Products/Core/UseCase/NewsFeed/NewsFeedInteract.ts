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

      const organization: NewsFeed.Organization = {
        id: organizationId,
        name: (await this.newsFeedRepository.findOrganization(organizationId)).name ?? null,
      };

      for (const u of url) {
        const crawler = this.nikkeiPreliminaryReportCrawlerRepository.crawler(u, organization);

        await crawler.then(async (crawlingData) => {
          if (crawlingData != null) {
            for (const item of crawlingData) {
              const existsRecord = (await this.newsFeedRepository.read(item.url, organization)) ?? null;

              if (existsRecord == null) {
                await this.newsFeedRepository.create({
                  ...item,
                  organization,
                  articleCreatedAt: item.articleCreatedAt,
                  articleUpdatedAt: item.articleUpdatedAt,
                });
              }

              // レコードが存在する且つ、クローリングの結果、articleUpdateAtが存在する場合はレコードを更新する
              if (existsRecord != null && item.articleUpdatedAt != null) {
                await this.newsFeedRepository.update({
                  id: existsRecord.id,
                  ...item,
                  organization,
                  title: item.title,
                  articleUpdatedAt: item.articleUpdatedAt,
                });
              }
            }
          }
        });
      }

      return true;
    } catch (e) {
      return false;
    }
  }
}
