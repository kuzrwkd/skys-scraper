/**
 * Nest
 */
import { Injectable } from '@nestjs/common';

/**
 * Tool
 */
import newsFeedContainer from '@/Tools/Containers/NewsFeedContainer';

/**
 * Container
 */
@Injectable()
export class NewsFeedService {
  private newsFeedController: NewsFeed.INewsFeedController;
  private newsFeedPresenter: NewsFeed.INewsFeedPresenter;

  constructor() {
    this.newsFeedController = newsFeedContainer.resolve<NewsFeed.INewsFeedController>('NewsFeedController');
    this.newsFeedPresenter = newsFeedContainer.resolve<NewsFeed.INewsFeedPresenter>('NewsFeedPresenter');
  }

  async handle(data: NewsFeed.RequestData): Promise<boolean> {
    const result = await this.newsFeedController.handle(data);
    return this.newsFeedPresenter.handle(result);
  }
}
