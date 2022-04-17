/**
 * Nest
 */
import { Injectable } from '@nestjs/common';

/**
 * Util
 */
import newsFeedUseCase from '@/useCase/newsFeedUseCase';

/**
 * Container
 */
@Injectable()
export class NewsFeedService {
  private newsFeedController: NewsFeed.INewsFeedController;

  constructor() {
    this.newsFeedController = newsFeedUseCase.resolve<NewsFeed.INewsFeedController>('NewsFeedController');
  }

  async handle(data: NewsFeed.RequestData): Promise<boolean> {
    return await this.newsFeedController.handle(data);
  }
}
