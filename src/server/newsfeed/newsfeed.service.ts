import { Injectable } from '@nestjs/common';

import newsFeedUseCase from '@/useCase/newsFeedUseCase';

@Injectable()
export class NewsFeedService {
  private newsFeedInteract: NewsFeed.INewsFeedInteract;

  constructor() {
    this.newsFeedInteract = newsFeedUseCase.resolve<NewsFeed.INewsFeedInteract>('NewsFeedInteract');
  }

  async handle(RequestData: NewsFeed.RequestData): Promise<boolean> {
    return await this.newsFeedInteract.handle(RequestData.data);
  }
}
