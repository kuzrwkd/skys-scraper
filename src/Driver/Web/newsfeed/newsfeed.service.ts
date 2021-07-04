import { Injectable } from '@nestjs/common';
import { NewsFeedController } from '@/Adapter/CoreController/NewsFeed/NewsFeedController';
import { NewsFeedPresenter } from '@/Adapter/Presenter/NewsFeed/NewsFeedPresenter';
import { container } from '@/Adapter/CoreController/NewsFeed/NewsFeedDIAdapter';

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
