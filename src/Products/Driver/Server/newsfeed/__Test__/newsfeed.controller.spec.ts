import { Test, TestingModule } from '@nestjs/testing';
import { NewsFeedController } from '@/Products/Driver/Server/newsfeed/newsfeed.controller';

describe('NewsfeedController', () => {
  let controller: NewsFeedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsFeedController],
    }).compile();

    controller = module.get<NewsFeedController>(NewsFeedController);
  });

  it.skip('should be defined', () => {
    expect(
      controller.post({
        organizationId: 1,
        contentsId: 1,
        url: [
          'https://www.nikkei.com/news/category/financial/',
          'https://www.nikkei.com/news/category/markets/',
          'https://www.nikkei.com/news/category/technology/',
          'https://www.nikkei.com/news/category/international/',
        ],
      }),
    ).toBe(true);
  });
});
