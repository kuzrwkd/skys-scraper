import dynamodbUseCase, { IMediaTableUseCase, INewsfeedTableUseCase } from '@kuzrwkd/skys-core/dynamodb';
import logger, { failedLogger } from '@kuzrwkd/skys-core/logger';
import { injectable, inject } from 'tsyringe';

import { INewsfeedCrawlerIndex, RequestDataParams } from '@/useCase/NewsfeedUseCase';

export interface INewsfeedInteract {
  handle(data: RequestDataParams[]): Promise<boolean | undefined>;
}

@injectable()
export class NewsfeedInteract implements INewsfeedInteract {
  private newsfeedTableUseCase: INewsfeedTableUseCase;
  private mediaTableUseCase: IMediaTableUseCase;

  constructor(@inject('NewsfeedCrawlerIndex') private newsFeedCrawlerIndex: INewsfeedCrawlerIndex) {
    this.newsfeedTableUseCase = dynamodbUseCase.resolve<INewsfeedTableUseCase>('NewsfeedTableUseCase');
    this.mediaTableUseCase = dynamodbUseCase.resolve<IMediaTableUseCase>('MediaTableUseCase');
  }

  async handle(data: RequestDataParams[]) {
    try {
      for (const { mediaId, url } of data) {
        const media = await this.mediaTableUseCase.getMediaById(mediaId);

        if (!media) {
          logger.error('media not found', failedLogger());
          return;
        }

        const crawler = this.newsFeedCrawlerIndex.handle(url, media);

        await crawler.then(async (crawlingData) => {
          if (crawlingData) {
            for (const item of crawlingData) {
              const { url: articleUrl, article_updated_at: articleUpdatedAt } = item;
              const existsRecord = await this.newsfeedTableUseCase.getNewsfeedByUrl(articleUrl);

              if (!existsRecord) {
                await this.newsfeedTableUseCase.createNewsfeed({ ...item, media_id: mediaId });
              }

              // レコードが存在する且つ、クローリングの結果、articleUpdateAtが存在する場合
              if (existsRecord && articleUpdatedAt) {
                // レコードのarticleUpdatedAtとクローリング結果のarticleUpdatedAtが異なる場合はレコードを更新する
                if (articleUpdatedAt !== existsRecord.article_updated_at) {
                  await this.newsfeedTableUseCase.updateNewsfeed({ ...existsRecord });
                }
              }
            }
          }
        });
      }

      return true;
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error.message, failedLogger());
      }
    }
  }
}
