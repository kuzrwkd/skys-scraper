import dynamodbUseCase, {
  IMediaTableUseCase,
  INewsfeedTableUseCase,
  INewsfeedIndexTableUseCase,
} from '@kuzrwkd/skys-core/dynamodb';
import logger, { failedLogger } from '@kuzrwkd/skys-core/logger';
import { injectable } from 'tsyringe';

import { newsfeedCrawler, ICrawler } from '@/crawlers';
export interface INewsfeedCrawlerInteract {
  handler(): Promise<void>;
}

@injectable()
export class NewsfeedCrawlerInteract implements INewsfeedCrawlerInteract {
  private newsfeedTableUseCase: INewsfeedTableUseCase;
  private mediaTableUseCase: IMediaTableUseCase;
  private newsfeedIndexTableUseCase: INewsfeedIndexTableUseCase;
  private nikkeiPreliminaryReportCrawler: ICrawler;

  constructor() {
    this.newsfeedTableUseCase = dynamodbUseCase.resolve<INewsfeedTableUseCase>('NewsfeedTableUseCase');
    this.mediaTableUseCase = dynamodbUseCase.resolve<IMediaTableUseCase>('MediaTableUseCase');
    this.newsfeedIndexTableUseCase = dynamodbUseCase.resolve<INewsfeedIndexTableUseCase>('NewsfeedIndexTableUseCase');
    this.nikkeiPreliminaryReportCrawler = newsfeedCrawler.resolve<ICrawler>('NikkeiPreliminaryReportCrawler');
  }

  async handler() {
    try {
      const crawlerIndex = await this.newsfeedIndexTableUseCase.queryNewsfeedIndexByMediaId(1);

      if (!crawlerIndex) {
        logger.error('crawlers index not found', failedLogger());
        return;
      }

      const media = await this.mediaTableUseCase.queryMediaByMediaId(1);
      if (!media) {
        logger.error('media not found', failedLogger());
        return;
      }

      for (const crawlerIndexItem of crawlerIndex) {
        const { media_id: mediaId, url, category } = crawlerIndexItem;
        const crawler = this.nikkeiPreliminaryReportCrawler.handle(url, media);

        await crawler.then(async (crawlingData) => {
          if (crawlingData) {
            for (const crawlerItem of crawlingData) {
              const { url: articleUrl, article_updated_at: articleUpdatedAt } = crawlerItem;
              const existsRecord = await this.newsfeedTableUseCase.getNewsfeedByUrl(articleUrl);

              if (!existsRecord) {
                await this.newsfeedTableUseCase.createNewsfeed({ ...crawlerItem, media_id: mediaId, category });
                return;
              }

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
