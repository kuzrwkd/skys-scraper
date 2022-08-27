import { container as newsfeedCrawlerUseCase } from 'tsyringe';

import { CrawlerIndexForNewsfeed, ICrawlerIndexForNewsfeed } from '@/crawler/CrawlerIndexForNewsfeed';
import {
  NikkeiPreliminaryReportCrawler,
  INikkeiPreliminaryReportCrawler,
} from '@/crawler/newsfeed/NikkeiPreliminaryReportCrawler';
import { NewsfeedCrawlerInteract, INewsfeedCrawlerInteract } from '@/useCase/interact/NewsfeedCrawlerInteract';

newsfeedCrawlerUseCase.register<INewsfeedCrawlerInteract>('NewsfeedCrawlerInteract', {
  useClass: NewsfeedCrawlerInteract,
});
newsfeedCrawlerUseCase.register<ICrawlerIndexForNewsfeed>('CrawlerIndexForNewsfeed', {
  useClass: CrawlerIndexForNewsfeed,
});
newsfeedCrawlerUseCase.register<INikkeiPreliminaryReportCrawler>('NikkeiPreliminaryReportCrawler', {
  useClass: NikkeiPreliminaryReportCrawler,
});

export type NewsfeedCrawlerResultItem = {
  id: string;
  title: string;
  url: string;
  media_id: number;
  article_created_at: string;
  article_updated_at?: string;
};

export { ICrawlerIndexForNewsfeed, INikkeiPreliminaryReportCrawler, INewsfeedCrawlerInteract };
export default newsfeedCrawlerUseCase;
