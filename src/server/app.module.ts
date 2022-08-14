import { Module } from '@nestjs/common';

import { NewsFeedController } from '@/server/newsfeed/newsfeed.controller';
import { NewsFeedService } from '@/server/newsfeed/newsfeed.service';

@Module({
  controllers: [NewsFeedController],
  providers: [NewsFeedService],
})
export class AppModule {}
