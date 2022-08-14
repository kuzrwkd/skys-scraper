import { processStartTime, processEndTime } from '@kuzrwkd/skys-core/date';
import logger, { startLogger, successLogger } from '@kuzrwkd/skys-core/logger';
import { Controller, Post, Body } from '@nestjs/common';

import { NewsFeedService } from '@/server/newsfeed/newsfeed.service';

@Controller('newsfeed')
export class NewsFeedController {
  constructor(private newsFeedService: NewsFeedService) {}

  @Post()
  async post(@Body() body: NewsFeed.RequestData): Promise<boolean> {
    try {
      const startTime = processStartTime();
      logger.info('NewsFeed 処理開始', startLogger({ request_body: body }));

      const result = await this.newsFeedService.handle(body);

      const endTime = processEndTime(startTime);
      logger.info('NewsFeed 処理終了', successLogger({ time: endTime, response_body: result }));

      return result;
    } catch (err) {
      return false;
    }
  }
}
