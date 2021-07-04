import { inject, injectable } from 'tsyringe'

@injectable()
export class NewsFeedController {
  constructor(
    @inject('NewsFeedInputPort') private inputPort: NewsFeed.INewsFeedInputPort,
    @inject('NewsFeedOutputPort') private outputPort: NewsFeed.INewsFeedOutputPort,
    @inject('NewsFeedInteract') private interact: NewsFeed.INewsFeedInteract,
  ) {}

  async handle(inputData: NewsFeed.InputData) {
    this.inputPort.inputData = {
      name: inputData.name,
      tags: inputData.tags,
    }

    await this.interact.handle()
  }
}
