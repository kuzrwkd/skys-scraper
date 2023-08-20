import {categoryTable, mediaTable, newsfeedIndexTable, newsfeedTable} from '@kuzrwkd/skys-core/dynamodb';
import {MEDIA_ID, MediaSchema, CategorySchema} from '@kuzrwkd/skys-core/entities';
import {injectable, inject} from 'tsyringe';
import {ICrawler, CrawlerItem} from '@/crawlers';

type NewsfeedIndexAllItemsWithMediaAndCategory = {
  id: string;
  media: MediaSchema;
  url: string;
  category: CategorySchema;
  crawlerInstance: ICrawler;
};

export interface INewsfeedCrawlerInteract {
  handler(): Promise<void>;
}

@injectable()
export class NewsfeedCrawlerInteract implements INewsfeedCrawlerInteract {
  constructor(@inject('NikkeiPreliminaryReportCrawler') private readonly nikkeiPreliminaryReportCrawler: ICrawler) {}

  async handler() {
    try {
      const masterData = await Promise.all([
        newsfeedIndexTable.getNewsfeedIndexAllItems(),
        mediaTable.getMediaAllItems(),
        categoryTable.getCategoryAllItems(),
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

      const newsfeedIndexAllItemsWithMediaAndCategory = masterData.newsfeedIndexAllItems.reduce((acc, item) => {
        switch (item.media_id) {
          case MEDIA_ID.nikkei:
            return [
              ...acc,
              {
                id: item.id,
                media: masterData.mediaAllItems.find(_ => _.media_id === MEDIA_ID.nikkei)!,
                category: masterData.categoryAllItems.find(_ => _.category_id === item.category_id)!,
                url: item.url,
                crawlerInstance: this.nikkeiPreliminaryReportCrawler,
              },
            ];
          default:
            return acc;
        }
      }, [] as NewsfeedIndexAllItemsWithMediaAndCategory[]);

      const crawlerResult: CrawlerItem[] = [];

      for (const item of newsfeedIndexAllItemsWithMediaAndCategory) {
        const {media, url, category, crawlerInstance} = item;
        const crawlerParams = {url, media, category};
        const result = await crawlerInstance.handle(crawlerParams);

        if (result) {
          crawlerResult.push(...result);
        }
      }

      for (const crawlerItem of crawlerResult) {
        const newsfeedItem = await newsfeedTable.getNewsfeedItemByUrl(crawlerItem.url);

        if (!newsfeedItem) {
          await newsfeedTable.putNewsfeedItem(crawlerItem);
          continue;
        }

        if (crawlerItem.article_updated_at && crawlerItem.article_updated_at !== newsfeedItem.article_updated_at) {
          await newsfeedTable.updateNewsfeedItem({...newsfeedItem, article_updated_at: crawlerItem.article_updated_at});
        }

        const targetCategoryIdRegExp = new RegExp(crawlerItem.category_id);

        if (!targetCategoryIdRegExp.test(newsfeedItem.category_id)) {
          await newsfeedTable.updateNewsfeedItem({
            ...newsfeedItem,
            category_id: `${newsfeedItem.category_id},${crawlerItem.category_id}`,
          });
        }
      }
    } catch (error) {}
  }
}
