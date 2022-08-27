import dynamodbUseCase, {
  IMediaTableUseCase,
  INewsfeedTableUseCase,
  ICrawlerIndexTableUseCase,
} from '@kuzrwkd/skys-core/dynamodb';
import logger, { failedLogger } from '@kuzrwkd/skys-core/logger';
import { injectable, inject } from 'tsyringe';

import { ICrawlerIndexForNewsfeed } from '@/useCase/NewsfeedCrawlerUseCase';
export interface INewsfeedCrawlerInteract {
  handle(payload: number): Promise<boolean | undefined>;
}

@injectable()
export class NewsfeedCrawlerInteract implements INewsfeedCrawlerInteract {
  private newsfeedTableUseCase: INewsfeedTableUseCase;
  private mediaTableUseCase: IMediaTableUseCase;
  private crawlerIndexTableUseCase: ICrawlerIndexTableUseCase;

  constructor(@inject('NewsfeedCrawlerIndex') private crawlerIndexForNewsfeed: ICrawlerIndexForNewsfeed) {
    this.newsfeedTableUseCase = dynamodbUseCase.resolve<INewsfeedTableUseCase>('NewsfeedTableUseCase');
    this.mediaTableUseCase = dynamodbUseCase.resolve<IMediaTableUseCase>('MediaTableUseCase');
    this.crawlerIndexTableUseCase = dynamodbUseCase.resolve<ICrawlerIndexTableUseCase>('CrawlerIndexTableUseCase');
  }

  async handle(payload: number) {
    try {
      const crawlerIndex = await this.crawlerIndexTableUseCase.queryCrawlerIndexByMediaId(payload);

      if (!crawlerIndex) {
        return;
      }

      for (const { media_id: mediaId, url } of crawlerIndex) {
        const media = await this.mediaTableUseCase.getMediaById(mediaId);

        if (!media) {
          logger.error('media not found', failedLogger());
          return;
        }

        const crawler = this.crawlerIndexForNewsfeed.handle(url, media);

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
