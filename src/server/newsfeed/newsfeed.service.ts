import { Injectable } from '@nestjs/common';

import newsFeedUseCase from '@/useCase/newsFeedUseCase';
import { getRequestId } from '@/util/log';

@Injectable()
export class NewsFeedService {
  private newsFeedInteract: NewsFeed.INewsFeedInteract;

  constructor() {
    this.newsFeedInteract = newsFeedUseCase.resolve<NewsFeed.INewsFeedInteract>('NewsFeedInteract');
  }

  async handle(RequestData: NewsFeed.RequestData): Promise<boolean> {
    const tracking_id = getRequestId();
    return await this.newsFeedInteract.handle(RequestData.data, tracking_id);
  }
}
