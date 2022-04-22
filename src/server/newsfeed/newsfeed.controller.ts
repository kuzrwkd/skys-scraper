import { Controller, Post, Body } from '@nestjs/common';

import { NewsFeedService } from '@/server/newsfeed/newsfeed.service';
import { processStartTime, processEndTime } from '@/util/date';
import logger, { getStartParams, getRequestId, getSuccessParams } from '@/util/log';

@Controller('newsfeed')
export class NewsFeedController {
  constructor(private newsFeedService: NewsFeedService) {}

  @Post()
  async post(@Body() body: NewsFeed.RequestData): Promise<boolean> {
    try {
      const startTime = processStartTime();
      logger.info(
        'NewsFeed 処理開始',
        getStartParams<typeof body>({ tracking_id: getRequestId(), request_body: body }),
      );

      const result = await this.newsFeedService.handle(body);

      const endTime = processEndTime(startTime);
      logger.info(
        'NewsFeed 処理終了',
        getSuccessParams<typeof result>({
          tracking_id: getRequestId(),
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
