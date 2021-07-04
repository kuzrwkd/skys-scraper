import { inject, injectable } from 'tsyringe'

@injectable()
export class NewsFeedController {
  constructor(
    @inject('NewsFeedInputPort') private inputPort: NewsFeed.INewsFeedInputPort,
    @inject('NewsFeedOutputPort') private outputPort: NewsFeed.INewsFeedOutputPort,
    @inject('NewsFeedInteract') private useCase: NewsFeed.INewsFeedInteract,
  ) {}

  async handle(inputData: NewsFeed.InputData) {
    this.inputPort.inputData = {
      name: inputData.name,
      category: inputData.category,
      tags: inputData.tags,
    }

    const data = {
      name: this.inputPort.getName,
      category: this.inputPort.getCategory,
      tags: this.inputPort.getTags,
    }

    this.outputPort.setResult = await this.useCase.handle(data)

    return this.outputPort.getResult
  }
}
