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
import { NewsFeedService } from '@/Products/Driver/Server/newsfeed/newsfeed.service';

@Controller('newsfeed')
export class NewsFeedController {
  private logTool: Tools.ILogTool;
  private logger: Lib.Logger;
  private dateTool: Tools.IDateTool;

  constructor(private newsFeedService: NewsFeedService) {
    this.logTool = container.resolve<Tools.ILogTool>('Log');
    this.dateTool = container.resolve<Tools.IDateTool>('DateTool');
    this.logger = this.logTool.createLogger();
  }

  @Post()
  async post(@Body() body: NewsFeed.RequestData): Promise<boolean> {
    try {
      const startTime = this.dateTool.processStartTime();
      this.logger.info('NewsFeed 処理開始', this.logTool.start());

      const result = await this.newsFeedService.handle(body);

      const endTime = this.dateTool.processEndTime(startTime);
      this.logger.info('NewsFeed 処理終了', this.logTool.success(endTime));

      return result;
    } catch (err) {
      return false;
    }
  }
}
