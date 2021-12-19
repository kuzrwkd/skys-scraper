/**
 * Lib
 */
import { injectable, inject } from 'tsyringe';

@injectable()
export class NewsFeedInteract {
  constructor(
    @inject('LogTool') private logTool: Tools.ILogTool,
    @inject('NewsFeedEntity') private newsFeed: NewsFeed.INewsFeedEntity,
    @inject('NewsFeedCrawlerIndex') private newsFeedCrawlerIndex: NewsFeed.INewsFeedCrawlerIndex,
    @inject('NewsFeedDBRepository') private newsFeedDBRepository: NewsFeed.INewsFeedDBRepository,
    @inject('NewsFeedInputPort') private newsFeedInputPort: NewsFeed.INewsFeedInputPort,
  ) {}

  /**
   * newsFeedのUseCase
   */
  async handle(data: NewsFeed.RequestDataParams[], tracking_id: string) {
    try {
      for (const { organizationId, url } of data) {
        const useCaseTrackingId = `${tracking_id}-i-${this.logTool.createRandomString()}`;
        const { name: organizationName } = await this.newsFeedDBRepository.getOrganization(
          organizationId,
          `${useCaseTrackingId}-db-${this.logTool.createRandomString()}`,
        );

        const organization: NewsFeed.Organization = {
          id: organizationId,
          name: organizationName,
        };

        const crawler = this.newsFeedCrawlerIndex.handle(url, organization, useCaseTrackingId);

        await crawler.then(async (crawlingData) => {
          if (crawlingData) {
            for (const { id, title, url, article_updated_at, article_created_at } of crawlingData) {
              const dataBaseTrackingId = `${id}-db-${this.logTool.createRandomString()}`;
              const existsRecord: NewsFeed.Entity = await this.newsFeedDBRepository.read(
                url,
                organization,
                dataBaseTrackingId,
              );

              if (!existsRecord) {
                await this.newsFeedDBRepository.create(
                  {
                    id,
                    title,
                    url,
                    organization,
                    article_created_at,
                    article_updated_at: article_updated_at ?? '',
                  },
                  dataBaseTrackingId,
                );
              }

              // レコードが存在する且つ、クローリングの結果、articleUpdateAtが存在する場合
              if (existsRecord && article_updated_at) {
                // レコードのarticleUpdatedAtとクローリング結果のarticleUpdatedAtが異なる場合はレコードを更新する
                if (article_updated_at !== existsRecord.article_updated_at) {
                  await this.newsFeedDBRepository.update(
                    {
                      id: existsRecord.id,
                      title,
                      url,
                      organization,
                      article_created_at,
                      article_updated_at,
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
