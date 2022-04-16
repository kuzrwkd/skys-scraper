/**
 * Lib
 */
import { injectable, inject } from 'tsyringe';

@injectable()
export class NewsFeedInteract {
  constructor(
    @inject('LogUtil') private logUtil: Util.ILogUtil,
    @inject('NewsFeedEntity') private newsFeed: NewsFeed.INewsFeedEntity,
    @inject('NewsFeedCrawlerIndex') private newsFeedCrawlerIndex: NewsFeed.INewsFeedCrawlerIndex,
    @inject('NewsFeedDB') private NewsFeedDB: NewsFeed.INewsFeedDB,
  ) {}

  /**
   * newsFeedのUseCase
   */
  async handle(data: NewsFeed.RequestDataParams[], tracking_id: string) {
    try {
      for (const { organizationId, url } of data) {
        const useCaseTrackingId = `${tracking_id}-i-${this.logUtil.createRandomString()}`;
        const { name: organizationName } = await this.NewsFeedDB.getOrganization(
          organizationId,
          `${useCaseTrackingId}-db-${this.logUtil.createRandomString()}`,
        );

        const organization: NewsFeed.Organization = {
          id: organizationId,
          name: organizationName,
        };

        const crawler = this.newsFeedCrawlerIndex.handle(url, organization, useCaseTrackingId);

        await crawler.then(async (crawlingData) => {
          if (crawlingData) {
            for (const item of crawlingData) {
              const { id: articleId, url: articleUrl, article_updated_at: articleUpdatedAt } = item;
              const dataBaseTrackingId = `${articleId}-db-${this.logUtil.createRandomString()}`;
              const existsRecord = await this.NewsFeedDB.read(articleUrl, organization, dataBaseTrackingId);

              if (!existsRecord) {
                await this.NewsFeedDB.create(
                  {
                    ...item,
                    organization,
                  },
                  dataBaseTrackingId,
                );
              }

              // レコードが存在する且つ、クローリングの結果、articleUpdateAtが存在する場合
              if (existsRecord && articleUpdatedAt) {
                // レコードのarticleUpdatedAtとクローリング結果のarticleUpdatedAtが異なる場合はレコードを更新する
                if (articleUpdatedAt !== existsRecord.article_updated_at) {
                  await this.NewsFeedDB.update(
                    {
                      ...existsRecord,
                      organization,
                    },
                    dataBaseTrackingId,
                  );
                }
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
