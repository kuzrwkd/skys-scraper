/**
 * Nest
 */
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

/**
 * Middleware
 */
import { UuidMiddleware } from '@/server/middleware/uuid.middleware';

/**
 * Controller
 */
import { NewsFeedController } from '@/server/newsfeed/newsfeed.controller';

/**
 * Service
 */
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
