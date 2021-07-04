import { inject, injectable } from 'tsyringe';

@injectable()
export class NewsFeedController {
  constructor(
    @inject('NewsFeedInputPort') private newsFeedInputPort: NewsFeed.INewsFeedInputPort,
    @inject('NewsFeedOutputPort') private newsFeedOutputPort: NewsFeed.INewsFeedOutputPort,
    @inject('NewsFeedInteract') private interact: NewsFeed.INewsFeedInteract,
  ) {}

  async handle(inputData: NewsFeed.InputData) {
    this.newsFeedInputPort.inputData = {
      organizationId: inputData.organizationId,
      tags: inputData.tags,
    };

    const data = {
      organizationId: this.newsFeedInputPort.getOrganizationId,
      tags: this.newsFeedInputPort.getTags,
    };

    this.newsFeedOutputPort.setResult = await this.interact.handle(data);

    return this.newsFeedOutputPort.getResult;
  }
}
