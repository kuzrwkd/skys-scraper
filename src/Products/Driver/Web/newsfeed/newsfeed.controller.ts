/**
 * Tool
 */
import { container } from '@/Tools/Containers/Tools';

/**
 * Nest core
 */
import { Controller, Post, Body } from '@nestjs/common';

/**
 * Nestjs Service
 */
import { NewsFeedService } from '@/Products/Driver/Web/newsfeed/newsfeed.service';

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

  @Post()
  async post(@Body() body: NewsFeed.RequestData): Promise<boolean> {
    try {
      const startTime = this.dayjs.processStartTime();
      this.logger.info('NewsFeed 処理開始', this.log.start());
      const result = await this.newsFeedService.handle(body);
      // const result = await this.newsFeedService.handle({
      //   organizationId: 2,
      //   contentsId: 1,
      //   url: ['https://www.bloomberg.co.jp/'],
      // });
      const endTime = this.dayjs.processEndTime(startTime);
      this.logger.info('NewsFeed 処理終了', this.log.success(endTime));
      return result;
    } catch (err) {}
  }
}
