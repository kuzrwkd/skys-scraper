import * as yargs from 'yargs';

import newsfeedCrawlerUseCase, { INewsfeedCrawlerInteract } from '@/useCase/NewsfeedCrawlerUseCase';

const newsfeedCrawlerInteract = newsfeedCrawlerUseCase.resolve<INewsfeedCrawlerInteract>('NewsfeedCrawlerInteract');

export default class NewsfeedCrawlerCommand implements yargs.CommandModule {
  command = 'crawler:newsfeed';
  describe = 'use --<media name> option.';

  builder(args: yargs.Argv) {
    return args
      .option('nikkei', {
        describe: 'Crawling the Nikkei website',
      })
      .option('bloomberg', {
        describe: 'Crawling the Bloomberg website',
      })
      .conflicts('nikkei', 'bloomberg');
  }

  async handler(args: yargs.Arguments) {
    try {
      if (args.nikkei) {
        await newsfeedCrawlerInteract.handle(1);
        return;
      }
      if (args.bloomberg) {
        await newsfeedCrawlerInteract.handle(2);
        return;
      }
    } catch (err) {
      process.exit(1);
    }
  }
}
