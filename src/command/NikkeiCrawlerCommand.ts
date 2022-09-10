import { CronJob, CronJobParameters } from 'cron';
import * as yargs from 'yargs';

import newsfeedCrawlerUseCase, { INewsfeedCrawlerInteract } from '@/useCase/NewsfeedCrawlerUseCase';

const newsfeedCrawlerInteract = newsfeedCrawlerUseCase.resolve<INewsfeedCrawlerInteract>('NewsfeedCrawlerInteract');
const jobOptions: CronJobParameters = {
  cronTime: '*/5 * * * *',
  onTick: () => newsfeedCrawlerInteract.handler(1),
  utcOffset: 0,
};

export default class NikkeiCrawlerCommand implements yargs.CommandModule {
  command = 'crawler:newsfeed:nikkei';
  describe = 'use start or stop option.';

  builder(args: yargs.Argv) {
    return args
      .option('start', {
        describe: 'Start Nikkei crawling job',
      })
      .option('stop', {
        describe: 'Stop Nikkei crawling job',
      })
      .conflicts('start', 'stop');
  }

  async handler(args: yargs.Arguments) {
    try {
      if (args.start) {
        const cronJob = new CronJob(jobOptions);
        cronJob.start();
        console.log('Start job time:', cronJob.nextDate().toISOTime());
        return;
      }
      if (args.stop) {
        return;
      }
    } catch (err) {
      process.exit(1);
    }
  }
}
