/**
 * Nest
 */
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

/**
 * Middleware
 */
import { UuidMiddleware } from '@/Products/Server/middleware/uuid.middleware';

/**
 * Controller
 */
import { NewsFeedController } from '@/Products/Server/newsfeed/newsfeed.controller';

/**
 * Service
 */
import { NewsFeedService } from '@/Products/Server/newsfeed/newsfeed.service';

@Module({
  controllers: [NewsFeedController],
  providers: [NewsFeedService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UuidMiddleware).forRoutes('*');
  }
}
