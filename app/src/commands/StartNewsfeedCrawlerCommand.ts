import {CronJobParameters, CronJob} from 'cron';
import * as yargs from 'yargs';
import {INewsfeedCrawlerInteract} from '@/useCases';
import {container} from '@/utils/yargsConfig';

const newsfeedCrawlerInteract = container.resolve<INewsfeedCrawlerInteract>('NewsfeedCrawlerInteract');

const jobOptions: CronJobParameters = {
  cronTime: '*/60 * * * *',
  onTick: () => newsfeedCrawlerInteract.handler(),
  utcOffset: 0,
};

export default class StartNewsfeedCrawlerCommand implements yargs.CommandModule {
  command = 'start:newsfeed';
  describe = 'no option.';

  builder(args: yargs.Argv) {
    return args.default('value', 'true');
  }

  async handler() {
    try {
      const cronJob = new CronJob(jobOptions);
      cronJob.start();
      console.log('Start job time:', cronJob.nextDate().toISOTime());
      return;
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
}
