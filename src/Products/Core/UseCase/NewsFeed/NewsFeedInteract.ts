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
  async handle(data: NewsFeed.RequestDataParams[]) {
    try {
      for (const { organizationId, contentsId, url } of data) {
        const organization: NewsFeed.Organization = {
          id: organizationId,
          name: (await this.newsFeedDBRepository.getOrganization(organizationId)).name ?? null,
        };

        const contents: NewsFeed.Contents = {
          id: contentsId,
          name: (await this.newsFeedDBRepository.getOrganization(contentsId)).name ?? null,
        };

        const crawler = this.newsFeedCrawlerIndex.handle(url, organization);

        await crawler.then(async (crawlingData) => {
          if (crawlingData != null) {
            for (const { title, url, articleUpdatedAt, articleCreatedAt } of crawlingData) {
              const existsRecord: NewsFeed.Entity = (await this.newsFeedDBRepository.read(url, organization)) ?? null;

              if (existsRecord == null) {
                await this.newsFeedDBRepository.create({
                  title,
                  url,
                  organization,
                  contents,
                  articleCreatedAt,
                  articleUpdatedAt,
                });
              }

              // レコードが存在する且つ、クローリングの結果、articleUpdateAtが存在する場合
              if (existsRecord != null && articleUpdatedAt != null) {
                // レコードのarticleUpdatedAtとクローリング結果のarticleUpdatedAtが異なる場合はレコードを更新する
                if (articleUpdatedAt !== existsRecord.articleUpdatedAt) {
                  await this.newsFeedDBRepository.update({
                    id: existsRecord.id,
                    title,
                    url,
                    organization,
                    contents,
                    articleCreatedAt,
                    articleUpdatedAt,
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
