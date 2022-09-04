import * as yargs from 'yargs';

import newsfeedCrawlerUseCase, { INewsfeedCrawlerInteract } from '@/useCase/NewsfeedCrawlerUseCase';

const newsfeedCrawlerInteract = newsfeedCrawlerUseCase.resolve<INewsfeedCrawlerInteract>('NewsfeedCrawlerInteract');

export default class NikkeiCrawlerCommand implements yargs.CommandModule {
  command = 'crawler:newsfeed:nikkei';
  describe = 'use start or stop option.';

  builder(args: yargs.Argv) {
    return args
      .option('start', {
        describe: 'Start Nikkei crawler batch',
      })
      .option('stop', {
        describe: 'Stop Nikkei crawler batch',
      })
      .conflicts('start', 'stop');
  }

  async handler(args: yargs.Arguments) {
    try {
      if (args.start) {
        await newsfeedCrawlerInteract.handler(1);
        return;
      }
      if (args.stop) {
        await newsfeedCrawlerInteract.handler(1);
        return;
      }
    } catch (err) {
      process.exit(1);
    }
  }
}
