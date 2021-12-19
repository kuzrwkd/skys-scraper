import { inject, injectable } from 'tsyringe';

@injectable()
export class NewsFeedController {
  constructor(
    @inject('LogTool') private logTool: Tools.ILogTool,
    @inject('NewsFeedInputPort') private newsFeedInputPort: NewsFeed.INewsFeedInputPort,
    @inject('NewsFeedOutputPort') private newsFeedOutputPort: NewsFeed.INewsFeedOutputPort,
    @inject('NewsFeedInteract') private newsFeedInteract: NewsFeed.INewsFeedInteract,
  ) {}

  async handle(RequestData: NewsFeed.RequestData) {
    const tracking_id = this.logTool.getRequestId();
    this.newsFeedInputPort.setInputData = RequestData;

    const data = this.newsFeedInputPort.getInputDate;

    this.newsFeedOutputPort.setResult = await this.newsFeedInteract.handle(data, tracking_id);

    return this.newsFeedOutputPort.getResult;
  }
}
