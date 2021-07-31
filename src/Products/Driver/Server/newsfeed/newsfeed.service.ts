/**
 * Nest
 */
import { Injectable } from '@nestjs/common';

/**
 * Tool
 */
import { container } from '@/Tools/Containers/Products/NewsFeed';

/**
 * Container
 */
@Injectable()
export class NewsFeedService {
  private newsFeedController: NewsFeed.INewsFeedController;
  private newsFeedPresenter: NewsFeed.INewsFeedPresenter;

  constructor() {
    this.newsFeedController = container.resolve<NewsFeed.INewsFeedController>('NewsFeedController');
    this.newsFeedPresenter = container.resolve<NewsFeed.INewsFeedPresenter>('NewsFeedPresenter');
  }

  async handle(data: NewsFeed.RequestData): Promise<boolean> {
    const result = await this.newsFeedController.handle(data);
    return this.newsFeedPresenter.handle(result);
  }
}