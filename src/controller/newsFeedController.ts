import { inject, injectable } from 'tsyringe';

@injectable()
export class NewsFeedController {
  constructor(
    @inject('LogUtil') private logUtil: Util.ILogUtil,
    @inject('NewsFeedInteract') private newsFeedInteract: NewsFeed.INewsFeedInteract,
  ) {}

  async handle(RequestData: NewsFeed.RequestData) {
    const tracking_id = this.logUtil.getRequestId();
    return await this.newsFeedInteract.handle(RequestData.data, tracking_id);
  }
}
