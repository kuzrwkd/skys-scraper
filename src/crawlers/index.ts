import {MediaSchema, NewsfeedSchema, NewsfeedIndexCategories} from '@kuzrwkd/skys-core/entities';

export type CrawlerItem = Omit<NewsfeedSchema, 'created_at' | 'updated_at'>;

export type CrawlerParams = {
  url: string;
  media: MediaSchema;
  category: NewsfeedIndexCategories;
};

export interface ICrawler {
  handle(params: CrawlerParams): Promise<CrawlerItem[] | undefined>;
}
