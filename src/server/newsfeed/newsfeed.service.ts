import { Injectable } from '@nestjs/common';

import newsFeedUseCase, { RequestData } from '@/useCase/NewsfeedUseCase';
import { INewsfeedInteract } from '@/useCase/interact/NewsfeedInteract';

export interface INewsfeedService {
  handle(payload: RequestData): Promise<boolean>;
}

@Injectable()
export class NewsfeedService implements INewsfeedService {
  private newsFeedInteract: INewsfeedInteract;

  constructor() {
    this.newsFeedInteract = newsFeedUseCase.resolve<INewsfeedInteract>('NewsfeedInteract');
  }

  async handle(RequestData: RequestData) {
    const result = await this.newsFeedInteract.handle(RequestData.data);
    return !!result;
  }
}
