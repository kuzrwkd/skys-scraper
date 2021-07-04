import { Test, TestingModule } from '@nestjs/testing';
import { NewsFeedController } from '../newsfeed.controller';

describe('NewsfeedController', () => {
  let controller: NewsFeedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsFeedController],
    }).compile();

    controller = module.get<NewsFeedController>(NewsFeedController);
  });

  it.skip('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
