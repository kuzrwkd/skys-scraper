import { MediaSchema, NewsfeedSchema } from '@kuzrwkd/skys-core/entities';
import { container as newsfeedCrawler } from 'tsyringe';

import { NikkeiPreliminaryReportCrawler } from '@/crawlers/newsfeed/NikkeiPreliminaryReportCrawler';

export type CrawlerItem = Omit<NewsfeedSchema, 'category' | 'created_at' | 'updated_at'>;

export interface ICrawler {
  handle(url: string, media: MediaSchema): Promise<CrawlerItem[] | undefined>;
}

newsfeedCrawler.register<ICrawler>('NikkeiPreliminaryReportCrawler', {
  useClass: NikkeiPreliminaryReportCrawler,
});

export { newsfeedCrawler };
