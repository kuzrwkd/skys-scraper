import {master, newsfeedTable} from '@kuzrwkd/skys-core/dynamodb';
import {CategorySchema, MediaId, MediaSchema} from '@kuzrwkd/skys-core/entities';
import logger, {failedLogger, startLogger} from '@kuzrwkd/skys-core/logger';
import {inject, injectable} from 'tsyringe';
import {ICrawler} from '@/crawlers';

type NikkeiCrawlerIndex = {
  id: string;
  media: MediaSchema;
  url: string;
  category: CategorySchema;
};

export interface INikkeiNewsCrawlerInteract {
  handler(): Promise<void>;
  getCrawlerIndex(): Promise<NikkeiCrawlerIndex[] | undefined>;
}

@injectable()
export class NikkeiNewsCrawlerInteract implements INikkeiNewsCrawlerInteract {
  constructor(@inject('NikkeiPreliminaryReportCrawler') private readonly nikkeiNewsCrawler: ICrawler) {}

  async getCrawlerIndex() {
    try {
      const masterData = await master.get();
      if (masterData) {
        return masterData.newsfeedIndexAllItems.reduce((acc, item) => {
          if (item.media_id === MediaId.NIKKEI) {
            return [
              ...acc,
              {
                id: item.id,
                media: masterData.mediaAllItems.find(_ => _.media_id === MediaId.NIKKEI) as MediaSchema,
                category: masterData.categoryAllItems.find(_ => _.category_id === item.category_id) as CategorySchema,
                url: item.url,
              },
            ];
          }
          return acc;
        }, [] as NikkeiCrawlerIndex[]);
      }
    } catch (error) {
      if (error instanceof Error) {
        logger.error('Failed to getCrawlerIndex.', failedLogger({result: error}));
      }
    }
  }

  async handler() {
    try {
      logger.info('Start nikkei news crawling.', startLogger());
      const nikkeiCrawlerIndex = await this.getCrawlerIndex();
      if (!nikkeiCrawlerIndex) {
        throw new Error('Invalid nikkeiCrawlerIndex.');
      }
      const crawlers = nikkeiCrawlerIndex.map(async item => {
        const {media, url, category} = item;
        const crawlerParams = {url, media, category};
        return this.nikkeiNewsCrawler.handle(crawlerParams);
      });

      const result = await Promise.all(crawlers);

      for (const item of result.flat()) {
        if (!item) {
          throw new Error('Invalid crawling result item.');
        }
        const newsfeedItem = await newsfeedTable.getItemByUrl(item.url);
        if (!newsfeedItem) {
          await newsfeedTable.putItem(item);
          continue;
        }
        if (item.last_publish_date !== newsfeedItem.last_publish_date) {
          await newsfeedTable.updateLastPublishDate({
            ...newsfeedItem,
            last_publish_date: item.last_publish_date,
          });
        }
        if (!newsfeedItem.category_ids.includes(item.category_id)) {
          await newsfeedTable.updateCategoryIds({
            ...newsfeedItem,
            category_id: item.category_id,
          });
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        logger.error('Failed to nikkei news crawling.', failedLogger({result: error}));
      }
    }
  }
}
