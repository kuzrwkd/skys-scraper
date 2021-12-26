import { inject, injectable } from 'tsyringe';

@injectable()
export class NewsFeedController {
  constructor(
    @inject('LogTool') private logTool: Tools.ILogTool,
    @inject('NewsFeedInteract') private newsFeedInteract: NewsFeed.INewsFeedInteract,
  ) {}

  async handle(RequestData: NewsFeed.RequestData) {
    const tracking_id = this.logTool.getRequestId();
    return await this.newsFeedInteract.handle(RequestData.data, tracking_id);
  }
}
