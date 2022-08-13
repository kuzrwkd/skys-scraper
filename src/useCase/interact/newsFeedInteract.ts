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
      for (const { mediaId, url } of data) {
        const useCaseTrackingId = `${tracking_id}-i-${createRandomString()}`;
        const { name: mediaName } = await this.NewsFeedDB.getMedia(
          mediaId,
          `${useCaseTrackingId}-db-${createRandomString()}`,
        );

        const media: NewsFeed.Media = {
          id: mediaId,
          name: mediaName,
        };

        const crawler = this.newsFeedCrawlerIndex.handle(url, media, useCaseTrackingId);

        await crawler.then(async (crawlingData) => {
          if (crawlingData) {
            for (const item of crawlingData) {
              const { id: articleId, url: articleUrl, article_updated_at: articleUpdatedAt } = item;
              const dataBaseTrackingId = `${articleId}-db-${createRandomString()}`;
              const existsRecord = await this.NewsFeedDB.read(articleUrl, media, dataBaseTrackingId);

              if (!existsRecord) {
                await this.NewsFeedDB.create(
                  {
                    ...item,
                    media,
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
                      media,
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
