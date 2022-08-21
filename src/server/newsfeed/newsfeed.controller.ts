import { processStartTime, processEndTime } from '@kuzrwkd/skys-core/date';
import logger, { startLogger, successLogger } from '@kuzrwkd/skys-core/logger';
import { Controller, Post, Body } from '@nestjs/common';

import { NewsfeedService } from '@/server/newsfeed/newsfeed.service';

@Controller('newsfeed')
export class NewsfeedController {
  constructor(private newsFeedService: NewsfeedService) {}

  @Post()
  async post(@Body() body: Newsfeed.RequestData): Promise<boolean> {
    try {
      const startTime = processStartTime();
      logger.info('Newsfeed 処理開始', startLogger({ request_body: body }));

      const result = await this.newsFeedService.handle(body);

      const endTime = processEndTime(startTime);
      logger.info('Newsfeed 処理終了', successLogger({ time: endTime, response_body: result }));

      return result;
    } catch (err) {
      return false;
    }
  }
}
