import {container} from 'tsyringe';
import {ICrawler} from '@/crawlers';
import {NikkeiNewsCrawler} from '@/crawlers/newsfeed/NikkeiNewsCrawler';
import {INikkeiNewsCrawlerInteract, NikkeiNewsCrawlerInteract} from '@/useCases/interact/NikkeiNewsCrawlerInteract';

/**
 * Crawlers
 */
container.register<ICrawler>('NikkeiPreliminaryReportCrawler', {
  useClass: NikkeiNewsCrawler,
});

/**
 * useCases/interact
 */
container.register<INikkeiNewsCrawlerInteract>('NewsfeedCrawlerInteract', {
  useClass: NikkeiNewsCrawlerInteract,
});

export {container};
