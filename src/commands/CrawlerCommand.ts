import { CronJob, CronJobParameters } from 'cron';
import * as yargs from 'yargs';

import { newsfeedCrawlerUseCase, INewsfeedCrawlerInteract } from '@/useCases/NewsfeedUseCase';

const newsfeedCrawlerInteract = newsfeedCrawlerUseCase.resolve<INewsfeedCrawlerInteract>('NewsfeedCrawlerInteract');
const jobOptions: CronJobParameters = {
  cronTime: '*/5 * * * *',
  onTick: () => newsfeedCrawlerInteract.handler(),
  utcOffset: 0,
};

export default class CrawlerCommand implements yargs.CommandModule {
  command = 'crawlers';
  describe = 'use start option.';

  builder(args: yargs.Argv) {
    return args.option('start', {
      describe: 'crawling start',
    });
  }

  async handler() {
    try {
      const cronJob = new CronJob(jobOptions);
      cronJob.start();
      console.log('Start job time:', cronJob.nextDate().toISOTime());
      return;
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }
}
