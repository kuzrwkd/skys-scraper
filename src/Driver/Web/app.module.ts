import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsFeedController } from './newsfeed/newsfeed.controller';
import { NewsFeedService } from './newsfeed/newsfeed.service';

@Module({
  controllers: [AppController, NewsFeedController],
  providers: [AppService, NewsFeedService],
})
export class AppModule {}
