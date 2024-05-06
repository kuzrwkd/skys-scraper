import logger, {failedLogger} from '@kuzrwkd/skys-core/logger';
import * as yargs from 'yargs';
import {INikkeiNewsCrawlerInteract, container} from '@/useCases';

const newsfeedCrawlerInteract = container.resolve<INikkeiNewsCrawlerInteract>('NikkeiNewsCrawlerInteract');

export default class StartNikkeiCrawlingCommand implements yargs.CommandModule {
  command = 'start:nikkei:crawling';
  describe = 'no option.';

  builder(args: yargs.Argv) {
    return args.default('value', 'true');
  }

  async handler() {
    try {
      await newsfeedCrawlerInteract.handler();
    } catch (error) {
      if (error instanceof Error) {
        logger.error('Failed to start:nikkei:crawling', failedLogger({result: error}));
      }
      process.exit(1);
    }
  }
}
