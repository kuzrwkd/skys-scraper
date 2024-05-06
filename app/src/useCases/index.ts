import {container} from 'tsyringe';
import {ICrawler} from '@/crawlers';
import {NikkeiNewsCrawler} from '@/crawlers/newsfeed/NikkeiNewsCrawler';
import {INikkeiNewsCrawlerInteract, NikkeiNewsCrawlerInteract} from '@/useCases/interact/NikkeiNewsCrawlerInteract';

/**
 * Crawlers
 */
container.register<ICrawler>('NikkeiNewsCrawler', {
  useClass: NikkeiNewsCrawler,
});

/**
 * useCases/interact
 */
container.register<INikkeiNewsCrawlerInteract>('NikkeiNewsCrawlerInteract', {
  useClass: NikkeiNewsCrawlerInteract,
});

export {container};

export {type INikkeiNewsCrawlerInteract};
