import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { UuidMiddleware } from '@/server/middleware/uuid.middleware';
import { NewsFeedController } from '@/server/newsfeed/newsfeed.controller';
import { NewsFeedService } from '@/server/newsfeed/newsfeed.service';

@Module({
  controllers: [NewsFeedController],
  providers: [NewsFeedService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UuidMiddleware).forRoutes('*');
  }
}
