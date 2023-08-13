import {mediaTable, newsfeedIndexTable, newsfeedTable} from '@kuzrwkd/skys-core/dynamodb';
import {MEDIA_ID, MediaSchema, NewsfeedIndexCategories} from '@kuzrwkd/skys-core/entities';
import logger, {failedLogger} from '@kuzrwkd/skys-core/logger';
import {injectable, inject} from 'tsyringe';
import {ICrawler, CrawlerItem} from '@/crawlers';

type NewsfeedIndexAllItemsWithMedia = {
  id: string;
  media: MediaSchema;
  url: string;
  category: NewsfeedIndexCategories;
  crawlerInstance: ICrawler;
};

export interface INewsfeedCrawlerInteract {
  handler(): Promise<void>;
}

@injectable()
export class NewsfeedCrawlerInteract implements INewsfeedCrawlerInteract {
  constructor(@inject('NikkeiPreliminaryReportCrawler') private readonly nikkeiPreliminaryReportCrawler: ICrawler) {}

  async handler() {
    const crawlerInstances = [this.nikkeiPreliminaryReportCrawler];
    const newsfeedIndexAllItems = await newsfeedIndexTable.getNewsfeedIndexAllItems();

    if (!newsfeedIndexAllItems) {
      logger.error('newsfeed items not found', failedLogger());
      return;
    }

    const mediaAllItems = await mediaTable.getMediaAllItems();

    if (!mediaAllItems) {
      logger.error('media items not found', failedLogger());
      return;
    }

    const nikkei = mediaAllItems.find(_ => _.media_id === MEDIA_ID.nikkei);

    if (!nikkei) {
      logger.error('nikkei not found', failedLogger());
      return;
    }

    const newsfeedIndexAllItemsWithMedia = newsfeedIndexAllItems.reduce((acc, item) => {
      switch (item.media_id) {
        case MEDIA_ID.nikkei:
          return [
            ...acc,
            {
              id: item.id,
              media: nikkei,
              category: item.category,
              url: item.url,
              crawlerInstance: this.nikkeiPreliminaryReportCrawler,
            },
          ];
        default:
          return acc;
      }
    }, [] as NewsfeedIndexAllItemsWithMedia[]);

    const crawlerResult: CrawlerItem[] = [];

    for (const item of newsfeedIndexAllItemsWithMedia) {
      const {media, url, category, crawlerInstance} = item;
      const crawlerParams = {url, media, category};
      const result = await crawlerInstance.handle(crawlerParams);

      if (result) {
        crawlerResult.push(...result);
      }
    }

    for (const crawlerItem of crawlerResult) {
      const {url: articleUrl, article_updated_at: articleUpdatedAt} = crawlerItem;
      const newsfeedItem = await newsfeedTable.getNewsfeedItemByUrl(articleUrl);

      if (!newsfeedItem) {
        await newsfeedTable.putNewsfeedItem(crawlerItem);
        continue;
      }

      if (articleUpdatedAt && articleUpdatedAt !== newsfeedItem.article_updated_at) {
        await newsfeedTable.updateNewsfeedItem({...newsfeedItem});
      }
    }
  }
}
