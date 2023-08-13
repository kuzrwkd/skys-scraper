import {container} from 'tsyringe';
import {ICrawler} from '@/crawlers';
import {NikkeiPreliminaryReportCrawler} from '@/crawlers/newsfeed/NikkeiPreliminaryReportCrawler';
import {INewsfeedCrawlerInteract, NewsfeedCrawlerInteract} from '@/useCases/interact/NewsfeedCrawlerInteract';

/**
 * Crawlers
 */
container.register<ICrawler>('NikkeiPreliminaryReportCrawler', {
  useClass: NikkeiPreliminaryReportCrawler,
});

/**
 * useCases/interact
 */
container.register<INewsfeedCrawlerInteract>('NewsfeedCrawlerInteract', {
  useClass: NewsfeedCrawlerInteract,
});

export {container};
