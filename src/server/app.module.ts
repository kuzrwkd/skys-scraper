import { Module } from '@nestjs/common';

import { NewsfeedController } from '@/server/newsfeed/newsfeed.controller';
import { NewsfeedService } from '@/server/newsfeed/newsfeed.service';

@Module({
  controllers: [NewsfeedController],
  providers: [NewsfeedService],
})
export class AppModule {}
