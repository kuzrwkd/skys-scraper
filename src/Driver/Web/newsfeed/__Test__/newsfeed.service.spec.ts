import { Test, TestingModule } from '@nestjs/testing';
import { NewsFeedService } from '@/Driver/Web/newsfeed/newsfeed.service';

describe('NewsfeedService', () => {
  let service: NewsFeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewsFeedService],
    }).compile();

    service = module.get<NewsFeedService>(NewsFeedService);
  });

  it.skip('should be defined', () => {
    expect(service).toBeDefined();
  });
});
