import {container} from 'tsyringe';
import {ICrawler} from '@/crawlers';
import {NikkeiNewsCrawler} from '@/crawlers/newsfeed/NikkeiNewsCrawler';
import {INewsfeedCrawlerInteract, NewsfeedCrawlerInteract} from '@/useCases/interact/NewsfeedCrawlerInteract';

/**
 * Crawlers
 */
container.register<ICrawler>('NikkeiPreliminaryReportCrawler', {
  useClass: NikkeiNewsCrawler,
});

/**
 * useCases/interact
 */
container.register<INewsfeedCrawlerInteract>('NewsfeedCrawlerInteract', {
  useClass: NewsfeedCrawlerInteract,
});

export {container};
