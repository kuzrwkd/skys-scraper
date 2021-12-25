/**
 * Tool
 */
import toolsContainer from '@/Tools/Containers/ToolsContainer';

/**
 * Nest
 */
import { Controller, Post, Body } from '@nestjs/common';

/**
 * Nestjs Service
 */
import { NewsFeedService } from '@/Products/Server/newsfeed/newsfeed.service';

/**
 * Container
 */
@Controller('newsfeed')
export class NewsFeedController {
  private logTool: Tools.ILogTool;
  private logger: Lib.Logger;
  private dateTool: Tools.IDateTool;

  constructor(private newsFeedService: NewsFeedService) {
    this.logTool = toolsContainer.resolve<Tools.ILogTool>('LogTool');
    this.dateTool = toolsContainer.resolve<Tools.IDateTool>('DateTool');
    this.logger = this.logTool.createLogger();
  }

  @Post()
  async post(@Body() body: NewsFeed.RequestData): Promise<boolean> {
    try {
      const startTime = this.dateTool.processStartTime();
      this.logger.info(
        'NewsFeed 処理開始',
        this.logTool.getStartParams<typeof body>({ tracking_id: this.logTool.getRequestId(), request_body: body }),
      );

      const result = await this.newsFeedService.handle(body);

      const endTime = this.dateTool.processEndTime(startTime);
      this.logger.info(
        'NewsFeed 処理終了',
        this.logTool.getSuccessParams<typeof result>({
          tracking_id: this.logTool.getRequestId(),
          time: endTime,
          response_body: result,
        }),
      );

      return result;
    } catch (err) {
      return false;
    }
  }
}
