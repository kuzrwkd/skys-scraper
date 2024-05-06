import {MediaSchema, NewsfeedSchema, CategorySchema, CategoryIds} from '@kuzrwkd/skys-core/entities';

export type CrawlerItem = Omit<NewsfeedSchema, 'id' | 'created_at' | 'updated_at' | 'category_ids'> & {
  category_id: CategoryIds;
};

export type CrawlerParams = {
  url: string;
  media: MediaSchema;
  category: CategorySchema;
};

export interface ICrawler {
  handle(params: CrawlerParams): Promise<CrawlerItem[] | undefined>;
}
