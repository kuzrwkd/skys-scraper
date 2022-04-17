/**
 * Lib
 */
import { injectable, inject } from 'tsyringe';
import { createRandomString } from '@/util/log';

@injectable()
export class NewsFeedInteract {
  constructor(
    @inject('NewsFeedEntity') private newsFeed: NewsFeed.INewsFeedEntity,
    @inject('NewsFeedCrawlerIndex') private newsFeedCrawlerIndex: NewsFeed.INewsFeedCrawlerIndex,
    @inject('NewsFeedDB') private NewsFeedDB: NewsFeed.INewsFeedDB,
  ) {}

  async handle(data: NewsFeed.RequestDataParams[], tracking_id: string) {
    try {
      for (const { organizationId, url } of data) {
        const useCaseTrackingId = `${tracking_id}-i-${createRandomString()}`;
        const { name: organizationName } = await this.NewsFeedDB.getOrganization(
          organizationId,
          `${useCaseTrackingId}-db-${createRandomString()}`,
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
              const dataBaseTrackingId = `${articleId}-db-${createRandomString()}`;
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
