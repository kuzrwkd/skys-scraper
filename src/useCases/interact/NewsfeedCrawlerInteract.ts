import { mediaTable, newsfeedTable, newsfeedIndexTable } from '@kuzrwkd/skys-core/dynamodb';
import logger, { failedLogger } from '@kuzrwkd/skys-core/logger';
import { injectable } from 'tsyringe';

import { newsfeedCrawler, ICrawler } from '@/crawlers';
export interface INewsfeedCrawlerInteract {
  handler(): Promise<void>;
}

@injectable()
export class NewsfeedCrawlerInteract implements INewsfeedCrawlerInteract {
  private nikkeiPreliminaryReportCrawler: ICrawler;

  constructor() {
    this.nikkeiPreliminaryReportCrawler = newsfeedCrawler.resolve<ICrawler>('NikkeiPreliminaryReportCrawler');
  }

  async handler() {
    try {
      const crawlerIndex = await newsfeedIndexTable.getNewsfeedIndexItemsByMediaId(1);

      if (!crawlerIndex) {
        logger.error('crawlers index not found', failedLogger());
        return;
      }

      const media = await mediaTable.getMediaItemByMediaId(1);
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
              const existsRecord = await newsfeedTable.getNewsfeedItemByUrl(articleUrl);

              if (!existsRecord) {
                await newsfeedTable.putNewsfeedItem({ ...crawlerItem, media_id: mediaId, category });
                return;
              }

              if (articleUpdatedAt && articleUpdatedAt !== existsRecord.article_updated_at) {
                await newsfeedTable.updateNewsfeedItem({ ...existsRecord });
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
