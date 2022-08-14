import { injectable, inject } from 'tsyringe';

@injectable()
export class NewsFeedInteract {
  constructor(
    @inject('NewsFeedEntity') private newsFeed: NewsFeed.INewsFeedEntity,
    @inject('NewsFeedCrawlerIndex') private newsFeedCrawlerIndex: NewsFeed.INewsFeedCrawlerIndex,
    @inject('NewsFeedDB') private NewsFeedDB: NewsFeed.INewsFeedDB,
  ) {}

  async handle(data: NewsFeed.RequestDataParams[]) {
    try {
      for (const { mediaId, url } of data) {
        const { name: mediaName } = await this.NewsFeedDB.getMedia(mediaId);

        const media: NewsFeed.Media = {
          id: mediaId,
          name: mediaName,
        };

        const crawler = this.newsFeedCrawlerIndex.handle(url, media);

        await crawler.then(async (crawlingData) => {
          if (crawlingData) {
            for (const item of crawlingData) {
              const { url: articleUrl, article_updated_at: articleUpdatedAt } = item;
              const existsRecord = await this.NewsFeedDB.read(articleUrl, media);

              if (!existsRecord) {
                await this.NewsFeedDB.create({
                  ...item,
                  media,
                });
              }

              // レコードが存在する且つ、クローリングの結果、articleUpdateAtが存在する場合
              if (existsRecord && articleUpdatedAt) {
                // レコードのarticleUpdatedAtとクローリング結果のarticleUpdatedAtが異なる場合はレコードを更新する
                if (articleUpdatedAt !== existsRecord.article_updated_at) {
                  await this.NewsFeedDB.update({ ...existsRecord, media });
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
