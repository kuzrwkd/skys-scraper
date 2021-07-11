import { Controller, Get } from '@nestjs/common';
import { NewsFeedService } from '@/Products/Driver/Web/newsfeed/newsfeed.service';
import { container } from '@/Tools/Containers/Tools';

@Controller('newsfeed')
export class NewsFeedController {
  private log: Tools.ILog;
  private logger: Lib.Logger;
  private dayjs: Tools.IDayJs;

  constructor(private newsFeedService: NewsFeedService) {
    this.log = container.resolve<Tools.ILog>('Log');
    this.dayjs = container.resolve<Tools.IDayJs>('DayJs');
    this.logger = this.log.createLogger();
  }

  @Get()
  async get(): Promise<boolean> {
    try {
      const startTime = this.dayjs.processStartTime();
      this.logger.info('NewsFeed 処理開始', this.log.start());
      const result = await this.newsFeedService.handle({
        organizationId: 1,
        url: [
          'https://www.nikkei.com/news/category/financial/',
          'https://www.nikkei.com/news/category/markets/',
          'https://www.nikkei.com/news/category/technology/',
          'https://www.nikkei.com/news/category/international/',
        ],
      });
      const endTime = this.dayjs.processEndTime(startTime);
      this.logger.info('NewsFeed 処理終了', this.log.success(endTime));
      return result;
    } catch (err) {}
  }
}
