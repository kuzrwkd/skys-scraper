import dynamodbUseCase, {
  IMediaTableUseCase,
  INewsfeedTableUseCase,
  INewsfeedIndexTableUseCase,
} from '@kuzrwkd/skys-core/dynamodb';
import logger, { failedLogger } from '@kuzrwkd/skys-core/logger';
import { injectable } from 'tsyringe';

import newsfeedCrawlerUseCase, { ICrawlerIndexForNewsfeed } from '@/useCase/NewsfeedCrawlerUseCase';
export interface INewsfeedCrawlerInteract {
  handler(mediaId: number): Promise<void>;
}

@injectable()
export class NewsfeedCrawlerInteract implements INewsfeedCrawlerInteract {
  private newsfeedTableUseCase: INewsfeedTableUseCase;
  private mediaTableUseCase: IMediaTableUseCase;
  private newsfeedIndexTableUseCase: INewsfeedIndexTableUseCase;
  private crawlerIndexForNewsfeed: ICrawlerIndexForNewsfeed;

  constructor() {
    this.newsfeedTableUseCase = dynamodbUseCase.resolve<INewsfeedTableUseCase>('NewsfeedTableUseCase');
    this.mediaTableUseCase = dynamodbUseCase.resolve<IMediaTableUseCase>('MediaTableUseCase');
    this.newsfeedIndexTableUseCase = dynamodbUseCase.resolve<INewsfeedIndexTableUseCase>('NewsfeedIndexTableUseCase');
    this.crawlerIndexForNewsfeed = newsfeedCrawlerUseCase.resolve<ICrawlerIndexForNewsfeed>('CrawlerIndexForNewsfeed');
  }

  async handler(mediaId: number) {
    try {
      const crawlerIndex = await this.newsfeedIndexTableUseCase.queryNewsfeedIndexByMediaId(mediaId);

      if (!crawlerIndex) {
        logger.error('crawler index not found', failedLogger());
        return;
      }

      const media = await this.mediaTableUseCase.getMediaById(mediaId);

      if (!media) {
        logger.error('media not found', failedLogger());
        return;
      }

      for (const { media_id: mediaId, url, category } of crawlerIndex) {
        const crawler = this.crawlerIndexForNewsfeed.builder(url, media);

        await crawler.then(async (crawlingData) => {
          if (crawlingData) {
            for (const crawlerItem of crawlingData) {
              const { url: articleUrl, article_updated_at: articleUpdatedAt } = crawlerItem;
              const existsRecord = await this.newsfeedTableUseCase.getNewsfeedByUrl(articleUrl);

              if (!existsRecord) {
                await this.newsfeedTableUseCase.createNewsfeed({ ...crawlerItem, media_id: mediaId, category });
                return;
              }

              // レコードのarticleUpdatedAtとクローリング結果のarticleUpdatedAtが異なる場合はレコードを更新する
              if (articleUpdatedAt && articleUpdatedAt !== existsRecord.article_updated_at) {
                await this.newsfeedTableUseCase.updateNewsfeed({ ...existsRecord });
              }
            }
          }
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error.message, failedLogger());
      }
    }
  }
}
