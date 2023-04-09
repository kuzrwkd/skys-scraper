import { MediaSchema } from '@kuzrwkd/skys-core/entities';
import { container as newsfeedCrawler } from 'tsyringe';

import { NikkeiPreliminaryReportCrawler } from '@/crawlers/newsfeed/NikkeiPreliminaryReportCrawler';
import { Newsfeed } from '@/entities/newsfeed';

export interface ICrawler {
  handle(url: string, media: MediaSchema): Promise<Newsfeed[] | undefined>;
}

newsfeedCrawler.register<ICrawler>('NikkeiPreliminaryReportCrawler', {
  useClass: NikkeiPreliminaryReportCrawler,
});

export { newsfeedCrawler };
