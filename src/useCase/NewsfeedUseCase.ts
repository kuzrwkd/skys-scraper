import { container as newsFeedUseCase } from 'tsyringe';

import { NewsfeedCrawlerIndex, INewsfeedCrawlerIndex } from '@/crawler/newsfeed/NewsfeedCrawlerIndex';
import {
  NikkeiPreliminaryReportCrawlerRepository,
  INikkeiPreliminaryReportCrawlerRepository,
} from '@/crawler/newsfeed/NikkeiPreliminaryReportCrawlerRepository';
import { NewsfeedInteract, INewsfeedInteract } from '@/useCase/interact/NewsfeedInteract';

newsFeedUseCase.register<NewsfeedInteract>('NewsfeedInteract', { useClass: NewsfeedInteract });
newsFeedUseCase.register<NewsfeedCrawlerIndex>('NewsfeedCrawlerIndex', { useClass: NewsfeedCrawlerIndex });
newsFeedUseCase.register<NikkeiPreliminaryReportCrawlerRepository>('NikkeiPreliminaryReportCrawlerRepository', {
  useClass: NikkeiPreliminaryReportCrawlerRepository,
});

export type NewsfeedCrawlerResultItem = {
  id: string;
  title: string;
  url: string;
  media_id: number;
  article_created_at: string;
  article_updated_at?: string;
};

export type RequestData = {
  data: RequestDataParams[];
};

export type RequestDataParams = {
  mediaId: number;
  url: string;
};

export { INewsfeedCrawlerIndex, INikkeiPreliminaryReportCrawlerRepository, INewsfeedInteract };
export default newsFeedUseCase;
