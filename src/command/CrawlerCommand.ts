import { CronJob, CronJobParameters } from 'cron';
import * as yargs from 'yargs';

import newsfeedCrawlerUseCase, { INewsfeedCrawlerInteract } from '@/useCase/NewsfeedCrawlerUseCase';

const newsfeedCrawlerInteract = newsfeedCrawlerUseCase.resolve<INewsfeedCrawlerInteract>('NewsfeedCrawlerInteract');
const jobOptions: CronJobParameters = {
  cronTime: '*/5 * * * *',
  onTick: () => newsfeedCrawlerInteract.handler(1),
  utcOffset: 0,
};

export default class CrawlerCommand implements yargs.CommandModule {
  command = 'crawler';
  describe = 'use start or stop option.';

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
