import { Injectable } from '@nestjs/common';
import { NewsFeedController } from '@/Products/Adapter/Controller/NewsFeed/NewsFeedController';
import { NewsFeedPresenter } from '@/Products/Adapter/Presenter/NewsFeed/NewsFeedPresenter';
import { container } from '@/Tools/Containers/Products/Adapter/NewsFeed';

@Injectable()
export class NewsFeedService {
  newsFeedController: NewsFeedController;
  newsFeedPresenter: NewsFeedPresenter;

  constructor() {
    this.newsFeedController = container.resolve<NewsFeedController>('NewsFeedController');
    this.newsFeedPresenter = container.resolve<NewsFeedPresenter>('NewsFeedPresenter');
  }

  async handle(data): Promise<string> {
    const result = await this.newsFeedController.handle(data);
    return this.newsFeedPresenter.handle(result);
  }
}
