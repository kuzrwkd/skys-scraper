import { Injectable } from '@nestjs/common';
import { NewsFeedController } from '@/Products/Adapter/CoreController/NewsFeed/NewsFeedController';
import { NewsFeedPresenter } from '@/Products/Adapter/Presenter/NewsFeed/NewsFeedPresenter';
import { container } from '@/Products/Adapter/CoreController/NewsFeed/NewsFeedDIAdapter';

@Injectable()
export class NewsFeedService {
  newsFeedController: NewsFeedController;
  newsFeedPresenter: NewsFeedPresenter;

  constructor() {
    this.newsFeedController = container.resolve('NewsFeedController');
    this.newsFeedPresenter = container.resolve('NewsFeedPresenter');
  }

  async handle(data): Promise<string> {
    const result = await this.newsFeedController.handle(data);
    return this.newsFeedPresenter.handle(result);
  }
}
