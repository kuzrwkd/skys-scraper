import { container as newsfeedCrawlerUseCase } from 'tsyringe';

import {
  NikkeiPreliminaryReportCrawler,
  INikkeiPreliminaryReportCrawler,
} from '@/crawler/newsfeed/NikkeiPreliminaryReportCrawler';
import { NewsfeedCrawlerInteract, INewsfeedCrawlerInteract } from '@/useCase/interact/NewsfeedCrawlerInteract';

export type NewsfeedCrawlerResultItem = {
  id: string;
  title: string;
  url: string;
  media_id: number;
  article_created_at: string;
  article_updated_at?: string;
};

newsfeedCrawlerUseCase.register<INewsfeedCrawlerInteract>('NewsfeedCrawlerInteract', {
  useClass: NewsfeedCrawlerInteract,
});
newsfeedCrawlerUseCase.register<INikkeiPreliminaryReportCrawler>('NikkeiPreliminaryReportCrawler', {
  useClass: NikkeiPreliminaryReportCrawler,
});

export { INikkeiPreliminaryReportCrawler, INewsfeedCrawlerInteract };
export default newsfeedCrawlerUseCase;
