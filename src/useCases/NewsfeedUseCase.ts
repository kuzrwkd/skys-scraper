import { container as newsfeedCrawlerUseCase } from 'tsyringe';

import { NewsfeedCrawlerInteract, INewsfeedCrawlerInteract } from '@/useCases/interact/NewsfeedCrawlerInteract';

newsfeedCrawlerUseCase.register<INewsfeedCrawlerInteract>('NewsfeedCrawlerInteract', {
  useClass: NewsfeedCrawlerInteract,
});

export { newsfeedCrawlerUseCase, INewsfeedCrawlerInteract };
