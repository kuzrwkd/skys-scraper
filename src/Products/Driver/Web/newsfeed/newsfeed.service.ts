import { Injectable } from '@nestjs/common';
import { container } from '@/Tools/Containers/Products/Adapter/NewsFeed';

@Injectable()
export class NewsFeedService {
  newsFeedController: NewsFeed.INewsFeedController;
  newsFeedPresenter: NewsFeed.INewsFeedPresenter;

  constructor() {
    this.newsFeedController = container.resolve<NewsFeed.INewsFeedController>('NewsFeedController');
    this.newsFeedPresenter = container.resolve<NewsFeed.INewsFeedPresenter>('NewsFeedPresenter');
  }

  async handle(data): Promise<boolean> {
    const result = await this.newsFeedController.handle(data);
    return this.newsFeedPresenter.handle(result);
  }
}
