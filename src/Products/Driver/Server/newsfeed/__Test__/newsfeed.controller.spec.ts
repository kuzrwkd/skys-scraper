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
        data: [
          {
            organizationId: 1,
            contentsId: 1,
            url: 'https://www.nikkei.com/news/category/economy/',
          },
          {
            organizationId: 1,
            contentsId: 2,
            url: 'https://www.nikkei.com/news/category/politics/',
          },
          {
            organizationId: 1,
            contentsId: 3,
            url: 'https://www.nikkei.com/news/category/business/',
          },
        ],
      }),
    ).toBe(true);
  });
});
