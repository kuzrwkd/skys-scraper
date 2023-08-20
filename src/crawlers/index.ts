import {MediaSchema, NewsfeedSchema, CategorySchema} from '@kuzrwkd/skys-core/entities';

export type CrawlerItem = Omit<NewsfeedSchema, 'created_at' | 'updated_at'>;

export type CrawlerParams = {
  url: string;
  media: MediaSchema;
  category: CategorySchema;
};

export interface ICrawler {
  handle(params: CrawlerParams): Promise<CrawlerItem[] | undefined>;
}
