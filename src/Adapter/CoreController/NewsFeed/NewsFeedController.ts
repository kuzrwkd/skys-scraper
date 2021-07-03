import { inject, injectable } from 'tsyringe'

@injectable()
export class NewsFeedController {
  data: NewsFeed.InputData

  constructor(
    @inject('NewsFeedInputPort') private inputPort: NewsFeed.INewsFeedInputPort,
    @inject('NewsFeedInteract') private useCase: NewsFeed.INewsFeedInteract,
  ) {}

  dispatch(data: NewsFeed.InputData) {
    this.data = data
  }

  handle() {
    this.inputPort.inputData = {
      name: this.data.name,
      category: this.data.category,
      tags: this.data.tags,
    }

    const inputData = {
      name: this.inputPort.getName,
      category: this.inputPort.getCategory,
      tags: this.inputPort.getTags,
    }

    return this.useCase.handle(inputData)
  }
}
