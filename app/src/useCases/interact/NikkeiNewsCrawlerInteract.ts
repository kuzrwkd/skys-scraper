import {categoryTable, mediaTable, newsfeedIndexTable, newsfeedTable} from '@kuzrwkd/skys-core/dynamodb';
import {MediaId, MediaSchema, CategorySchema} from '@kuzrwkd/skys-core/entities';
import {failedLogger} from '@kuzrwkd/skys-core/logger';
import {injectable, inject} from 'tsyringe';
import {ICrawler, CrawlerItem} from '@/crawlers';

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
      const masterData = await Promise.all([
        newsfeedIndexTable.getAllItems(),
        mediaTable.getAllItems(),
        categoryTable.getAllItems(),
      ])
        .then(result => {
          const [newsfeedIndexAllItems, mediaAllItems, categoryAllItems] = result;
          return {
            newsfeedIndexAllItems: newsfeedIndexAllItems ?? [],
            mediaAllItems: mediaAllItems ?? [],
            categoryAllItems: categoryAllItems ?? [],
          };
        })
        .catch(error => {
          throw new Error(error.message);
        });
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
    } catch (error) {}
  }

  async handler() {
    try {
      const nikkeiCrawlerIndex = await this.getCrawlerIndex();
      if (!nikkeiCrawlerIndex) {
        throw new Error('');
      }
      const crawlerResult: CrawlerItem[] = [];
      await Promise.allSettled(
        nikkeiCrawlerIndex.map(async item => {
          const {media, url, category} = item;
          const crawlerParams = {url, media, category};
          const result = await this.nikkeiNewsCrawler.handle(crawlerParams);
          if (result) {
            crawlerResult.push(...result);
          }
        }),
      );
      for (const crawlerItem of crawlerResult) {
        if (!crawlerItem.url) {
          throw new Error('crawler url not found');
        }
        const newsfeedItem = await newsfeedTable.getItemByUrl(crawlerItem.url);
        if (!newsfeedItem) {
          await newsfeedTable.putItem(crawlerItem);
          continue;
        }
        if (crawlerItem.last_update_date && crawlerItem.last_update_date !== newsfeedItem.last_update_date) {
          await newsfeedTable.updateLastPostDate({
            ...newsfeedItem,
            last_update_date: crawlerItem.last_update_date,
          });
        }
        if (!newsfeedItem.category_ids.includes(crawlerItem.category_id)) {
          await newsfeedTable.updateCategoryIds({
            ...newsfeedItem,
            category_id: crawlerItem.category_id,
          });
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        failedLogger({
          exception_class: error.name,
          stacktrace: error.stack,
        });
      }
    }
  }
}
