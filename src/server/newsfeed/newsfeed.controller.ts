/**
 * Util
 */
import utilContainer from '@/useCase/utilContainer';

/**
 * Nest
 */
import { Controller, Post, Body } from '@nestjs/common';

/**
 * Nestjs Service
 */
import { NewsFeedService } from '@/server/newsfeed/newsfeed.service';

/**
 * Container
 */
@Controller('newsfeed')
export class NewsFeedController {
  private logUtil: Util.ILogUtil;
  private logger: Lib.Logger;
  private dateUtil: Util.IDateUtil;

  constructor(private newsFeedService: NewsFeedService) {
    this.logUtil = utilContainer.resolve<Util.ILogUtil>('LogUtil');
    this.dateUtil = utilContainer.resolve<Util.IDateUtil>('DateUtil');
    this.logger = this.logUtil.createLogger();
  }

  @Post()
  async post(@Body() body: NewsFeed.RequestData): Promise<boolean> {
    try {
      const startTime = this.dateUtil.processStartTime();
      this.logger.info(
        'NewsFeed 処理開始',
        this.logUtil.getStartParams<typeof body>({ tracking_id: this.logUtil.getRequestId(), request_body: body }),
      );

      const result = await this.newsFeedService.handle(body);

      const endTime = this.dateUtil.processEndTime(startTime);
      this.logger.info(
        'NewsFeed 処理終了',
        this.logUtil.getSuccessParams<typeof result>({
          tracking_id: this.logUtil.getRequestId(),
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
