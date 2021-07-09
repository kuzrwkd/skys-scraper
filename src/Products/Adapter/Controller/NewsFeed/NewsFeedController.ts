import { inject, injectable } from 'tsyringe';

@injectable()
export class NewsFeedController {
  constructor(
    @inject('NewsFeedInputPort') private newsFeedInputPort: NewsFeed.INewsFeedInputPort,
    @inject('NewsFeedOutputPort') private newsFeedOutputPort: NewsFeed.INewsFeedOutputPort,
    @inject('NewsFeedInteract') private newsFeedInteract: NewsFeed.INewsFeedInteract,
  ) {}

  async handle(inputData: NewsFeed.InputData) {
    this.newsFeedInputPort.setInputData = {
      organizationId: inputData.organizationId,
      url: inputData.url,
    };

    const data = {
      organizationId: this.newsFeedInputPort.getOrganizationId,
      url: this.newsFeedInputPort.getUrls,
    };

    this.newsFeedOutputPort.setResult = await this.newsFeedInteract.handle(data);

    return this.newsFeedOutputPort.getResult;
  }
}
