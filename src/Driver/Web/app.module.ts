import { Module } from '@nestjs/common';
import { NewsFeedController } from '@/Driver/Web/newsfeed/newsfeed.controller';
import { NewsFeedService } from '@/Driver/Web/newsfeed/newsfeed.service';

@Module({
  controllers: [NewsFeedController],
  providers: [NewsFeedService],
})
export class AppModule {}
