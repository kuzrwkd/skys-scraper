import { inject, injectable } from 'tsyringe';
import { getRequestId } from '@/util/log';

@injectable()
export class NewsFeedController {
  constructor(@inject('NewsFeedInteract') private newsFeedInteract: NewsFeed.INewsFeedInteract) {}

  async handle(RequestData: NewsFeed.RequestData) {
    const tracking_id = getRequestId();
    return await this.newsFeedInteract.handle(RequestData.data, tracking_id);
  }
}
