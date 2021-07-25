/**
 * Nest core
 */
import { Module } from '@nestjs/common';

/**
 * Nest controller
 */
import { NewsFeedController } from '@/Products/Driver/Server/newsfeed/newsfeed.controller';

/**
 * Nest Service
 */
import { NewsFeedService } from '@/Products/Driver/Server/newsfeed/newsfeed.service';

@Module({
  controllers: [NewsFeedController],
  providers: [NewsFeedService],
})
export class AppModule {}
