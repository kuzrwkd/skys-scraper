import { Injectable } from '@nestjs/common';

import newsFeedUseCase from '@/useCase/NewsfeedUseCase';
import { INewsfeedInteract } from '@/useCase/interact/NewsfeedInteract';

@Injectable()
export class NewsfeedService {
  private newsFeedInteract: INewsfeedInteract;

  constructor() {
    this.newsFeedInteract = newsFeedUseCase.resolve<INewsfeedInteract>('NewsfeedInteract');
  }

  async handle(RequestData: Newsfeed.RequestData): Promise<boolean> {
    return await this.newsFeedInteract.handle(RequestData.data);
  }
}
