import dynamodbUseCase, {
  IMediaTableUseCase,
  INewsfeedTableUseCase,
  INewsfeedIndexTableUseCase,
} from '@kuzrwkd/skys-core/dynamodb';
import { MediaSchema } from '@kuzrwkd/skys-core/entities';
import logger, { failedLogger } from '@kuzrwkd/skys-core/logger';
import { injectable } from 'tsyringe';

import newsfeedCrawlerUseCase, {
  INikkeiPreliminaryReportCrawler,
  NewsfeedCrawlerResultItem,
} from '@/useCase/NewsfeedCrawlerUseCase';
export interface INewsfeedCrawlerInteract {
  handler(mediaId: number): Promise<void>;
  selectCrawler(url: string, media: MediaSchema): Promise<NewsfeedCrawlerResultItem[] | undefined>;
}

@injectable()
export class NewsfeedCrawlerInteract implements INewsfeedCrawlerInteract {
  private newsfeedTableUseCase: INewsfeedTableUseCase;
  private mediaTableUseCase: IMediaTableUseCase;
  private newsfeedIndexTableUseCase: INewsfeedIndexTableUseCase;
  private nikkeiPreliminaryReportCrawler: INikkeiPreliminaryReportCrawler;
  constructor() {
    this.newsfeedTableUseCase = dynamodbUseCase.resolve<INewsfeedTableUseCase>('NewsfeedTableUseCase');
    this.mediaTableUseCase = dynamodbUseCase.resolve<IMediaTableUseCase>('MediaTableUseCase');
    this.newsfeedIndexTableUseCase = dynamodbUseCase.resolve<INewsfeedIndexTableUseCase>('NewsfeedIndexTableUseCase');
    this.nikkeiPreliminaryReportCrawler = newsfeedCrawlerUseCase.resolve<INikkeiPreliminaryReportCrawler>(
      'NikkeiPreliminaryReportCrawler',
    );
  }

  async selectCrawler(url: string, media: MediaSchema) {
    const { media_id } = media;
    switch (media_id) {
      case 1:
        return await this.nikkeiPreliminaryReportCrawler.handle(url, media);
    }
  }

  async handler(mediaId: number) {
    try {
      const crawlerIndex = await this.newsfeedIndexTableUseCase.queryNewsfeedIndexByMediaId(mediaId);

      if (!crawlerIndex) {
        logger.error('crawler index not found', failedLogger());
        return;
      }

      const media = await this.mediaTableUseCase.queryMediaByMediaId(mediaId);
      if (!media) {
        logger.error('media not found', failedLogger());
        return;
      }

      for (const { media_id: mediaId, url, category } of crawlerIndex) {
        const crawler = this.selectCrawler(url, media);

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
