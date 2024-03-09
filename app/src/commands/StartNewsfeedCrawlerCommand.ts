import * as yargs from 'yargs';
import {INikkeiNewsCrawlerInteract} from '@/useCases';
import {container} from '@/utils/yargsConfig';

const newsfeedCrawlerInteract = container.resolve<INikkeiNewsCrawlerInteract>('NewsfeedCrawlerInteract');

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
