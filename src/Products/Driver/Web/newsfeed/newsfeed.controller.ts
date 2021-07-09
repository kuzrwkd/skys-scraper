import { Controller, Get } from '@nestjs/common';
import { NewsFeedService } from '@/Products/Driver/Web/newsfeed/newsfeed.service';

@Controller('newsfeed')
export class NewsFeedController {
  constructor(private newsFeedService: NewsFeedService) {}

  @Get('nikkei')
  async get(): Promise<boolean> {
    return this.newsFeedService.handle({
      organizationId: 1,
      url: [
        'https://www.nikkei.com/news/category/financial/',
        'https://www.nikkei.com/news/category/markets/',
        'https://www.nikkei.com/news/category/technology/',
        'https://www.nikkei.com/news/category/international/',
      ],
    });
  }
}
