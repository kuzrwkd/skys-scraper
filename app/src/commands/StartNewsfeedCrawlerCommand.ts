import * as yargs from 'yargs';
import {INikkeiNewsCrawlerInteract, container} from '@/useCases';

const newsfeedCrawlerInteract = container.resolve<INikkeiNewsCrawlerInteract>('NikkeiNewsCrawlerInteract');

export default class StartNewsfeedCrawlerCommand implements yargs.CommandModule {
  command = 'start:newsfeed';
  describe = 'no option.';

  builder(args: yargs.Argv) {
    return args.default('value', 'true');
  }

  async handler() {
    try {
      await newsfeedCrawlerInteract.handler();
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
}
