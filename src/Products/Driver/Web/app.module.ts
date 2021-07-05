import { Module } from '@nestjs/common';
import { NewsFeedController } from '@/Products/Driver/Web/newsfeed/newsfeed.controller';
import { NewsFeedService } from '@/Products/Driver/Web/newsfeed/newsfeed.service';

@Module({
  controllers: [NewsFeedController],
  providers: [NewsFeedService],
})
export class AppModule {}
