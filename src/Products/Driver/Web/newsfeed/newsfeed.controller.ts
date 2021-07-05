import { Controller, Get } from '@nestjs/common';
import { NewsFeedService } from './newsfeed.service';

@Controller('newsfeed')
export class NewsFeedController {
  constructor(private newsFeedService: NewsFeedService) {}

  @Get()
  async get(): Promise<string> {
    return this.newsFeedService.handle({
      organizationId: 1,
      tags: 'preliminaryReport',
    });
  }
}
