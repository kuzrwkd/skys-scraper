/**
 * Nest
 */
import { Injectable } from '@nestjs/common';

/**
 * Util
 */
import newsFeedContainer from '@/useCase/newsFeedContainer';

/**
 * Container
 */
@Injectable()
export class NewsFeedService {
  private newsFeedController: NewsFeed.INewsFeedController;

  constructor() {
    this.newsFeedController = newsFeedContainer.resolve<NewsFeed.INewsFeedController>('NewsFeedController');
  }

  async handle(data: NewsFeed.RequestData): Promise<boolean> {
    return await this.newsFeedController.handle(data);
  }
}
