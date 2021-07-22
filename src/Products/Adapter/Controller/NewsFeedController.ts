import { inject, injectable } from 'tsyringe';

@injectable()
export class NewsFeedController {
  constructor(
    @inject('NewsFeedInputPort') private newsFeedInputPort: NewsFeed.INewsFeedInputPort,
    @inject('NewsFeedOutputPort') private newsFeedOutputPort: NewsFeed.INewsFeedOutputPort,
    @inject('NewsFeedInteract') private newsFeedInteract: NewsFeed.INewsFeedInteract,
  ) {}

  async handle(RequestData: NewsFeed.RequestData) {
    this.newsFeedInputPort.setInputData = {
      organizationId: RequestData.organizationId,
      contentsId: RequestData.contentsId,
      url: RequestData.url,
    };

    const data = {
      organizationId: this.newsFeedInputPort.getOrganizationId,
      contentsId: this.newsFeedInputPort.getContentsId,
      url: this.newsFeedInputPort.getUrls,
    };

    this.newsFeedOutputPort.setResult = await this.newsFeedInteract.handle(data);

    return this.newsFeedOutputPort.getResult;
  }
}
