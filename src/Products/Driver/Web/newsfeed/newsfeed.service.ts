/**
 * Nest core
 */
import { Injectable } from '@nestjs/common';

/**
 * Tool
 */
import { container } from '@/Tools/Containers/Products/Adapter/NewsFeed';

@Injectable()
export class NewsFeedService {
  constructor(
    private newsFeedController: NewsFeed.INewsFeedController,
    private newsFeedPresenter: NewsFeed.INewsFeedPresenter,
  ) {
    this.newsFeedController = container.resolve<NewsFeed.INewsFeedController>('NewsFeedController');
    this.newsFeedPresenter = container.resolve<NewsFeed.INewsFeedPresenter>('NewsFeedPresenter');
  }

  async handle(data: NewsFeed.InputData): Promise<boolean> {
    const result = await this.newsFeedController.handle(data);
    return this.newsFeedPresenter.handle(result);
  }
}
