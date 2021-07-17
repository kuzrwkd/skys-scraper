/**
 * Lib
 */
import { injectable, inject } from 'tsyringe';

@injectable()
export class NewsFeedInteract {
  constructor(
    @inject('NewsFeedEntity') private newsFeed: NewsFeed.INewsFeedEntity,
    @inject('NewsFeedCrawlerIndex') private newsFeedCrawlerIndex: NewsFeed.INewsFeedCrawlerIndex,
    @inject('NewsFeedDBRepository') private newsFeedDBRepository: NewsFeed.INewsFeedDBRepository,
    @inject('NewsFeedInputPort') private newsFeedInputPort: NewsFeed.INewsFeedInputPort,
  ) {}

  /**
   * newsFeedのUseCase
   */
  async handle(inputData: NewsFeed.InputData) {
    try {
      const organizationId = inputData.organizationId;
      const contentsId = inputData.contentsId;
      const url = inputData.url;

      const organization: NewsFeed.Organization = {
        id: organizationId,
        name: (await this.newsFeedDBRepository.findOrganization(organizationId)).name ?? null,
      };

      const contents: NewsFeed.Contents = {
        id: contentsId,
        name: (await this.newsFeedDBRepository.findContents(contentsId)).name ?? null,
      };

      for (const u of url) {
        const crawler = this.newsFeedCrawlerIndex.handle(u, organization);

        await crawler.then(async (crawlingData) => {
          if (crawlingData != null) {
            for (const item of crawlingData) {
              const existsRecord: NewsFeed.Entity =
                (await this.newsFeedDBRepository.read(item.url, organization)) ?? null;

              if (existsRecord == null) {
                await this.newsFeedDBRepository.create({
                  ...item,
                  organization,
                  contents,
                  articleCreatedAt: item.articleCreatedAt,
                  articleUpdatedAt: item.articleUpdatedAt,
                });
              }

              // レコードが存在する且つ、クローリングの結果、articleUpdateAtが存在する場合
              if (existsRecord != null && item.articleUpdatedAt != null) {
                // レコードのarticleUpdatedAtとクローリング結果のarticleUpdatedAtが異なる場合はレコードを更新する
                if (item.articleUpdatedAt !== existsRecord.articleUpdatedAt) {
                  await this.newsFeedDBRepository.update({
                    id: existsRecord.id,
                    ...item,
                    organization,
                    contents,
                    title: item.title,
                    articleUpdatedAt: item.articleUpdatedAt,
                  });
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
